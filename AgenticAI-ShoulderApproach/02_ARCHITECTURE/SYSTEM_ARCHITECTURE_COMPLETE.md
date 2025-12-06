# 🏗️ SYSTEM ARCHITECTURE - Agentic SaaS "Shoulder Approach"

**Created:** December 6, 2025
**Based on:** Requirements document + Enterprise frameworks + Cloudflare documentation
**Purpose:** Complete system architecture for ₹5L MRR SaaS targeting US tradesmen

---

## 🎯 ARCHITECTURE OVERVIEW

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Technician  │  │   Customer   │  │    Admin     │          │
│  │   (Mobile)   │  │    (SMS)     │  │  (Dashboard) │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Web Portal  │  │  SMS Gateway │  │  Dashboard   │          │
│  │  (Onboard)   │  │   (Twilio)   │  │   (React)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              AGENTIC AI ORCHESTRATOR                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │
│  │  │ Monitor  │ │    CX    │ │Diagnostic│ │Optimizing│   │   │
│  │  │  Agent   │ │  Agent   │ │  Agent   │ │  Agent   │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │   │
│  │  ┌──────────┐                                           │   │
│  │  │Retention │                                           │   │
│  │  │  Agent   │                                           │   │
│  │  └──────────┘                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Workflow    │  │   Business   │  │   Analytics  │          │
│  │   Engine     │  │    Logic     │  │    Engine    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    INTEGRATION LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  GHL API     │  │ Google Ads   │  │   Payment    │          │
│  │  (CRM/SMS)   │  │     API      │  │   Gateway    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  PostgreSQL  │  │    Redis     │  │  Cloudflare  │          │
│  │  (Primary)   │  │   (Cache)    │  │  R2 (Files)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ TECHNOLOGY STACK

### Frontend
**Technology:** React + TypeScript
**Hosting:** Cloudflare Pages
**Why:** Fast, scalable, edge deployment

**Components:**
- Onboarding portal (technician signup)
- Admin dashboard (metrics, controls)
- Mobile-responsive design
- Real-time updates (WebSockets)

---

### Backend
**Technology:** Cloudflare Workers (Serverless)
**Language:** TypeScript
**Why:** Edge computing, low latency, auto-scaling

**Services:**
- API Gateway (REST + GraphQL)
- Webhook handlers (GHL, Google Ads)
- Background jobs (Cloudflare Queues)
- Scheduled tasks (Cron Triggers)

---

### AI Layer
**Framework:** LangChain (industry standard)
**LLM:** OpenAI GPT-4 (primary) + Anthropic Claude (fallback)
**Why:** Proven, reliable, extensive ecosystem

**Components:**
- 5 specialized agents (Monitor, CX, Diagnostic, Optimizing, Retention)
- Agent orchestrator (coordinates agents)
- Memory system (conversation context)
- Tool integrations (GHL API, Google Ads API)

---

### Database
**Primary:** PostgreSQL (Neon serverless)
**Cache:** Redis (Upstash)
**Files:** Cloudflare R2
**Why:** Reliable, scalable, cost-effective

**Schema:**
- Users (technicians, admins)
- Leads (pipeline, status)
- Calls (logs, recordings)
- Campaigns (Google Ads)
- Financials (revenue, costs)
- AI Logs (agent actions, decisions)

---

### Integrations
**GHL API:** CRM, workflows, SMS
**Google Ads API:** Campaigns, keywords, bids
**Twilio:** SMS (A2P messaging)
**Stripe:** Payments (US customers)
**Razorpay:** Payments (Indian resellers)

---

## 📊 COMPONENT ARCHITECTURE

### 1. Conditional Call Forwarding System

