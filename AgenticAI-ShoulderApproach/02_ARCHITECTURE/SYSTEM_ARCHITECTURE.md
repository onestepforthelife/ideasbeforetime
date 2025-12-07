# 🏗️ SYSTEM ARCHITECTURE

**Created:** December 6, 2025  
**Purpose:** Technical architecture for Agentic AI "Shoulder Approach"

---

## 🎯 ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                        CUSTOMER JOURNEY                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    1. LEAD SOURCE (Google Ads)                   │
│  • Search Ads: "drain cleaning near me"                         │
│  • Call Extension: Technician's primary number                  │
│  • Tracking: Google Ads conversion tracking                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              2. TRIGGER (Conditional Forwarding)                 │
│                                                                  │
│  Customer Calls → Technician's Phone                            │
│         ↓                    ↓                                   │
│    Answered?            Not Answered?                            │
│         ↓                    ↓                                   │
│   Normal Service    Forward to GHL Number                        │
│   (AI not involved)         ↓                                    │
│                      AI ACTIVATES                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│           3. EXECUTION ENGINE (GoHighLevel - GHL)                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Workflow 1: Missed Call Recovery                        │  │
│  │  • Trigger: Call status = "No Answer"                    │  │
│  │  • Action: Send SMS immediately                          │  │
│  │  • Message: "Sorry we missed you. Reply YES for quote"  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Workflow 2: Offer/Quote                                 │  │
│  │  • Trigger: Lead replies YES                             │  │
│  │  • Action: Send pricing                                  │  │
│  │  • Message: "Basic clogs: $150. Book now?"              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Workflow 3: Booking Confirmation                        │  │
│  │  • Trigger: Lead replies BOOK                            │  │
│  │  • Action: Create calendar event + send confirmation    │  │
│  │  • Message: "Confirmed! [Tech] arrives [Time]"          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Workflow 4: Post-Job Review                             │  │
│  │  • Trigger: Job status = "Completed" + 4 hours          │  │
│  │  • Action: Send review request                           │  │
│  │  • Message: "Please review us: [Link]"                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Workflow 5: AMC Offer                                   │  │
│  │  • Trigger: Job status = "Completed" + 30 days          │  │
│  │  • Action: Send AMC offer                                │  │
│  │  • Message: "Annual maintenance: $299/year"             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              4. INTELLIGENCE LAYER (Agentic AI)                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Monitor Agent (Observation)                             │  │
│  │  • Tracks: CPL, Booking Rate, Forwarding Status         │  │
│  │  • Frequency: Real-time + Weekly tests                  │  │
│  │  • Output: Performance dashboard + alerts               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Diagnostic Agent (Analysis)                             │  │
│  │  • Input: Alerts from Monitor Agent                     │  │
│  │  • Process: Root cause analysis                         │  │
│  │  • Output: Diagnosis + recommended fix                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Optimizing Agent (Action)                               │  │
│  │  • Input: Diagnosis from Diagnostic Agent               │  │
│  │  • Process: "Amit Thoughtbot" decision-making           │  │
│  │  • Output: Implemented changes via APIs                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔗 CONNECTION POINTS (Detailed)

### Connection Point 1: Conditional Forwarding Setup

**Technical Implementation:**

```
Step 1: Get GHL Tracking Number
- Login to GHL account
- Navigate to: Settings → Phone Numbers
- Purchase US-based tracking number
- Note the number: (XXX) XXX-XXXX

Step 2: Configure Conditional Forwarding
- Identify carrier (T-Mobile, Verizon, AT&T, etc.)
- Find carrier-specific code:
  * T-Mobile: *004*<GHL-number>#
  * Verizon: *71<GHL-number>
  * AT&T: *004*<GHL-number>#
- Dial code on technician's phone
- Verify activation (carrier confirmation message)

Step 3: Test Forwarding
- Call technician's number from test phone
- Let it ring (don't answer)
- Verify call forwards to GHL number
- Check GHL dashboard for incoming call log

Step 4: Set Up Weekly AI Test
- Monitor Agent calls technician's number weekly
- If call doesn't forward → Alert technician
- Technician re-activates forwarding code
```

**Guardrails:**
- Weekly automated test
- Alert if forwarding fails
- Backup: Manual check monthly

---

### Connection Point 2: GHL Workflow Configuration

**Technical Implementation:**

