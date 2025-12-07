# 🔌 API INTEGRATION DESIGN

**Created:** December 6, 2025
**Purpose:** Complete API integration specifications for all external services
**Based on:** Requirements + System Architecture + Enterprise frameworks

---

## 🎯 INTEGRATION OVERVIEW

### External Services
1. **GoHighLevel (GHL)** - CRM, workflows, SMS
2. **Google Ads API** - Campaign management, optimization
3. **Twilio** - SMS messaging (A2P)
4. **Stripe** - Payment processing (US customers)
5. **Razorpay** - Payment processing (Indian resellers)
6. **OpenAI** - GPT-4 for AI agents
7. **Anthropic** - Claude as fallback

---

## 1️⃣ GOHIGHLEVEL (GHL) API INTEGRATION

### Authentication
**Method:** OAuth 2.0
**Scopes:** `contacts.write`, `workflows.write`, `conversations.write`, `calendars.write`

```javascript
// OAuth Flow
const GHL_AUTH_URL = 'https://marketplace.gohighlevel.com/oauth/chooselocation';
const GHL_TOKEN_URL = 'https://services.leadconnectorhq.com/oauth/token';

// Exchange code for token
async function getGHLToken(code) {
  const response = await fetch(GHL_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GHL_CLIENT_ID,
      client_secret: process.env.GHL_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.GHL_REDIRECT_URI
    })
  });
  
  return response.json(); // { access_token, refresh_token, expires_in }
}
```

### Key Endpoints

#### 1. Create Sub-Account (Onboarding)
```javascript
POST https://services.leadconnectorhq.com/locations/

Headers:
  Authorization: Bearer {access_token}
  Version: 2021-07-28

Body:
{
  "name": "John's Plumbing",
  "address": "123 Main St",
  "city": "Austin",
  "state": "TX",
  "country": "US",
  "postalCode": "78701",
  "website": "https://johnsplumbing.com",
  "timezone": "America/Chicago",
  "email": "john@plumbing.com",
  "phone": "+15125551234"
}

Response:
{
  "location": {
    "id": "loc_abc123",
    "name": "John's Plumbing",
    ...
  }
}
```

#### 2. Create Contact (Lead)
```javascript
POST https://services.leadconnectorhq.com/contacts/

Headers:
  Authorization: Bearer {access_token}
  Version: 2021-07-28

Body:
{
  "locationId": "loc_abc123",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "+15125555678",
  "source": "missed_call",
  "tags": ["hot_lead", "plumbing"],
  "customFields": [
    { "key": "service_type", "value": "Emergency Repair" },
    { "key": "urgency", "value": "High" }
  ]
}

Response:
{
  "contact": {
    "id": "contact_xyz789",
    ...
  }
}
```

#### 3. Create Workflow
```javascript
POST https://services.leadconnectorhq.com/workflows/

Headers:
  Authorization: Bearer {access_token}
  Version: 2021-07-28

Body:
{
  "locationId": "loc_abc123",
  "name": "Missed Call Recovery",
  "status": "published",
  "trigger": {
    "type": "webhook",
    "webhookUrl": "https://our-api.com/webhooks/ghl/missed-call"
  },
  "actions": [
    {
      "type": "wait",
      "delay": 30,
      "unit": "seconds"
    },
    {
      "type": "send_sms",
      "message": "Hi {{contact.firstName}}, thanks for calling! How can we help?",
      "fromNumber": "{{location.phone}}"
    },
    {
      "type": "wait",
      "delay": 5,
      "unit": "minutes"
    },
    {
      "type": "send_email",
      "subject": "We're here to help!",
      "body": "..."
    }
  ]
}
```

#### 4. Send SMS
```javascript
POST https://services.leadconnectorhq.com/conversations/messages

Headers:
  Authorization: Bearer {access_token}
  Version: 2021-07-28

Body:
{
  "locationId": "loc_abc123",
  "contactId": "contact_xyz789",
  "type": "SMS",
  "message": "Hi Jane! We received your call. Can we schedule a visit?",
  "attachments": []
}
```

#### 5. Webhook Handler (Incoming)
```javascript
// Our API endpoint to receive GHL webhooks
POST /api/webhooks/ghl

Body (example - missed call):
{
  "type": "InboundCall",
  "locationId": "loc_abc123",
  "contactId": "contact_xyz789",
  "callStatus": "no-answer",
  "callDuration": 0,
  "callerNumber": "+15125555678",
  "timestamp": "2025-12-06T10:30:00Z"
}

Our Response:
{
  "received": true,
  "action": "triggered_missed_call_workflow"
}
```

