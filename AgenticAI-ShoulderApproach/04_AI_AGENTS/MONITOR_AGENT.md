# 📊 MONITOR AGENT - Real-Time System Tracking

**Purpose:** Track all metrics, detect anomalies, alert on issues  
**Type:** Continuous monitoring agent  
**Technology:** Python + AWS Lambda + CloudWatch

---

## 🎯 AGENT OVERVIEW

**What It Does:**
- Monitors 50+ metrics across all systems
- Detects anomalies in real-time
- Alerts owner when thresholds breached
- Provides data to Diagnostic Agent

**Why It Matters:**
- Early detection prevents revenue loss
- Data-driven decisions vs gut feeling
- Proactive vs reactive management

---

## 📊 METRICS TRACKED

### Google Ads Metrics
**Tracked Every Hour:**
- Cost Per Lead (CPL): Target <$15
- Click-Through Rate (CTR): Target >5%
- Conversion Rate: Target >10%
- Daily spend: Target $50-100
- Quality Score: Target >7/10
- Impression share: Target >80%

**Alerts:**
- 🚨 CPL >$20 → "Google Ads cost too high"
- 🚨 CTR <3% → "Ads not engaging"
- 🚨 Spend >$150/day → "Budget exceeded"

### Conditional Forwarding Metrics
**Tracked Every 15 Minutes:**
- Forwarding success rate: Target >95%
- Average ring time: Target <30 seconds
- Missed calls: Target <5%
- Call duration: Target >2 minutes
- Voicemail rate: Target <10%

**Alerts:**
- 🚨 Success rate <90% → "Forwarding failing"
- 🚨 Missed calls >10% → "Calls not answered"
- 🚨 Ring time >60s → "Slow answer time"

### GHL Workflow Metrics
**Tracked Every 30 Minutes:**
- Workflow execution rate: Target 100%
- SMS delivery rate: Target >99%
- Email delivery rate: Target >95%
- Response rate: Target >60%
- Conversion rate: Target >30%

**Alerts:**
- 🚨 Execution <95% → "Workflows failing"
- 🚨 SMS delivery <95% → "SMS issues"
- 🚨 Response rate <40% → "Low engagement"

### Business Metrics
**Tracked Daily:**
- Leads generated: Target 10-15/day
- Bookings made: Target 5-8/day
- Revenue: Target $500-800/day
- Customer satisfaction: Target >4.5/5
- Review rate: Target >80%
- AMC conversion: Target >30%

**Alerts:**
- 🚨 Leads <5/day → "Lead generation low"
- 🚨 Bookings <3/day → "Conversion issue"
- 🚨 Revenue <$300/day → "Revenue below target"

---

## 🤖 AGENT ARCHITECTURE

### Data Collection Layer

**Sources:**
- Google Ads API (hourly)
- Twilio API (real-time)
- GHL API (every 30 min)
- Stripe API (real-time)
- Mobile App Analytics (real-time)

**Storage:**
- AWS DynamoDB (time-series data)
- Retention: 90 days detailed, 2 years aggregated

### Processing Layer

**Anomaly Detection:**
```python
def detect_anomaly(metric, value, threshold):
    """
    Detect if metric exceeds threshold
    """
    if metric == "cpl":
        if value > threshold["cpl_max"]:
            return {
                "alert": True,
                "severity": "high",
                "message": f"CPL ${value} exceeds ${threshold['cpl_max']}"
            }
    
    if metric == "forwarding_success":
        if value < threshold["forwarding_min"]:
            return {
                "alert": True,
                "severity": "critical",
                "message": f"Forwarding success {value}% below {threshold['forwarding_min']}%"
            }
    
    return {"alert": False}
```

**Trend Analysis:**
```python
def analyze_trend(metric, history):
    """
    Detect trends over time
    """
    # Calculate moving average
    ma_7day = sum(history[-7:]) / 7
    ma_30day = sum(history[-30:]) / 30
    
    # Detect trend
    if ma_7day < ma_30day * 0.8:
        return {
            "trend": "declining",
            "severity": "medium",
            "message": f"{metric} declining 20% vs 30-day average"
        }
    
    if ma_7day > ma_30day * 1.2:
        return {
            "trend": "improving",
            "message": f"{metric} improving 20% vs 30-day average"
        }
    
    return {"trend": "stable"}
```