```
For Each Workflow:

1. Create Workflow in GHL
   - Navigate to: Automation → Workflows
   - Click: New Workflow
   - Name: [Workflow Name]

2. Set Trigger
   - Type: Inbound Call, SMS Reply, Pipeline Stage Change
   - Condition: Specific status or keyword
   - Example: "Call status = No Answer"

3. Add Actions
   - Action 1: Send SMS (immediate)
   - Action 2: Wait (5 minutes)
   - Action 3: Send Email (if no SMS reply)
   - Action 4: Update pipeline stage

4. Configure Messages
   - Use merge fields: {{contact.first_name}}
   - Keep messages short (< 160 characters for SMS)
   - Include clear CTA: "Reply YES", "Reply BOOK"

5. Test Workflow
   - Use GHL test mode
   - Verify all actions trigger correctly
   - Check message delivery
   - Verify pipeline updates

6. Activate Workflow
   - Toggle: Active
   - Monitor: First 10 leads manually
   - Adjust: Based on response rates
```

**Message Templates:**

```
Missed Call Recovery:
"Hi {{first_name}}, sorry we missed your call! Need drain cleaning? Reply YES for a quick quote."

Offer/Quote:
"Great! For basic clogs, our rate is $150. Can we book you today? Reply BOOK or CALL."

Booking Confirmation:
"Confirmed! {{technician_name}} will arrive {{appointment_date}} at {{appointment_time}}. His number: {{tech_phone}}"

Review Request:
"Thanks for choosing us! Please share your experience: {{review_link}}"

AMC Offer:
"Prevent future clogs! Annual maintenance for $299/year. Details: {{amc_link}}"
```

---

### Connection Point 3: AI Agent Integration

**Technical Architecture:**

```
┌─────────────────────────────────────────────────────────────────┐
│                      AI AGENT FRAMEWORK                          │
│                      (LangChain + AutoGen)                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Monitor Agent (Python Script - Runs every 15 minutes)          │
│                                                                  │
│  import requests                                                 │
│  from langchain import Agent                                     │
│                                                                  │
│  # Fetch data from APIs                                         │
│  google_ads_data = fetch_google_ads_api()                       │
│  ghl_data = fetch_ghl_api()                                     │
│                                                                  │
│  # Calculate metrics                                            │
│  cpl = google_ads_data['cost'] / google_ads_data['leads']      │
│  booking_rate = ghl_data['bookings'] / ghl_data['leads']       │
│                                                                  │
│  # Check thresholds                                             │
│  if cpl > 200:                                                  │
│      alert_diagnostic_agent("CPL too high")                     │
│  if booking_rate < 0.25:                                        │
│      alert_diagnostic_agent("Booking rate too low")             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Diagnostic Agent (Triggered by alerts)                         │
│                                                                  │
│  from autogen import Agent                                       │
│                                                                  │
│  # Receive alert                                                │
│  alert = receive_alert()                                        │
│                                                                  │
│  # Run diagnosis                                                │
│  if alert == "CPL too high":                                    │
│      # Check search terms                                       │
│      search_terms = fetch_google_ads_search_terms()             │
│      irrelevant_terms = identify_irrelevant(search_terms)       │
│      diagnosis = "Wrong targeting: " + irrelevant_terms         │
│                                                                  │
│  if alert == "Booking rate too low":                            │
│      # Check GHL conversation logs                              │
│      conversations = fetch_ghl_conversations()                  │
│      drop_off_point = identify_drop_off(conversations)          │
│      diagnosis = "Drop-off at: " + drop_off_point               │
│                                                                  │
│  # Send to Optimizing Agent                                     │
│  send_to_optimizing_agent(diagnosis)                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Optimizing Agent (Implements fixes)                            │
│                                                                  │
│  from langchain import Agent                                     │
│  from google.ads import GoogleAdsClient                         │
│  from ghl import GHLClient                                      │
│                                                                  │
│  # Receive diagnosis                                            │
│  diagnosis = receive_diagnosis()                                │
│                                                                  │
│  # Use "Amit Thoughtbot" prompt                                 │
│  prompt = """                                                    │
│  You are Amit, a strategic business thinker.                    │
│  Diagnosis: {diagnosis}                                         │
│  What action should we take?                                    │
│  Consider: Business impact, cost, risk, customer experience     │
│  """                                                             │
│                                                                  │
│  # Get AI decision                                              │
│  decision = llm.generate(prompt)                                │
│                                                                  │
│  # Implement via APIs                                           │
│  if decision == "Pause ad group":                               │
│      google_ads_client.pause_ad_group(ad_group_id)              │
│                                                                  │
│  if decision == "Change SMS script":                            │
│      ghl_client.update_workflow_message(workflow_id, new_msg)   │
│                                                                  │
│  # Log action                                                   │
│  log_action(decision, timestamp, result)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔌 API INTEGRATIONS

### Google Ads API

**Purpose:** Monitor CPL, pause/activate ad groups, add negative keywords

**Authentication:**
- OAuth 2.0
- Developer token
- Client ID & Secret

**Key Endpoints:**
```python
# Get campaign performance
GET /v14/customers/{customer_id}/googleAds:search

