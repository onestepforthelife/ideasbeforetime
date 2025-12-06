# 🔗 GOHIGHLEVEL (GHL) API INTEGRATION

**Purpose:** Connect all systems to GHL automation engine  
**Type:** REST API integration  
**Technology:** Node.js + GHL API v2

---

## 🎯 OVERVIEW

**What It Does:**
- Receives webhooks from Twilio (calls)
- Sends data to Google Ads (conversions)
- Triggers workflows automatically
- Syncs data with mobile app
- Manages customer database

**Why It Matters:**
- Central automation hub
- Real-time data sync
- Workflow orchestration
- Single source of truth

---

## 🔑 AUTHENTICATION SETUP

### Step 1: Get API Credentials

**Location:** GHL Settings → Integrations → API

**Credentials Needed:**
- Location ID (unique per business)
- API Key (secret token)
- Webhook Secret (for verification)

**Security:**
```javascript
// Store in environment variables
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_WEBHOOK_SECRET = process.env.GHL_WEBHOOK_SECRET;

// Never commit to git
// Use AWS Secrets Manager in production
```

### Step 2: Test Authentication

**Test API Call:**
```javascript
const axios = require('axios');

async function testGHLAuth() {
    try {
        const response = await axios.get(
            `https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}`,
            {
                headers: {
                    'Authorization': `Bearer ${GHL_API_KEY}`,
                    'Version': '2021-07-28'
                }
            }
        );
        
        console.log('✅ GHL Authentication successful');
        console.log('Location:', response.data.name);
        return true;
    } catch (error) {
        console.error('❌ GHL Authentication failed:', error.message);
        return false;
    }
}
```

---

## 📥 WEBHOOK CONFIGURATION

### Incoming Webhooks (From Twilio)

**Webhook URL:** `https://your-domain.com/webhooks/twilio-call`

**Payload Example:**
```json
{
    "event": "call_received",
    "from": "+1234567890",
    "to": "+0987654321",
    "timestamp": "2025-12-06T10:30:00Z",
    "recording_url": "https://api.twilio.com/recordings/...",
    "duration": 120,
    "call_sid": "CA1234567890abcdef"
}
```

**Handler Code:**
```javascript
const express = require('express');
const app = express();

app.post('/webhooks/twilio-call', async (req, res) => {
    try {
        // Verify webhook signature
        if (!verifyTwilioSignature(req)) {
            return res.status(401).send('Unauthorized');
        }
        
        // Extract call data
        const callData = {
            phone: req.body.from,
            timestamp: req.body.timestamp,
            recordingUrl: req.body.recording_url,
            duration: req.body.duration
        };
        
        // Create contact in GHL
        const contact = await createGHLContact(callData);
        
        // Trigger workflow
        await triggerGHLWorkflow('missed-call-recovery', contact.id);
        
        // Respond immediately
        res.status(200).send('Webhook received');
        
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Internal error');
    }
});
```

### Outgoing Webhooks (To Google Ads)

**Trigger:** When booking confirmed in GHL

**Webhook URL:** `https://your-domain.com/webhooks/ghl-booking`

**Payload Example:**
```json
{
    "event": "booking_confirmed",
    "contact_id": "abc123",
    "booking_id": "book456",
    "service": "Drain Cleaning",
    "value": 150,
    "timestamp": "2025-12-06T11:00:00Z"
}
```

**Handler Code:**
```javascript
app.post('/webhooks/ghl-booking', async (req, res) => {
    try {
        // Verify GHL signature
        if (!verifyGHLSignature(req)) {
            return res.status(401).send('Unauthorized');
        }
        
        // Extract booking data
        const booking = req.body;
        
        // Send conversion to Google Ads
        await sendGoogleAdsConversion({
            gclid: booking.gclid, // Stored when lead created
            conversionValue: booking.value,
            conversionTime: booking.timestamp
        });
        
        // Update mobile app
        await notifyMobileApp('booking_confirmed', booking);
        
        res.status(200).send('Conversion tracked');
        
    } catch (error) {
        console.error('Booking webhook error:', error);
        res.status(500).send('Internal error');
    }
});
```

---

## 📊 API ENDPOINTS

### 1. Create Contact

**Endpoint:** `POST /contacts`

**Purpose:** Add new lead to GHL

