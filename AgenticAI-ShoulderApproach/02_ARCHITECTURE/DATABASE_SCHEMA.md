# 🗄️ DATABASE SCHEMA

**Created:** December 6, 2025
**Database:** PostgreSQL (Neon serverless)
**Purpose:** Complete database design for Agentic SaaS platform

---

## 🎯 SCHEMA OVERVIEW

### Core Tables
1. **users** - Technician accounts
2. **leads** - Customer leads and pipeline
3. **call_logs** - Call tracking
4. **sms_logs** - SMS communication
5. **campaigns** - Google Ads campaigns
6. **keywords** - Campaign keywords
7. **financials** - Daily financial tracking
8. **ai_agent_logs** - AI agent actions
9. **subscriptions** - Payment subscriptions
10. **workflows** - GHL workflow configurations

---

## 📋 COMPLETE SCHEMA

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE (Technicians)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  
  -- Contact
  primary_phone VARCHAR(20) NOT NULL,
  business_address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  country VARCHAR(2) DEFAULT 'US',
  timezone VARCHAR(50) DEFAULT 'America/Chicago',
  
  -- Business Details
  service_types TEXT[] NOT NULL, -- ['plumbing', 'hvac', 'electrical']
  service_area VARCHAR(255), -- "Austin, TX - 30 mile radius"
  years_in_business INTEGER,
  license_number VARCHAR(100),
  
  -- Integration IDs
  ghl_location_id VARCHAR(255),
  ghl_access_token TEXT,
  ghl_refresh_token TEXT,
  ghl_token_expires_at TIMESTAMP,
  
  google_ads_customer_id VARCHAR(255),
  google_ads_refresh_token TEXT,
  
  stripe_customer_id VARCHAR(255),
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'suspended', 'cancelled'
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INTEGER DEFAULT 1,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_ghl_location_id ON users(ghl_location_id);
CREATE INDEX idx_users_status ON users(status);

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Customer Info
  customer_phone VARCHAR(20) NOT NULL,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_address TEXT,
  
  -- Lead Details
  source VARCHAR(50) NOT NULL, -- 'missed_call', 'google_ads', 'referral', 'website'
  service_type VARCHAR(100), -- 'Emergency Plumbing', 'HVAC Repair'
  urgency VARCHAR(20), -- 'high', 'medium', 'low'
  description TEXT,
  
  -- Pipeline
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'quoted', 'booked', 'completed', 'lost'
  pipeline_stage VARCHAR(50), -- 'lead', 'opportunity', 'proposal', 'negotiation', 'closed'
  
  -- Financial
  quoted_amount DECIMAL(10,2),
  actual_amount DECIMAL(10,2),
  
  -- GHL Integration
  ghl_contact_id VARCHAR(255),
  ghl_opportunity_id VARCHAR(255),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  contacted_at TIMESTAMP,
  quoted_at TIMESTAMP,
  booked_at TIMESTAMP,
  completed_at TIMESTAMP,
  lost_at TIMESTAMP,
  lost_reason TEXT
);

-- Indexes
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_customer_phone ON leads(customer_phone);

-- ============================================
-- CALL LOGS TABLE
-- ============================================
CREATE TABLE call_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  
  -- Call Details
  caller_phone VARCHAR(20) NOT NULL,
  called_phone VARCHAR(20) NOT NULL,
  call_status VARCHAR(50) NOT NULL, -- 'answered', 'no_answer', 'busy', 'voicemail', 'failed'
  call_direction VARCHAR(20) NOT NULL, -- 'inbound', 'outbound'
  call_duration INTEGER DEFAULT 0, -- seconds
  
  -- Recording
  recording_url TEXT,
  recording_duration INTEGER,
  
  -- GHL Integration
  ghl_call_id VARCHAR(255),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_call_logs_user_id ON call_logs(user_id);