# Pause ad group
POST /v14/customers/{customer_id}/adGroups:mutate

# Add negative keyword
POST /v14/customers/{customer_id}/campaignCriteria:mutate
```

---

### GHL API

**Purpose:** Monitor leads, update workflows, send SMS

**Authentication:**
- API Key (from GHL settings)
- Location ID

**Key Endpoints:**
```python
# Get contacts (leads)
GET /contacts?locationId={location_id}

# Get conversations
GET /conversations/{contact_id}

# Update workflow
PUT /workflows/{workflow_id}

# Send SMS
POST /conversations/messages
```

---

### Twilio API (Optional - if not using GHL SMS)

**Purpose:** Send SMS directly

**Authentication:**
- Account SID
- Auth Token

**Key Endpoint:**
```python
# Send SMS
POST /2010-04-01/Accounts/{AccountSid}/Messages.json
```

---

## 🗄️ DATA FLOW

### Data Sources

```
1. Google Ads
   ↓
   [CPL, Search Terms, Ad Performance]
   ↓
   Monitor Agent

2. GHL
   ↓
   [Leads, Conversations, Pipeline Stages]
   ↓
   Monitor Agent

3. Conditional Forwarding Test
   ↓
   [Forwarding Status: Active/Inactive]
   ↓
   Monitor Agent
```

### Data Storage

```
Database: PostgreSQL or MongoDB

Tables/Collections:
- leads (id, source, timestamp, status)
- conversations (id, lead_id, messages, timestamps)
- metrics (date, cpl, booking_rate, forwarding_status)
- ai_actions (timestamp, agent, diagnosis, action, result)
```

### Data Processing

```
Real-time:
- Incoming calls → GHL → Workflow triggers
- SMS replies → GHL → Workflow actions

Batch (Every 15 minutes):
- Monitor Agent fetches metrics
- Calculates KPIs
- Checks thresholds
- Triggers alerts if needed

Weekly:
- Forwarding test
- Performance report
- AI learning summary
```

---

## 🔒 SECURITY & COMPLIANCE

### API Key Management
- Store in environment variables (never in code)
- Use secrets manager (AWS Secrets Manager, GCP Secret Manager)
- Rotate keys quarterly

### Data Privacy
- GDPR compliance (if applicable)
- Customer data encryption at rest
- Secure API connections (HTTPS only)

### Access Control
- Role-based access (admin, technician, AI agents)
- Audit logs for all AI actions
- Human approval for high-impact changes

---

## 📊 MONITORING & LOGGING

### System Health Dashboard

```
Real-time Metrics:
- CPL (current vs target)
- Booking Rate (current vs target)
- Forwarding Status (active/inactive)
- API Response Times
- Error Rates

Daily Summary:
- Total leads
- Total bookings
- Revenue generated
- AI actions taken

Weekly Report:
- Trend analysis
- AI learning insights
- Optimization recommendations
```

### Logging

```
Log Levels:
- INFO: Normal operations
- WARNING: Threshold approaching
- ERROR: System failure
- CRITICAL: Immediate action required

Log Storage:
- CloudWatch (AWS)
- Stackdriver (GCP)
- Local files (backup)

Retention: 90 days
```

---

## 🚀 DEPLOYMENT ARCHITECTURE

### Infrastructure

```
Option 1: Cloud-based (Recommended)
- AWS Lambda (for AI agents)
- AWS RDS (for database)
- AWS CloudWatch (for monitoring)
- AWS Secrets Manager (for API keys)

Option 2: Self-hosted
- VPS (DigitalOcean, Linode)
- Docker containers
- Cron jobs for scheduled tasks
- Local database

Option 3: Hybrid
- GHL (cloud-based workflows)
- Local Python scripts (AI agents)
- Cloud database (RDS)
```

### Scalability

```
Current: 50 leads/month
Target: 500 leads/month

Scaling Strategy:
- Horizontal: Add more Lambda functions
- Vertical: Increase database capacity
- Caching: Redis for frequently accessed data
- Load balancing: Distribute API calls
```

---

**Last Updated:** December 6, 2025  
**Status:** COMPLETE - Ready for workflow specifications  
**Next:** GHL Workflow Detailed Specifications