### Alert Layer

**Alert Channels:**
- SMS (critical alerts only)
- Email (all alerts)
- Mobile app push notification
- Dashboard (real-time display)

**Alert Priorities:**
- 🔴 Critical: Immediate action required (SMS + Email + Push)
- 🟠 High: Action needed today (Email + Push)
- 🟡 Medium: Monitor closely (Email)
- 🟢 Low: FYI (Dashboard only)

---

## 📱 DASHBOARD INTEGRATION

### Real-Time Dashboard

**Metrics Displayed:**
- Current CPL (with trend arrow)
- Leads today (vs yesterday)
- Bookings today (vs yesterday)
- Revenue today (vs yesterday)
- Forwarding success rate (last hour)
- Workflow execution rate (last hour)

**Visual Indicators:**
- 🟢 Green: Within target
- 🟡 Yellow: Approaching threshold
- 🔴 Red: Exceeds threshold

### Historical Charts

**Time Periods:**
- Last 24 hours (hourly)
- Last 7 days (daily)
- Last 30 days (daily)
- Last 90 days (weekly)

**Chart Types:**
- Line charts (trends)
- Bar charts (comparisons)
- Pie charts (distributions)
- Heatmaps (patterns)

---

## 🔔 ALERT EXAMPLES

### Example 1: High CPL Alert

**Trigger:** CPL exceeds $20

**Alert Message:**
```
🚨 CRITICAL: Google Ads CPL High

Current CPL: $23.50
Target: <$15.00
Increase: +56%

Possible causes:
- Low-quality clicks
- Poor ad targeting
- High competition

Action needed: Review ad campaigns

View details: [Dashboard Link]
```

**Sent To:**
- Owner (SMS + Email)
- Diagnostic Agent (for analysis)

### Example 2: Forwarding Failure Alert

**Trigger:** Forwarding success <90%

**Alert Message:**
```
🚨 CRITICAL: Call Forwarding Failing

Success rate: 85%
Target: >95%
Missed calls: 15 in last hour

Possible causes:
- Carrier issue
- Phone line busy
- Configuration error

Action needed: Check forwarding setup

View details: [Dashboard Link]
```

**Sent To:**
- Owner (SMS + Email + Push)
- Diagnostic Agent (for root cause analysis)
- Optimizing Agent (for auto-fix attempt)

### Example 3: Low Conversion Alert

**Trigger:** Booking rate <40%

**Alert Message:**
```
🟠 HIGH: Low Booking Conversion

Leads today: 12
Bookings: 4 (33%)
Target: >50%

Possible causes:
- Pricing too high
- Slow response time
- Poor quote quality

Action needed: Review quote workflow

View details: [Dashboard Link]
```

**Sent To:**
- Owner (Email)
- Diagnostic Agent (for analysis)

---

## 🔧 TECHNICAL IMPLEMENTATION

### AWS Lambda Function

**Trigger:** CloudWatch Events (cron schedule)

**Execution:**
- Every 15 min: Forwarding metrics
- Every 30 min: GHL metrics
- Every hour: Google Ads metrics
- Every day: Business metrics