**Request:**
```javascript
async function createGHLContact(data) {
    const response = await axios.post(
        `https://services.leadconnectorhq.com/contacts/`,
        {
            locationId: GHL_LOCATION_ID,
            firstName: data.firstName || 'Unknown',
            lastName: data.lastName || '',
            phone: data.phone,
            email: data.email || '',
            source: 'Missed Call',
            tags: ['missed-call', 'needs-follow-up'],
            customFields: {
                call_timestamp: data.timestamp,
                recording_url: data.recordingUrl,
                call_duration: data.duration
            }
        },
        {
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-07-28',
                'Content-Type': 'application/json'
            }
        }
    );
    
    return response.data.contact;
}
```

**Response:**
```json
{
    "contact": {
        "id": "abc123",
        "firstName": "John",
        "lastName": "Doe",
        "phone": "+1234567890",
        "email": "john@example.com",
        "tags": ["missed-call", "needs-follow-up"],
        "createdAt": "2025-12-06T10:30:00Z"
    }
}
```

### 2. Trigger Workflow

**Endpoint:** `POST /workflows/{workflowId}/subscribe`

**Purpose:** Start automation workflow for contact

**Request:**
```javascript
async function triggerGHLWorkflow(workflowName, contactId) {
    // Get workflow ID from name
    const workflowId = await getWorkflowId(workflowName);
    
    const response = await axios.post(
        `https://services.leadconnectorhq.com/workflows/${workflowId}/subscribe`,
        {
            contactId: contactId,
            eventStartTime: new Date().toISOString()
        },
        {
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-07-28'
            }
        }
    );
    
    return response.data;
}
```

### 3. Send SMS

**Endpoint:** `POST /conversations/messages`

**Purpose:** Send SMS to customer

**Request:**
```javascript
async function sendGHLSMS(contactId, message) {
    const response = await axios.post(
        `https://services.leadconnectorhq.com/conversations/messages`,
        {
            type: 'SMS',
            contactId: contactId,
            message: message,
            locationId: GHL_LOCATION_ID
        },
        {
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-07-28'
            }
        }
    );
    
    return response.data;
}
```

### 4. Create Opportunity

**Endpoint:** `POST /opportunities`

**Purpose:** Track potential booking

**Request:**
```javascript
async function createGHLOpportunity(contactId, data) {
    const response = await axios.post(
        `https://services.leadconnectorhq.com/opportunities/`,
        {
            locationId: GHL_LOCATION_ID,
            pipelineId: data.pipelineId,
            contactId: contactId,
            name: `${data.service} - ${data.contactName}`,
            monetaryValue: data.value,
            status: 'open',
            source: 'Missed Call'
        },
        {
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-07-28'
            }
        }
    );
    
    return response.data.opportunity;
}
```

### 5. Get Contact

**Endpoint:** `GET /contacts/{contactId}`

**Purpose:** Retrieve contact details

**Request:**
```javascript
async function getGHLContact(contactId) {
    const response = await axios.get(
        `https://services.leadconnectorhq.com/contacts/${contactId}`,
        {
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-07-28'
            }
        }
    );
    
    return response.data.contact;
}
```

---

## 🔄 DATA SYNC FLOWS

### Flow 1: Missed Call → GHL → SMS

**Steps:**
1. Twilio receives forwarded call
2. Twilio webhook to our server
3. Create contact in GHL
4. Trigger "Missed Call Recovery" workflow
5. GHL sends SMS to customer
6. GHL notifies technician

**Code:**
```javascript
async function handleMissedCall(callData) {
    // Step 1: Create contact
    const contact = await createGHLContact({
        phone: callData.from,
        firstName: 'Unknown',
        timestamp: callData.timestamp,
        recordingUrl: callData.recording_url,
        duration: callData.duration
    });
    
    // Step 2: Trigger workflow
    await triggerGHLWorkflow('missed-call-recovery', contact.id);
    
    // Step 3: Create opportunity
    await createGHLOpportunity(contact.id, {
        pipelineId: 'drain-cleaning-pipeline',
        service: 'Drain Cleaning',
        value: 150,
        contactName: contact.firstName
    });
    
    // Step 4: Log event
    console.log(`✅ Missed call handled for ${contact.phone}`);
    
    return contact;
}
```

### Flow 2: Booking Confirmed → Google Ads

**Steps:**
1. Customer confirms booking in GHL
2. GHL webhook to our server
3. Extract GCLID from contact
4. Send conversion to Google Ads
5. Update mobile app

**Code:**
```javascript
async function handleBookingConfirmed(bookingData) {
    // Step 1: Get contact details
    const contact = await getGHLContact(bookingData.contact_id);
    
    // Step 2: Extract GCLID
    const gclid = contact.customFields.gclid;
    
    if (gclid) {
        // Step 3: Send to Google Ads
        await sendGoogleAdsConversion({
            gclid: gclid,
            conversionValue: bookingData.value,
            conversionTime: bookingData.timestamp,
            conversionName: 'Booking'
        });
    }
    
    // Step 4: Update mobile app
    await notifyMobileApp('booking_confirmed', {
        contactId: contact.id,
        bookingId: bookingData.booking_id,
        service: bookingData.service,
        value: bookingData.value
    });
    
    console.log(`✅ Booking conversion tracked for ${contact.phone}`);
}
```

---

## 🛡️ ERROR HANDLING

### Retry Logic

**Strategy:** Exponential backoff with max 3 retries

**Code:**
```javascript
async function callGHLWithRetry(apiCall, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await apiCall();
        } catch (error) {
            lastError = error;
            
            // Don't retry on 4xx errors (client errors)
            if (error.response && error.response.status < 500) {
                throw error;
            }
            
            // Wait before retry (exponential backoff)
            const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
            console.log(`Retry ${attempt}/${maxRetries} after ${waitTime}ms`);
            await sleep(waitTime);
        }
    }
    
    // All retries failed
    throw lastError;
}

