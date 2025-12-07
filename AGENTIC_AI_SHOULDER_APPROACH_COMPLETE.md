# 🤖 AGENTIC AI "SHOULDER APPROACH" - COMPLETE STRATEGY

**Created:** December 6, 2025  
**Purpose:** Full implementation guide for automated lead generation & conversion system  
**Framework:** Multi-agent AI orchestration with GHL automation engine

---

## 🎯 SYSTEM OVERVIEW

**The "Shoulder Approach":** AI sits on technician's shoulder, catching missed calls and converting them to bookings automatically.

**Three Core Systems:**
1. **Google Ads** - Lead Source (Traffic)
2. **Conditional Call Forwarding** - Trigger (Only when missed)
3. **GoHighLevel (GHL)** - Execution Engine (Automation)
4. **Agentic AI** - Intelligence Layer (Optimization)

---

## 📊 SYSTEM ARCHITECTURE

```
Google Ads (Lead Source)
       ↓
Technician's Phone (Primary)
       ↓
Call Missed? → Conditional Forward
       ↓
GHL Tracking Number (Capture)
       ↓
GHL Workflows (Automation)
       ↓
Agentic AI Agents (Optimization)
       ↓
Continuous Improvement Loop
```

---

## 🔌 CONNECTION POINT 1: THE TRIGGER (Conditional Forwarding)

### Purpose:
Only activate when technician misses a call (not all calls).

### Implementation Steps:

| Step | Action | System | Implementation Detail |
|------|--------|--------|----------------------|
| 1 | Secure GHL Tracking Number | GHL | Purchase US-based tracking number in GHL sub-account |
| 2 | Identify Conditional Code | Technician's Carrier | Find carrier-specific code (e.g., `*004*<number>#` for T-Mobile/Verizon) |
| 3 | Activate Forwarding | Technician's Phone | Dial: `*004*<GHL-number>#` on technician's device |
| 4 | Guardrail (AI Check) | Agentic AI / GHL | Monitor Agent schedules weekly test call |
| 5 | Diagnosis | Agentic AI / GHL Logs | If CPL drops, check if forwarding deactivated |

### Conditional Forwarding Codes by Carrier:

**T-Mobile / Verizon:**
- Busy/Unanswered: `*004*<GHL-number>#`
- Verify: `*#004#`
- Deactivate: `##004#`

**AT&T:**
- Busy/Unanswered: `*92*<GHL-number>#`
- Verify: `*#92#`
- Deactivate: `##92#`

**Sprint:**
- Busy/Unanswered: `*73*<GHL-number>#`
- Verify: `*74`
- Deactivate: `*740`

### Guardrail System:

**Monitor Agent Weekly Test:**
```
Every Monday 9 AM:
1. AI calls technician's number
2. Expected: Forward to GHL (voicemail)
3. If no forward: Alert technician
4. SMS: "Forwarding inactive. Dial *004*<number># now"
```

---

## 🔌 CONNECTION POINT 2: THE CORE AUTOMATION (GHL Workflows)

### GHL as Execution Layer:

Once call forwards to GHL tracking number, GHL executes AI-designed workflows.

### Workflow 1: Missed Call Recovery

**Trigger:** Incoming call to GHL number with status: No Answer

**AI Agent:** CX Agent (Customer Experience)

**Action Flow:**
```
Immediate (0 min):
→ Send SMS: "Sorry we missed you. Do you need a Drain Cleanout? Reply YES for a quote."

Wait 5 minutes:
→ If no reply: Send email follow-up
→ Subject: "Quick Quote for Drain Service"
→ Body: Same offer + link to book online

Wait 30 minutes:
→ If no reply: Add to "Warm Lead" pipeline
→ Schedule follow-up for next day
```

**GHL Configuration:**
- Trigger: Call Status = No Answer
- Condition: From GHL tracking number
- Action: Send SMS (template: MISSED_CALL_RECOVERY)
- Wait: 5 minutes
- Action: Send Email (template: MISSED_CALL_EMAIL)
- Action: Update Pipeline Stage → "Contacted"

---

### Workflow 2: Offer/Quote

**Trigger:** Lead replies YES to initial text

**AI Agent:** CX Agent

**Action Flow:**
```
Immediate:
→ Send SMS: "Great! For basic clogs, our rate is $150. Can we book you now?"
→ Options: "Reply BOOK to schedule" or "Reply CALL for questions"

If BOOK:
→ Send booking link (GHL calendar)
→ Available slots shown

If CALL:
→ Forward to technician's actual number
→ Log as "Hot Lead - Wants to Talk"

If no reply (15 min):
→ Send: "Still interested? We have slots today at 2 PM and 4 PM."
```