```
┌─────────────────────────────────────────────────────────────┐
│                 CALL FLOW ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────┘

Customer Call
     ↓
Technician Primary Number
     ↓
[Busy/No Answer?]
     ↓ YES
Conditional Forwarding (*67 code)
     ↓
GHL Tracking Number
     ↓
GHL Call Webhook → Our API
     ↓
[Call Status = "No Answer"?]
     ↓ YES
Trigger Missed Call Recovery Workflow
     ↓
Send SMS (30 seconds)
     ↓
[No Reply in 5 min?]
     ↓ YES
Send Email
     ↓
[Customer Replies?]
     ↓ YES
Send Pricing Info (60 seconds)
     ↓
[Booking Intent?]
     ↓ YES
Notify Technician + Create Lead
```

**Components:**
- Call webhook handler (Cloudflare Worker)
- SMS sender (Twilio API)
- Email sender (SendGrid/Resend)
- Lead creator (GHL API)
- Notification system (Push/SMS to technician)

---

### 2. Agentic AI Orchestrator

```
┌─────────────────────────────────────────────────────────────┐
│              AI AGENT ARCHITECTURE                           │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │   Orchestrator   │
                    │   (LangChain)    │
                    └──────────────────┘
                            ↓
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Monitor    │    │      CX      │    │  Diagnostic  │
│    Agent     │    │    Agent     │    │    Agent     │
└──────────────┘    └──────────────┘    └──────────────┘
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Optimizing   │    │  Retention   │    │   Memory     │
│    Agent     │    │    Agent     │    │   System     │
└──────────────┘    └──────────────┘    └──────────────┘
        ↓                   ↓                   ↓
┌──────────────────────────────────────────────────────┐
│              TOOL INTEGRATIONS                        │
│  GHL API | Google Ads API | Database | Analytics     │
└──────────────────────────────────────────────────────┘
```

**Agent Responsibilities:**

**Monitor Agent:**
- Track CPL (Cost Per Lead)
- Track conversion rates
- Detect anomalies
- Trigger other agents when thresholds exceeded

**CX Agent:**
- Optimize SMS scripts
- A/B test messaging
- Personalize communications
- Improve response rates

**Diagnostic Agent:**
- Analyze performance drops
- Identify root causes
- Recommend fixes
- Generate reports

**Optimizing Agent:**
- Adjust Google Ads bids
- Pause/activate keywords
- Modify GHL workflows
- Implement A/B tests

**Retention Agent:**
- Send review requests
- Offer AMC contracts
- Re-engage dormant customers
- Maximize CLV

---

### 3. GHL Workflow Integration

```
┌─────────────────────────────────────────────────────────────┐
│              GHL WORKFLOW ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │   GHL Platform   │
                    │   (Sub-Account)  │
                    └──────────────────┘
                            ↓
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Missed Call  │    │ Offer/Quote  │    │   Booking    │
│   Recovery   │    │   Workflow   │    │ Confirmation │
└──────────────┘    └──────────────┘    └──────────────┘
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Post-Job    │    │  Post-Job    │    │   Pipeline   │
│    Review    │    │     AMC      │    │  Management  │
└──────────────┘    └──────────────┘    └──────────────┘
        ↓                   ↓                   ↓
┌──────────────────────────────────────────────────────┐
│              OUR API (Webhooks)                       │
│  Workflow Triggers | Status Updates | Data Sync      │
└──────────────────────────────────────────────────────┘
```

**Workflow Configuration:**
- Automated setup on technician onboarding
- Dynamic script updates (CX Agent)
- Real-time monitoring
- Error handling and retries

---

### 4. Google Ads Integration

```
┌─────────────────────────────────────────────────────────────┐
│           GOOGLE ADS ARCHITECTURE                            │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │  Google Ads API  │
                    │   (OAuth 2.0)    │
                    └──────────────────┘
                            ↓
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Campaign   │    │   Ad Group   │    │   Keywords   │
│  Management  │    │  Management  │    │  Management  │
└──────────────┘    └──────────────┘    └──────────────┘
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│     Bid      │    │    Budget    │    │   Negative   │
│ Optimization │    │  Management  │    │   Keywords   │
└──────────────┘    └──────────────┘    └──────────────┘
        ↓                   ↓                   ↓
┌──────────────────────────────────────────────────────┐
│           OPTIMIZING AGENT                            │
│  Auto-adjust based on performance data                │
└──────────────────────────────────────────────────────┘
```