**Code Structure:**
```python
import boto3
import requests
from datetime import datetime

# Initialize AWS services
dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns')

def lambda_handler(event, context):
    """
    Main monitoring function
    """
    # Collect metrics
    google_ads_metrics = collect_google_ads_metrics()
    forwarding_metrics = collect_forwarding_metrics()
    ghl_metrics = collect_ghl_metrics()
    
    # Store in DynamoDB
    store_metrics(google_ads_metrics, forwarding_metrics, ghl_metrics)
    
    # Detect anomalies
    alerts = detect_all_anomalies(google_ads_metrics, forwarding_metrics, ghl_metrics)
    
    # Send alerts
    for alert in alerts:
        send_alert(alert)
    
    # Trigger Diagnostic Agent if critical
    if any(alert['severity'] == 'critical' for alert in alerts):
        trigger_diagnostic_agent(alerts)
    
    return {
        'statusCode': 200,
        'body': f'Monitored {len(alerts)} alerts'
    }

def collect_google_ads_metrics():
    """
    Fetch metrics from Google Ads API
    """
    # API call to Google Ads
    response = requests.get(
        'https://googleads.googleapis.com/v14/customers/...',
        headers={'Authorization': f'Bearer {GOOGLE_ADS_TOKEN}'}
    )
    
    return {
        'cpl': calculate_cpl(response.json()),
        'ctr': response.json()['ctr'],
        'conversions': response.json()['conversions'],
        'spend': response.json()['cost']
    }

def detect_all_anomalies(google_ads, forwarding, ghl):
    """
    Check all metrics against thresholds
    """
    alerts = []
    
    # Check CPL
    if google_ads['cpl'] > 20:
        alerts.append({
            'severity': 'critical',
            'metric': 'cpl',
            'value': google_ads['cpl'],
            'threshold': 15,
            'message': f"CPL ${google_ads['cpl']} exceeds $15"
        })
    
    # Check forwarding
    if forwarding['success_rate'] < 90:
        alerts.append({
            'severity': 'critical',
            'metric': 'forwarding',
            'value': forwarding['success_rate'],
            'threshold': 95,
            'message': f"Forwarding {forwarding['success_rate']}% below 95%"
        })
    
    return alerts

def send_alert(alert):
    """
    Send alert via appropriate channel
    """
    if alert['severity'] == 'critical':
        # Send SMS
        sns.publish(
            PhoneNumber=OWNER_PHONE,
            Message=alert['message']
        )
    
    # Always send email
    sns.publish(
        TopicArn=EMAIL_TOPIC_ARN,
        Subject=f"{alert['severity'].upper()}: {alert['metric']}",
        Message=alert['message']
    )
```

---

## 📊 DATA RETENTION

**Real-Time Data:**
- Last 24 hours: 15-minute intervals
- Storage: DynamoDB
- Access: Dashboard API

**Historical Data:**
- Last 90 days: Hourly aggregates
- Last 2 years: Daily aggregates
- Storage: S3 + Athena
- Access: Analytics queries

**Archival:**
- >2 years: Monthly aggregates
- Storage: S3 Glacier
- Access: On-demand retrieval

---

## 🎯 SUCCESS METRICS

**Agent Performance:**
- Uptime: >99.9%
- Alert accuracy: >95%
- False positive rate: <5%
- Alert response time: <1 minute

**Business Impact:**
- Issues detected: 100% (vs 60% manual)
- Response time: <5 min (vs 2 hours manual)
- Revenue protected: $2,000/month
- Time saved: 10 hours/week

---

## 📝 IMPLEMENTATION CHECKLIST

**AWS Setup:**
- ☐ Create Lambda function
- ☐ Configure CloudWatch Events
- ☐ Set up DynamoDB tables
- ☐ Configure SNS topics
- ☐ Set up IAM roles

**API Integration:**
- ☐ Google Ads API credentials
- ☐ Twilio API credentials
- ☐ GHL API credentials
- ☐ Stripe API credentials
- ☐ Test all API calls

**Alert Configuration:**
- ☐ Define thresholds
- ☐ Set up SMS alerts
- ☐ Set up email alerts
- ☐ Configure push notifications
- ☐ Test alert delivery

**Dashboard:**
- ☐ Build real-time dashboard
- ☐ Create historical charts
- ☐ Add alert history
- ☐ Test mobile view

**Testing:**
- ☐ Test metric collection
- ☐ Test anomaly detection
- ☐ Test alert delivery
- ☐ Test edge cases
- ☐ Load testing

---

**Status:** READY FOR IMPLEMENTATION  
**Priority:** CRITICAL - Foundation for all AI agents  
**Dependencies:** AWS account, API credentials  
**Timeline:** 1 week development + 1 week testing