**GHL Configuration:**
- Trigger: SMS Reply = "YES" (keyword)
- Action: Send SMS (template: PRICING_OFFER)
- Wait: 15 minutes
- Condition: No reply
- Action: Send SMS (template: PRICING_REMINDER)

---

### Workflow 3: Booking Confirmation

**Trigger:** Lead replies BOOK or books via calendar

**AI Agent:** CX Agent

**Action Flow:**
```
Immediate:
→ Send SMS: "Confirmed! [Technician Name] will arrive [Date] at [Time]."
→ Include: Technician's actual contact info
→ Include: "Call [Tech Number] if you need to reschedule"

1 hour before appointment:
→ Send SMS: "[Technician Name] is on the way! ETA: [Time]"

After appointment:
→ Update pipeline stage → "Completed"
→ Trigger Post-Job workflows
```

**GHL Configuration:**
- Trigger: Calendar Booking Created
- Action: Send SMS (template: BOOKING_CONFIRMATION)
- Action: Update Pipeline Stage → "Booked"
- Wait: Until 1 hour before appointment
- Action: Send SMS (template: ON_THE_WAY)

---

### Workflow 4: Post-Job Review Request

**Trigger:** Job status changes to Completed in GHL pipeline

**AI Agent:** Retention Agent

**Action Flow:**
```
Wait 4 hours after completion:
→ Send SMS: "How was your service with [Technician]? Leave a review:"
→ Include: Google Review link
→ Include: Yelp Review link

If 5-star review:
→ Send SMS: "Thank you! Here's 10% off your next service: [Code]"

If 1-3 star review:
→ Alert technician immediately
→ Send SMS: "We're sorry. [Manager] will call you within 1 hour."
→ Create task for manager follow-up
```

**GHL Configuration:**
- Trigger: Pipeline Stage = "Completed"
- Wait: 4 hours
- Action: Send SMS (template: REVIEW_REQUEST)
- Condition: Review received (webhook from Google/Yelp)
- Action: If 5-star → Send discount code
- Action: If 1-3 star → Create task + alert

---

### Workflow 5: Annual Maintenance Contract (AMC)

**Trigger:** Job status = Completed (Wait 30 days)

**AI Agent:** Retention Agent

**Action Flow:**
```
30 days after job:
→ Send SMS: "Prevent future clogs! Annual Maintenance: $299/year"
→ Include: Benefits (2 free cleanouts, priority service)
→ Include: Booking link

If interested:
→ Send contract link (DocuSign)
→ Auto-schedule first maintenance visit

If no reply (7 days):
→ Send: "Last chance: $50 off AMC if you sign this week"
```

**GHL Configuration:**
- Trigger: Pipeline Stage = "Completed"
- Wait: 30 days
- Action: Send SMS (template: AMC_OFFER)
- Wait: 7 days
- Condition: No reply
- Action: Send SMS (template: AMC_DISCOUNT)

---

## 🔌 CONNECTION POINT 3: THE INTELLIGENCE (Agentic AI)

### AI Agent Architecture:

**4 Specialized Agents:**
1. **Monitor Agent** - Observes & Tracks
2. **Diagnostic Agent** - Analyzes Failures
3. **Optimizing Agent** - Proposes Changes
4. **CX Agent** - Customer Interactions (embedded in GHL)
5. **Retention Agent** - Post-sale engagement (embedded in GHL)

---

### Agent 1: Monitor Agent

**Purpose:** Continuous observation of key metrics

**Data Sources:**
- Google Ads API (CPL, CTR, Conversions)
- GHL Pipeline Stages (Lead-to-Booking rate)
- GHL Call Logs (Forwarding status)

**Monitoring Loop:**
```
Every 1 hour:
1. Fetch CPL from Google Ads
2. Check if CPL > ₹200 threshold
3. Fetch Lead-to-Booking rate from GHL
4. Check if booking rate < 25%
5. If either fails → Trigger Diagnostic Agent
```

**Thresholds:**
- CPL Target: ≤ ₹200
- Booking Rate Target: ≥ 25%
- Forwarding Uptime: ≥ 95%