### Rate Limits
- **Standard:** 100 requests/minute
- **Burst:** 200 requests/minute
- **Daily:** 10,000 requests/day

### Error Handling
```javascript
try {
  const response = await fetch(GHL_API_URL, options);
  
  if (!response.ok) {
    if (response.status === 429) {
      // Rate limited - retry with exponential backoff
      await sleep(60000); // Wait 1 minute
      return retryRequest();
    }
    
    if (response.status === 401) {
      // Token expired - refresh
      await refreshGHLToken();
      return retryRequest();
    }
    
    throw new Error(`GHL API error: ${response.status}`);
  }
  
  return response.json();
} catch (error) {
  // Log error, alert admin
  console.error('GHL API Error:', error);
  await notifyAdmin('GHL API failure', error);
  throw error;
}
```

---

## 2️⃣ GOOGLE ADS API INTEGRATION

### Authentication
**Method:** OAuth 2.0
**Scopes:** `https://www.googleapis.com/auth/adwords`

```javascript
// OAuth Flow
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';

// Required credentials
const credentials = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
};
```

### Key Endpoints

#### 1. Get Campaign Performance
```javascript
POST https://googleads.googleapis.com/v15/customers/{customer_id}/googleAds:search

Headers:
  Authorization: Bearer {access_token}
  developer-token: {developer_token}

Body:
{
  "query": "SELECT campaign.id, campaign.name, metrics.cost_micros, metrics.conversions, metrics.clicks FROM campaign WHERE campaign.status = 'ENABLED' AND segments.date DURING LAST_7_DAYS"
}

Response:
{
  "results": [
    {
      "campaign": {
        "id": "123456789",
        "name": "Plumbing - Emergency"
      },
      "metrics": {
        "costMicros": "50000000", // $50
        "conversions": 5,
        "clicks": 100
      }
    }
  ]
}
```

#### 2. Update Campaign Budget
```javascript
POST https://googleads.googleapis.com/v15/customers/{customer_id}/campaigns:mutate

Headers:
  Authorization: Bearer {access_token}
  developer-token: {developer_token}

Body:
{
  "operations": [
    {
      "update": {
        "resourceName": "customers/{customer_id}/campaigns/{campaign_id}",
        "campaignBudget": {
          "amountMicros": "100000000" // $100/day
        }
      },
      "updateMask": "campaignBudget.amountMicros"
    }
  ]
}
```

#### 3. Adjust Keyword Bids
```javascript
POST https://googleads.googleapis.com/v15/customers/{customer_id}/adGroupCriteria:mutate

Headers:
  Authorization: Bearer {access_token}
  developer-token: {developer_token}

Body:
{
  "operations": [
    {
      "update": {
        "resourceName": "customers/{customer_id}/adGroupCriteria/{criterion_id}",
        "cpcBidMicros": "5000000" // $5.00 CPC
      },
      "updateMask": "cpcBidMicros"
    }
  ]
}
```

#### 4. Add Negative Keywords
```javascript
POST https://googleads.googleapis.com/v15/customers/{customer_id}/campaignCriteria:mutate

Headers:
  Authorization: Bearer {access_token}
  developer-token: {developer_token}

Body:
{
  "operations": [
    {
      "create": {
        "campaign": "customers/{customer_id}/campaigns/{campaign_id}",
        "keyword": {
          "text": "free",
          "matchType": "BROAD"
        },
        "negative": true
      }
    }
  ]
}
```

### Rate Limits
- **Standard:** 15,000 operations/day
- **Burst:** 1,000 operations/minute

### Optimization Logic
```javascript
// Optimizing Agent logic
async function optimizeCampaign(customerId, campaignId) {
  // Get performance data
  const performance = await getPerformanceData(customerId, campaignId);
  
  // Calculate CPL
  const cpl = performance.cost / performance.conversions;
  
  // Decision logic
  if (cpl > 30) {
    // CPL too high - reduce bids
    await reduceBids(customerId, campaignId, 0.9); // 10% reduction
    await addNegativeKeywords(customerId, campaignId);
  } else if (cpl < 15 && performance.impressionShare < 0.8) {
    // CPL good, low impression share - increase bids
    await increaseBids(customerId, campaignId, 1.1); // 10% increase
  }
  
  // Pause underperforming keywords
  const keywords = await getKeywordPerformance(customerId, campaignId);
  for (const keyword of keywords) {
    if (keyword.clicks > 50 && keyword.conversions === 0) {
      await pauseKeyword(customerId, keyword.id);
    }
  }
}
```

---

## 3️⃣ TWILIO SMS INTEGRATION

### Authentication
**Method:** Basic Auth (Account SID + Auth Token)

```javascript
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
```

### Key Endpoints