**Optimization Logic:**
- Increase bids for high-performing keywords (10-20%)
- Pause keywords with no conversions after 50 clicks
- Add negative keywords from search term reports
- Adjust daily budget based on ROI
- A/B test ad copy

---

## 🔐 SECURITY ARCHITECTURE

### Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────┐
│              SECURITY ARCHITECTURE                           │
└─────────────────────────────────────────────────────────────┘

User Request
     ↓
Cloudflare Access (Zero Trust)
     ↓
[Authenticated?]
     ↓ YES
JWT Token Validation
     ↓
Role-Based Access Control (RBAC)
     ↓
[Authorized?]
     ↓ YES
API Request Processing
     ↓
Input Validation (OWASP)
     ↓
Business Logic
     ↓
Output Sanitization
     ↓
Response
```

**Security Layers:**
1. **Cloudflare Access:** Email OTP authentication
2. **JWT Tokens:** Stateless authentication
3. **RBAC:** Role-based permissions (Admin, Technician, Viewer)
4. **Input Validation:** All user inputs validated
5. **Output Sanitization:** Prevent XSS attacks
6. **API Rate Limiting:** Prevent abuse
7. **Encryption:** At rest (database) and in transit (HTTPS)
8. **Secrets Management:** Cloudflare Workers Secrets

---

### Compliance

**US Regulations:**
- **TCPA:** SMS opt-out compliance
- **CAN-SPAM:** Email unsubscribe
- **GDPR:** Data privacy (if EU customers)
- **CCPA:** California privacy rights

**Indian Regulations:**
- **DLT:** A2P SMS registration
- **KYC:** Business owner verification
- **Data Protection:** Secure storage

---

## 📊 DATA ARCHITECTURE

### Database Schema (PostgreSQL)

```sql
-- Users (Technicians)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  primary_phone VARCHAR(20) NOT NULL,
  service_area VARCHAR(255) NOT NULL,
  service_types TEXT[] NOT NULL,
  ghl_sub_account_id VARCHAR(255),
  google_ads_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  customer_phone VARCHAR(20) NOT NULL,
  customer_name VARCHAR(255),
  source VARCHAR(50) NOT NULL, -- 'missed_call', 'google_ads', 'referral'
  status VARCHAR(50) NOT NULL, -- 'new', 'contacted', 'quoted', 'booked', 'completed', 'lost'
  pipeline_stage VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Call Logs
CREATE TABLE call_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  lead_id UUID REFERENCES leads(id),
  caller_phone VARCHAR(20) NOT NULL,
  call_status VARCHAR(50) NOT NULL, -- 'answered', 'no_answer', 'busy', 'voicemail'
  call_duration INTEGER, -- seconds
  recording_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- SMS Logs
CREATE TABLE sms_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  lead_id UUID REFERENCES leads(id),
  recipient_phone VARCHAR(20) NOT NULL,
  message_text TEXT NOT NULL,
  status VARCHAR(50) NOT NULL, -- 'sent', 'delivered', 'failed', 'replied'
  reply_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Google Ads Campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  campaign_id VARCHAR(255) NOT NULL,
  campaign_name VARCHAR(255) NOT NULL,
  daily_budget DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL, -- 'active', 'paused', 'ended'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Financial Tracking