**Implementation (Python + APIs):**
```python
import google_ads_api
import ghl_api
import time

def monitor_loop():
    while True:
        # Check CPL
        cpl = google_ads_api.get_cost_per_lead()
        if cpl > 200:
            trigger_diagnostic("HIGH_CPL", cpl)
        
        # Check Booking Rate
        booking_rate = ghl_api.get_booking_rate()
        if booking_rate < 0.25:
            trigger_diagnostic("LOW_BOOKING", booking_rate)
        
        # Check Forwarding
        forwarding_status = ghl_api.test_forwarding()
        if not forwarding_status:
            alert_technician("FORWARDING_DOWN")
        
        time.sleep(3600)  # Wait 1 hour
```

---

### Agent 2: Diagnostic Agent

**Purpose:** Root cause analysis when metrics fail

**Diagnosis Types:**

**Diagnosis 1: High CPL (Cost Per Lead)**
```
Possible Causes:
1. Wrong search terms (irrelevant clicks)
2. Poor ad quality score
3. High competition (bidding war)
4. Wrong targeting (location/demographics)

Analysis:
→ Check Google Ads Search Terms Report
→ Identify terms with high cost, low conversion
→ Check Quality Score per keyword
→ Compare CPL to industry benchmark
```

**Diagnosis 2: Low Booking Rate**
```
Possible Causes:
1. Offer/Pricing issue (too expensive)
2. Text-back script failure (not compelling)
3. Slow response time (leads go cold)
4. Forwarding down (calls not captured)

Analysis:
→ Check GHL conversation logs
→ Identify where leads drop off
→ Check average response time
→ Test forwarding status
```

**Diagnosis 3: Forwarding Failure**
```
Possible Causes:
1. Technician deactivated code
2. Carrier reset settings
3. Phone number changed

Analysis:
→ Check GHL call logs (recent forwards)
→ Run test call
→ If fails → Alert technician
```

**Implementation (Python + LangChain):**
```python
from langchain import LLMChain
from langchain.prompts import PromptTemplate

def diagnose_failure(issue_type, metric_value):
    # Diagnosis prompt
    prompt = PromptTemplate(
        input_variables=["issue", "value", "data"],
        template="""
        Issue: {issue}
        Current Value: {value}
        Historical Data: {data}
        
        Analyze the root cause and provide:
        1. Most likely cause
        2. Supporting evidence
        3. Recommended fix
        """
    )
    
    # Fetch relevant data
    if issue_type == "HIGH_CPL":
        data = google_ads_api.get_search_terms()
    elif issue_type == "LOW_BOOKING":
        data = ghl_api.get_conversation_logs()
    
    # Run diagnosis
    chain = LLMChain(llm=llm, prompt=prompt)
    diagnosis = chain.run(
        issue=issue_type,
        value=metric_value,
        data=data
    )
    
    return diagnosis
```

---

### Agent 3: Optimizing Agent

**Purpose:** Propose and execute improvements

**Optimization Types:**

**Optimization 1: Ad Targeting**
```
If Diagnosis = Wrong Search Term:
→ Pause low-performing keywords
→ Add negative keywords
→ Adjust bids on high-performers
→ Test new keyword variations
```

**Optimization 2: Offer/Pricing**
```
If Diagnosis = Offer Failure:
→ Test alternative pricing ($150 → $125 intro offer)
→ Test different messaging ("Basic clog" → "Emergency drain service")
→ A/B test SMS templates
→ Add urgency ("Today only: $25 off")
```

**Optimization 3: Response Time**
```
If Diagnosis = Slow Response:
→ Reduce SMS delay (5 min → 2 min)
→ Add immediate auto-reply
→ Increase follow-up frequency
```

**Implementation (Python + APIs):**
```python
def optimize(diagnosis):
    if diagnosis["cause"] == "WRONG_SEARCH_TERM":
        # Pause bad keywords
        bad_keywords = diagnosis["evidence"]["low_performers"]
        for keyword in bad_keywords:
            google_ads_api.pause_keyword(keyword)
        
        # Add negative keywords
        negative_keywords = diagnosis["recommended_negatives"]
        google_ads_api.add_negative_keywords(negative_keywords)
    
    elif diagnosis["cause"] == "OFFER_FAILURE":
        # Update SMS template
        new_template = diagnosis["recommended_template"]
        ghl_api.update_sms_template("PRICING_OFFER", new_template)
        
        # Log A/B test
        log_ab_test("PRICING_OFFER", new_template)
    
    # Log optimization
    log_optimization(diagnosis, action_taken)
```