CREATE INDEX idx_call_logs_lead_id ON call_logs(lead_id);
CREATE INDEX idx_call_logs_call_status ON call_logs(call_status);
CREATE INDEX idx_call_logs_created_at ON call_logs(created_at DESC);

-- ============================================
-- SMS LOGS TABLE
-- ============================================
CREATE TABLE sms_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  
  -- SMS Details
  direction VARCHAR(20) NOT NULL, -- 'outbound', 'inbound'
  from_phone VARCHAR(20) NOT NULL,
  to_phone VARCHAR(20) NOT NULL,
  message_text TEXT NOT NULL,
  
  -- Status
  status VARCHAR(50) DEFAULT 'sent', -- 'sent', 'delivered', 'failed', 'replied'
  error_message TEXT,
  
  -- Reply Tracking
  reply_to_sms_id UUID REFERENCES sms_logs(id),
  
  -- Provider
  provider VARCHAR(50) DEFAULT 'twilio', -- 'twilio', 'ghl'
  provider_message_id VARCHAR(255),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  delivered_at TIMESTAMP,
  replied_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_sms_logs_user_id ON sms_logs(user_id);
CREATE INDEX idx_sms_logs_lead_id ON sms_logs(lead_id);
CREATE INDEX idx_sms_logs_direction ON sms_logs(direction);
CREATE INDEX idx_sms_logs_created_at ON sms_logs(created_at DESC);

-- ============================================
-- CAMPAIGNS TABLE (Google Ads)
-- ============================================
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Campaign Details
  campaign_id VARCHAR(255) NOT NULL, -- Google Ads campaign ID
  campaign_name VARCHAR(255) NOT NULL,
  campaign_type VARCHAR(50) DEFAULT 'search', -- 'search', 'display', 'video'
  
  -- Budget
  daily_budget DECIMAL(10,2) NOT NULL,
  monthly_budget DECIMAL(10,2),
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'paused', 'ended'
  
  -- Performance (cached)
  total_spend DECIMAL(10,2) DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  total_impressions INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_synced_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX idx_campaigns_campaign_id ON campaigns(campaign_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- ============================================
-- KEYWORDS TABLE
-- ============================================
CREATE TABLE keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  
  -- Keyword Details
  keyword_text VARCHAR(255) NOT NULL,
  match_type VARCHAR(20) NOT NULL, -- 'exact', 'phrase', 'broad'
  
  -- Bidding
  max_cpc DECIMAL(10,2), -- Max cost per click
  quality_score INTEGER, -- 1-10
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'paused', 'removed'
  
  -- Performance (cached)
  total_spend DECIMAL(10,2) DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  total_impressions INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_synced_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_keywords_campaign_id ON keywords(campaign_id);
CREATE INDEX idx_keywords_status ON keywords(status);
CREATE INDEX idx_keywords_keyword_text ON keywords(keyword_text);

-- ============================================
-- FINANCIALS TABLE (Daily Tracking)
-- ============================================
CREATE TABLE financials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Date
  date DATE NOT NULL,
  
  -- Costs
  ad_spend DECIMAL(10,2) DEFAULT 0,
  platform_fee DECIMAL(10,2) DEFAULT 0, -- Our fee
  other_costs DECIMAL(10,2) DEFAULT 0,
  
  -- Leads
  leads_generated INTEGER DEFAULT 0,
  leads_contacted INTEGER DEFAULT 0,
  leads_quoted INTEGER DEFAULT 0,
  leads_booked INTEGER DEFAULT 0,
  leads_completed INTEGER DEFAULT 0,
  leads_lost INTEGER DEFAULT 0,
  
  -- Revenue
  revenue DECIMAL(10,2) DEFAULT 0,
  
  -- Calculated Metrics (generated columns)
  cpl DECIMAL(10,2) GENERATED ALWAYS AS (
    CASE WHEN leads_generated > 0 
    THEN ad_spend / leads_generated 
    ELSE 0 END
  ) STORED,
  
  conversion_rate DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN leads_generated > 0 
    THEN (leads_booked::DECIMAL / leads_generated) * 100 
    ELSE 0 END
  ) STORED,
  
  roi DECIMAL(10,2) GENERATED ALWAYS AS (
    CASE WHEN ad_spend > 0 
    THEN ((revenue - ad_spend) / ad_spend) * 100 
    ELSE 0 END
  ) STORED,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Unique constraint
  UNIQUE(user_id, date)
);