CREATE TABLE financials (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  ad_spend DECIMAL(10,2) NOT NULL,
  leads_generated INTEGER NOT NULL,
  bookings INTEGER NOT NULL,
  revenue DECIMAL(10,2) NOT NULL,
  cpl DECIMAL(10,2) GENERATED ALWAYS AS (ad_spend / NULLIF(leads_generated, 0)) STORED,
  roi DECIMAL(10,2) GENERATED ALWAYS AS ((revenue - ad_spend) / NULLIF(ad_spend, 0) * 100) STORED,
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI Agent Logs
CREATE TABLE ai_agent_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  agent_name VARCHAR(50) NOT NULL, -- 'monitor', 'cx', 'diagnostic', 'optimizing', 'retention'
  action_type VARCHAR(100) NOT NULL,
  action_data JSONB NOT NULL,
  result VARCHAR(50) NOT NULL, -- 'success', 'failed', 'pending'
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Caching Strategy (Redis)

**Cache Keys:**
- `user:{user_id}` - User profile (TTL: 1 hour)
- `leads:{user_id}` - Recent leads (TTL: 5 minutes)
- `metrics:{user_id}:{date}` - Daily metrics (TTL: 1 hour)
- `campaigns:{user_id}` - Active campaigns (TTL: 15 minutes)

**Cache Invalidation:**
- On user update
- On lead status change
- On campaign modification
- On financial data update

---

## 🚀 DEPLOYMENT ARCHITECTURE

### Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│              DEPLOYMENT ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │   Cloudflare     │
                    │   Global CDN     │
                    └──────────────────┘
                            ↓
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Pages       │    │   Workers    │    │   Queues     │
│ (Frontend)   │    │  (Backend)   │    │  (Jobs)      │
└──────────────┘    └──────────────┘    └──────────────┘
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Neon       │    │   Upstash    │    │      R2      │
│ (PostgreSQL) │    │   (Redis)    │    │   (Files)    │
└──────────────┘    └──────────────┘    └──────────────┘
```

**Regions:**
- **Primary:** US (closest to target customers)
- **Secondary:** India (for reseller operations)
- **Edge:** Global (Cloudflare CDN)

---

### CI/CD Pipeline

```
GitHub Push
     ↓
GitHub Actions
     ↓
[Run Tests]
     ↓
[Build Frontend] → Cloudflare Pages
     ↓
[Build Workers] → Cloudflare Workers
     ↓
[Run Migrations] → Neon PostgreSQL
     ↓
[Deploy]
     ↓
[Smoke Tests]
     ↓
[Notify Team]
```

**Environments:**
- **Development:** Local + Cloudflare Dev
- **Staging:** Cloudflare Preview
- **Production:** Cloudflare Production

---

## 📊 MONITORING & OBSERVABILITY

### Metrics to Track

**System Metrics:**
- API response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Worker execution time
- Database query time
- Cache hit rate

**Business Metrics:**
- CPL (Cost Per Lead)
- Conversion rate (lead → booking)
- MRR (Monthly Recurring Revenue)
- Churn rate
- Customer satisfaction

**AI Metrics:**
- Agent execution time
- Agent success rate
- Optimization impact
- A/B test results

---

### Logging & Alerting

**Logging:**
- Cloudflare Workers Logs
- Database query logs
- AI agent decision logs
- User action logs

**Alerting:**
- CPL exceeds $30 (3 days)
- Conversion rate drops below 25% (7 days)
- System error rate > 1%
- API response time > 1s
- Database connection failures

---

## 🎯 SCALABILITY PLAN

### Current Architecture (0-100 customers)
- Cloudflare Workers (auto-scaling)
- Neon PostgreSQL (serverless)
- Upstash Redis (serverless)
- Single region deployment

### Scale to 1000 customers
- Multi-region deployment
- Database read replicas
- Advanced caching
- Load balancing

### Scale to 10,000+ customers
- Microservices architecture
- Event-driven architecture
- Dedicated AI infrastructure
- Multi-cloud deployment

---

**Status:** ARCHITECTURE COMPLETE
**Next:** API Integration Design + Database Schema Implementation
**Priority:** HIGH - Foundation for entire system

**REMEMBER: This architecture is designed for ₹5L MRR scale with room to grow to ₹50L+ MRR!** 🏗️