---

### Agent 4: The "Amit Thoughtbot" System Prompt

**Purpose:** Guide all AI agents with business context

**System Prompt:**
```
You are an AI agent optimizing a drain cleaning business.

Business Context:
- Service: Drain cleaning, basic clogs
- Target CPL: ≤ ₹200
- Target Booking Rate: ≥ 25%
- Pricing: $150 for basic service
- Competition: High (local plumbers)

The "Shoulder Approach":
- Only capture MISSED calls (not all calls)
- Technician handles answered calls normally
- AI converts missed opportunities to bookings

Constraints:
- Never change pricing without approval
- Never pause all ads (always keep running)
- Never send more than 3 SMS per day to same lead
- Always maintain professional tone

Success Metrics:
- CPL ≤ ₹200
- Booking Rate ≥ 25%
- Customer Satisfaction ≥ 4.5/5
- Forwarding Uptime ≥ 95%

When diagnosing issues:
1. Check data first (don't guess)
2. Identify root cause (not symptoms)
3. Propose specific fix (not vague)
4. Test before full rollout (A/B test)

When optimizing:
1. Make small changes (not radical)
2. Test one variable at a time
3. Wait for statistical significance
4. Document all changes
```

---

## 🔄 COMPLETE LEARNING LOOP

### Phase 1: Observe & Track (Monitor Agent)

**Every 1 Hour:**
```
1. Fetch CPL from Google Ads
2. Fetch Booking Rate from GHL
3. Check Forwarding Status
4. Compare to thresholds
5. If fail → Trigger Diagnosis
```

---

### Phase 2: Diagnose Failure (Diagnostic Agent)

**When Triggered:**
```
1. Identify issue type (CPL, Booking, Forwarding)
2. Fetch relevant data (Search Terms, Logs, etc.)
3. Analyze with LLM (LangChain + GPT-4)
4. Output: Root cause + Evidence + Fix
```

---

### Phase 3: Reflect & Propose (Optimizing Agent)

**After Diagnosis:**
```
1. Review diagnosis result
2. Apply "Amit Thoughtbot" constraints
3. Propose specific optimization
4. Estimate impact (CPL reduction, booking increase)
5. Request approval (if major change)
```

---

### Phase 4: Execute (Optimizing Agent)

**After Approval:**
```
1. Execute via API (Google Ads or GHL)
2. Log change (timestamp, type, expected impact)
3. Set monitoring period (7 days)
4. Track results
```

---

### Phase 5: Measure & Learn

**After 7 Days:**
```
1. Compare metrics before/after
2. Calculate actual impact
3. If positive: Keep change, document learning
4. If negative: Revert change, document failure
5. Update "Amit Thoughtbot" with new learning
```

---

## 📊 COMPLETE SYSTEM DIAGRAM