// Usage
const contact = await callGHLWithRetry(() => 
    createGHLContact(callData)
);
```

### Error Logging

**Strategy:** Log all errors to CloudWatch + alert on critical

**Code:**
```javascript
async function logGHLError(error, context) {
    // Log to CloudWatch
    console.error('GHL API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        context: context,
        timestamp: new Date().toISOString()
    });
    
    // Alert on critical errors
    if (error.response?.status >= 500) {
        await sendAlert({
            severity: 'critical',
            message: `GHL API error: ${error.message}`,
            context: context
        });
    }
}
```

---

## 📊 RATE LIMITING

**GHL Limits:**
- 100 requests per 10 seconds
- 1000 requests per hour
- 10,000 requests per day

**Strategy:**
```javascript
const rateLimit = require('express-rate-limit');

const ghlLimiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 90, // 90 requests (buffer of 10)
    message: 'Too many GHL API requests',
    standardHeaders: true,
    legacyHeaders: false
});

// Apply to all GHL routes
app.use('/api/ghl', ghlLimiter);
```

---

## 🧪 TESTING

### Unit Tests

**Test Contact Creation:**
```javascript
const { expect } = require('chai');

describe('GHL Contact Creation', () => {
    it('should create contact with valid data', async () => {
        const contact = await createGHLContact({
            phone: '+1234567890',
            firstName: 'Test',
            timestamp: new Date().toISOString()
        });
        
        expect(contact).to.have.property('id');
        expect(contact.phone).to.equal('+1234567890');
        expect(contact.firstName).to.equal('Test');
    });
    
    it('should handle missing optional fields', async () => {
        const contact = await createGHLContact({
            phone: '+1234567890'
        });
        
        expect(contact.firstName).to.equal('Unknown');
    });
    
    it('should retry on 500 errors', async () => {
        // Mock API to fail twice then succeed
        // Test that retry logic works
    });
});
```

### Integration Tests

**Test End-to-End Flow:**
```javascript
describe('Missed Call Flow', () => {
    it('should handle missed call end-to-end', async () => {
        // Step 1: Simulate Twilio webhook
        const response = await request(app)
            .post('/webhooks/twilio-call')
            .send({
                from: '+1234567890',
                timestamp: new Date().toISOString()
            });
        
        expect(response.status).to.equal(200);
        
        // Step 2: Verify contact created in GHL
        const contacts = await searchGHLContacts('+1234567890');
        expect(contacts).to.have.lengthOf(1);
        
        // Step 3: Verify workflow triggered
        const workflows = await getContactWorkflows(contacts[0].id);
        expect(workflows).to.include('missed-call-recovery');
        
        // Step 4: Verify SMS sent
        const messages = await getContactMessages(contacts[0].id);
        expect(messages).to.have.lengthOf.at.least(1);
    });
});
```

---

## 📋 IMPLEMENTATION CHECKLIST

**GHL Setup:**
- ☐ Create GHL account
- ☐ Get Location ID
- ☐ Generate API key
- ☐ Get webhook secret
- ☐ Store credentials securely (AWS Secrets Manager)

**Webhook Configuration:**
- ☐ Set up incoming webhook endpoint
- ☐ Configure Twilio to send webhooks
- ☐ Set up outgoing webhook endpoint
- ☐ Configure GHL to send webhooks
- ☐ Test webhook delivery

**API Integration:**
- ☐ Implement contact creation
- ☐ Implement workflow triggering
- ☐ Implement SMS sending
- ☐ Implement opportunity creation
- ☐ Implement contact retrieval

**Error Handling:**
- ☐ Implement retry logic
- ☐ Implement error logging
- ☐ Set up rate limiting
- ☐ Configure alerts
- ☐ Create error dashboard

**Testing:**
- ☐ Write unit tests
- ☐ Write integration tests
- ☐ Test error scenarios
- ☐ Test rate limiting
- ☐ Load testing

---

## 🎯 SUCCESS METRICS

**Technical Metrics:**
- API success rate: >99%
- Average response time: <500ms
- Webhook delivery rate: 100%
- Error rate: <1%

**Business Metrics:**
- Contacts created: 100% of calls
- Workflows triggered: 100% of contacts
- SMS delivery: >99%
- Data sync accuracy: 100%

---

**Status:** READY FOR IMPLEMENTATION  
**Priority:** CRITICAL - Central integration hub  
**Dependencies:** GHL account, Twilio setup, AWS infrastructure  
**Timeline:** 1 week development + 1 week testing