#### 1. Send SMS
```javascript
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json

Headers:
  Authorization: Basic {base64(AccountSid:AuthToken)}

Body (form-urlencoded):
  To: +15125555678
  From: +15125551234
  Body: Hi Jane! We received your call. Can we schedule a visit?

Response:
{
  "sid": "SM1234567890abcdef",
  "status": "queued",
  "to": "+15125555678",
  "from": "+15125551234",
  "body": "Hi Jane! We received your call...",
  "dateCreated": "2025-12-06T10:30:00Z"
}
```

#### 2. Webhook Handler (Incoming SMS)
```javascript
// Our API endpoint to receive Twilio webhooks
POST /api/webhooks/twilio/sms

Body (form-urlencoded):
  MessageSid: SM1234567890abcdef
  From: +15125555678
  To: +15125551234
  Body: Yes, I need emergency plumbing help!

Our Response (TwiML):
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Great! We'll call you in 5 minutes to schedule.</Message>
</Response>
```

### Rate Limits
- **Standard:** 100 messages/second
- **A2P:** Requires registration, higher throughput

---

## 4️⃣ STRIPE PAYMENT INTEGRATION

### Authentication
**Method:** API Key (Secret Key)

```javascript
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(STRIPE_SECRET_KEY);
```

### Key Endpoints

#### 1. Create Subscription
```javascript
// Monthly subscription for technician
const subscription = await stripe.subscriptions.create({
  customer: 'cus_abc123',
  items: [
    { price: 'price_monthly_199' } // $199/month
  ],
  payment_behavior: 'default_incomplete',
  expand: ['latest_invoice.payment_intent']
});

// Return client_secret for frontend
return subscription.latest_invoice.payment_intent.client_secret;
```

#### 2. Webhook Handler
```javascript
POST /api/webhooks/stripe

Headers:
  Stripe-Signature: {signature}

Body:
{
  "type": "invoice.payment_succeeded",
  "data": {
    "object": {
      "id": "in_abc123",
      "customer": "cus_abc123",
      "amount_paid": 19900,
      "status": "paid"
    }
  }
}

// Verify signature
const sig = request.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(request.body, sig, WEBHOOK_SECRET);

// Handle event
if (event.type === 'invoice.payment_succeeded') {
  // Activate user account
  await activateUserAccount(event.data.object.customer);
}
```

---

## 5️⃣ OPENAI API INTEGRATION

### Authentication
**Method:** Bearer Token

```javascript
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
```

### Key Endpoints

#### 1. Chat Completion (AI Agents)
```javascript
POST https://api.openai.com/v1/chat/completions

Headers:
  Authorization: Bearer {api_key}
  Content-Type: application/json

Body:
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "You are a diagnostic agent analyzing plumbing business performance..."
    },
    {
      "role": "user",
      "content": "CPL increased from $20 to $35 in last 3 days. Analyze root cause."
    }
  ],
  "temperature": 0.7,
  "max_tokens": 500
}

Response:
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Based on the data, the CPL increase is likely due to..."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 200,
    "total_tokens": 250
  }
}
```

### Rate Limits
- **GPT-4:** 10,000 tokens/minute
- **GPT-3.5:** 90,000 tokens/minute

---

## 🔄 INTEGRATION WORKFLOW

### Onboarding Flow
```
1. User signs up → Create Stripe customer
2. User connects GHL → OAuth flow → Store tokens
3. User connects Google Ads → OAuth flow → Store tokens
4. Create GHL sub-account → Set up workflows
5. Activate subscription → Start monitoring
```

### Missed Call Flow
```
1. Customer calls → Technician busy
2. Call forwards to GHL number
3. GHL webhook → Our API
4. Trigger workflow:
   - Wait 30s → Send SMS (Twilio)
   - Wait 5min → Send email
5. Customer replies → GHL webhook → Our API
6. Create lead in GHL
7. Notify technician
```

### Optimization Flow
```
1. Monitor Agent → Detects CPL > $30
2. Trigger Diagnostic Agent → Analyze root cause
3. Trigger Optimizing Agent → Adjust bids/keywords
4. Execute via Google Ads API
5. Log action in database
6. Monitor results
```

---

## 📊 API MONITORING

### Metrics to Track
- **Response time:** p50, p95, p99
- **Error rate:** 4xx, 5xx
- **Rate limit hits:** Track approaching limits
- **Cost:** API usage costs

### Alerting
- API error rate > 1%
- Response time > 2s
- Rate limit hit
- Webhook delivery failure

---

**Status:** API INTEGRATION DESIGN COMPLETE
**Next:** Database Schema + AI Agent Workflows
**Priority:** HIGH - Foundation for all integrations