```
┌─────────────────────────────────────────────────────────┐
│                    GOOGLE ADS                           │
│              (Lead Source - Traffic)                    │
│                                                         │
│  Keywords: "drain cleaning", "clogged drain"           │
│  Budget: $50/day                                       │
│  Target CPL: ≤ ₹200                                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ (User clicks ad, calls number)
┌─────────────────────────────────────────────────────────┐
│              TECHNICIAN'S PHONE                         │
│                 (Primary Line)                          │
│                                                         │
│  If Answered: Technician handles normally              │
│  If Missed: Conditional forward to GHL                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ (Conditional Forward: *004*<GHL-number>#)
┌─────────────────────────────────────────────────────────┐
│              GHL TRACKING NUMBER                        │
│                  (Capture Layer)                        │
│                                                         │
│  Captures: Caller ID, Time, Duration                   │
│  Status: No Answer (missed call)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ (Triggers GHL Workflow)
┌─────────────────────────────────────────────────────────┐
│              GHL WORKFLOWS                              │
│              (Execution Engine)                         │
│                                                         │
│  1. Missed Call Recovery (SMS + Email)                 │
│  2. Offer/Quote (Pricing + Booking)                    │
│  3. Booking Confirmation (Details + Reminder)          │
│  4. Post-Job Review (Google/Yelp)                      │
│  5. AMC Offer (30 days later)                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ (Data flows to AI)
┌─────────────────────────────────────────────────────────┐
│              AGENTIC AI LAYER                           │
│           (Intelligence & Optimization)                 │
│                                                         │
│  Monitor Agent: Tracks CPL, Booking Rate               │
│  Diagnostic Agent: Analyzes failures                   │
│  Optimizing Agent: Proposes & executes fixes           │
│                                                         │
│  Powered by: "Amit Thoughtbot" System Prompt           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ (Optimization actions)
┌─────────────────────────────────────────────────────────┐
│              CONTINUOUS IMPROVEMENT                     │
│                                                         │
│  → Pause bad keywords (Google Ads API)                 │
│  → Update SMS templates (GHL API)                      │
│  → Adjust bids (Google Ads API)                        │
│  → Test new messaging (A/B tests)                      │
│                                                         │
│  Result: Self-optimizing system                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 SUCCESS METRICS

### Primary Metrics:
- **CPL (Cost Per Lead):** ≤ ₹200
- **Booking Rate:** ≥ 25%
- **Customer Satisfaction:** ≥ 4.5/5
- **Forwarding Uptime:** ≥ 95%

### Secondary Metrics:
- **Response Time:** ≤ 2 minutes (first SMS)
- **Review Rate:** ≥ 30% (customers leaving reviews)
- **AMC Conversion:** ≥ 10% (completed jobs → AMC)
- **Repeat Customer Rate:** ≥ 20%

---

## 🚀 IMPLEMENTATION ROADMAP

### Week 1: Foundation
- ✅ Set up GHL account
- ✅ Purchase tracking number
- ✅ Configure conditional forwarding
- ✅ Test forwarding (guardrail)

### Week 2: Workflows
- ✅ Build Missed Call Recovery workflow
- ✅ Build Offer/Quote workflow
- ✅ Build Booking Confirmation workflow
- ✅ Test all workflows

### Week 3: AI Agents
- ✅ Deploy Monitor Agent
- ✅ Deploy Diagnostic Agent
- ✅ Deploy Optimizing Agent
- ✅ Configure "Amit Thoughtbot" prompt

### Week 4: Optimization
- ✅ Run first optimization cycle
- ✅ Measure results
- ✅ Refine agents
- ✅ Document learnings

---

## 💡 KEY INSIGHTS

### Why This Works:

**1. "Shoulder Approach" = No Disruption**
- Technician handles answered calls normally
- AI only helps with missed opportunities
- No change to existing workflow

**2. Conditional Forwarding = Precision**
- Only captures missed calls (not all calls)
- Reduces noise, increases relevance
- Technician stays in control

**3. GHL = Execution Layer**
- Handles all automation (SMS, Email, Calendar)
- Provides data for AI analysis
- Integrates with Google Ads

**4. Agentic AI = Continuous Improvement**
- Learns from every interaction
- Optimizes automatically
- Self-correcting system

---

## 🔗 CONNECTION TO ENTERPRISE FRAMEWORKS

### This System Uses:

**From Learning #41 (Enterprise Frameworks):**
- **RICE Prioritization:** Prioritize which optimizations to test first
- **A/B Testing:** Test SMS templates, pricing, timing
- **Data-Driven Decisions:** All changes based on metrics, not gut feeling
- **LangChain:** Default framework for AI agents (industry standard)

**From Learning #42 (Knowledge Sources):**
- **India AI Mission:** AI governance framework
- **Best Practices:** 26 essential software engineering practices

**From Learning #43 (Documentation):**
- **API Documentation:** Google Ads API, GHL API
- **Best Practices:** OWASP security, web.dev performance

---

## 📝 NEXT STEPS

**To Implement This System:**

1. **Set Up GHL Account**
   - Sign up at: https://www.gohighlevel.com
   - Purchase tracking number
   - Configure sub-account for technician

2. **Configure Conditional Forwarding**
   - Identify carrier code
   - Activate on technician's phone
   - Test with Monitor Agent

3. **Build GHL Workflows**
   - Use templates provided above
   - Customize SMS/Email content
   - Test each workflow

4. **Deploy AI Agents**
   - Use Python + LangChain
   - Connect to Google Ads API
   - Connect to GHL API
   - Deploy on cloud (AWS Lambda or similar)

5. **Monitor & Optimize**
   - Track metrics daily
   - Review AI recommendations
   - Approve optimizations
   - Document learnings

---

**Status:** COMPLETE STRATEGY DOCUMENTED  
**Framework:** Agentic AI + GHL + Google Ads  
**Approach:** "Shoulder Approach" (non-disruptive)  
**Expected ROI:** 3-5x improvement in lead conversion

**This is world-class automation using industry-standard frameworks!** 🚀