-- Indexes
CREATE INDEX idx_financials_user_id ON financials(user_id);
CREATE INDEX idx_financials_date ON financials(date DESC);
CREATE INDEX idx_financials_cpl ON financials(cpl);

-- ============================================
-- AI AGENT LOGS TABLE
-- ============================================
CREATE TABLE ai_agent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Agent Details
  agent_name VARCHAR(50) NOT NULL, -- 'monitor', 'cx', 'diagnostic', 'optimizing', 'retention'
  action_type VARCHAR(100) NOT NULL, -- 'detect_anomaly', 'optimize_bid', 'send_review_request'
  
  -- Action Data
  action_data JSONB NOT NULL, -- Flexible JSON for agent-specific data
  
  -- Result
  result VARCHAR(50) NOT NULL, -- 'success', 'failed', 'pending'
  result_message TEXT,
  
  -- Impact
  estimated_impact JSONB, -- { "cpl_change": -5, "conversion_change": 2 }
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_ai_agent_logs_user_id ON ai_agent_logs(user_id);
CREATE INDEX idx_ai_agent_logs_agent_name ON ai_agent_logs(agent_name);
CREATE INDEX idx_ai_agent_logs_action_type ON ai_agent_logs(action_type);
CREATE INDEX idx_ai_agent_logs_created_at ON ai_agent_logs(created_at DESC);
CREATE INDEX idx_ai_agent_logs_action_data ON ai_agent_logs USING GIN (action_data);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Stripe Details
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_price_id VARCHAR(255) NOT NULL,
  
  -- Subscription Details
  plan_name VARCHAR(100) NOT NULL, -- 'Basic', 'Pro', 'Enterprise'
  amount DECIMAL(10,2) NOT NULL, -- Monthly amount
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'past_due', 'cancelled', 'unpaid'
  
  -- Billing
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  cancelled_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);

-- ============================================
-- WORKFLOWS TABLE (GHL Configurations)
-- ============================================
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Workflow Details
  workflow_name VARCHAR(255) NOT NULL,
  workflow_type VARCHAR(50) NOT NULL, -- 'missed_call', 'offer_quote', 'booking_confirmation', 'review_request', 'amc_offer'
  
  -- GHL Integration
  ghl_workflow_id VARCHAR(255),
  
  -- Configuration
  config JSONB NOT NULL, -- Workflow-specific configuration
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'paused', 'draft'
  
  -- Performance
  total_triggered INTEGER DEFAULT 0,
  total_completed INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workflows_user_id ON workflows(user_id);
CREATE INDEX idx_workflows_workflow_type ON workflows(workflow_type);
CREATE INDEX idx_workflows_status ON workflows(status);

-- ============================================
-- VIEWS FOR ANALYTICS
-- ============================================

-- User Dashboard View
CREATE VIEW user_dashboard AS
SELECT 
  u.id AS user_id,
  u.business_name,
  u.status,
  
  -- Subscription
  s.plan_name,
  s.amount AS monthly_fee,
  s.status AS subscription_status,
  
  -- This Month Performance
  SUM(f.ad_spend) AS monthly_ad_spend,
  SUM(f.leads_generated) AS monthly_leads,
  SUM(f.leads_booked) AS monthly_bookings,
  SUM(f.revenue) AS monthly_revenue,
  AVG(f.cpl) AS avg_cpl,
  AVG(f.conversion_rate) AS avg_conversion_rate,
  AVG(f.roi) AS avg_roi,
  
  -- Active Campaigns
  COUNT(DISTINCT c.id) AS active_campaigns
  
FROM users u
LEFT JOIN subscriptions s ON u.id = s.user_id AND s.status = 'active'
LEFT JOIN financials f ON u.id = f.user_id AND f.date >= DATE_TRUNC('month', CURRENT_DATE)
LEFT JOIN campaigns c ON u.id = c.user_id AND c.status = 'active'
GROUP BY u.id, u.business_name, u.status, s.plan_name, s.amount, s.status;

-- Lead Pipeline View
CREATE VIEW lead_pipeline AS
SELECT 
  user_id,
  status,
  COUNT(*) AS count,
  SUM(quoted_amount) AS total_quoted,
  SUM(actual_amount) AS total_actual,
  AVG(EXTRACT(EPOCH FROM (completed_at - created_at))/86400) AS avg_days_to_close
FROM leads
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY user_id, status;

-- Campaign Performance View
CREATE VIEW campaign_performance AS
SELECT 
  c.user_id,
  c.campaign_name,
  c.daily_budget,
  c.total_spend,
  c.total_clicks,
  c.total_conversions,
  CASE WHEN c.total_conversions > 0 
    THEN c.total_spend / c.total_conversions 
    ELSE 0 END AS cpl,
  CASE WHEN c.total_clicks > 0 
    THEN (c.total_conversions::DECIMAL / c.total_clicks) * 100 
    ELSE 0 END AS conversion_rate
FROM campaigns c
WHERE c.status = 'active';

-- ============================================
-- FUNCTIONS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_keywords_updated_at BEFORE UPDATE ON keywords
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financials_updated_at BEFORE UPDATE ON financials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Development)
-- ============================================

-- Example user
INSERT INTO users (
  email, password_hash, business_name, owner_name, 
  primary_phone, city, state, service_types, service_area
) VALUES (
  'john@plumbing.com', 
  '$2b$10$...', -- bcrypt hash
  'John''s Plumbing',
  'John Smith',
  '+15125551234',
  'Austin',
  'TX',
  ARRAY['plumbing', 'drain_cleaning'],
  'Austin, TX - 30 mile radius'
);
```

---

## 🔄 REDIS CACHING STRATEGY

### Cache Keys
```
user:{user_id}                    # User profile (TTL: 1 hour)
user:{user_id}:dashboard          # Dashboard data (TTL: 5 minutes)
user:{user_id}:leads              # Recent leads (TTL: 5 minutes)
user:{user_id}:campaigns          # Active campaigns (TTL: 15 minutes)
user:{user_id}:metrics:{date}     # Daily metrics (TTL: 1 hour)
```

### Cache Invalidation
```javascript
// On user update
await redis.del(`user:${userId}`);

// On lead status change
await redis.del(`user:${userId}:leads`);
await redis.del(`user:${userId}:dashboard`);

// On campaign modification
await redis.del(`user:${userId}:campaigns`);
await redis.del(`user:${userId}:dashboard`);
```

---

## 📊 QUERY EXAMPLES

### Get User Dashboard
```sql
SELECT * FROM user_dashboard WHERE user_id = $1;
```

### Get Lead Pipeline
```sql
SELECT * FROM lead_pipeline WHERE user_id = $1 ORDER BY status;
```

### Get Recent AI Actions
```sql
SELECT 
  agent_name,
  action_type,
  result,
  created_at
FROM ai_agent_logs
WHERE user_id = $1
ORDER BY created_at DESC
LIMIT 10;
```

### Calculate Monthly MRR
```sql
SELECT 
  SUM(amount) AS mrr,
  COUNT(*) AS active_subscriptions
FROM subscriptions
WHERE status = 'active';
```

---

**Status:** DATABASE SCHEMA COMPLETE
**Next:** AI Agent Workflows Design
**Priority:** HIGH - Foundation for data storage

