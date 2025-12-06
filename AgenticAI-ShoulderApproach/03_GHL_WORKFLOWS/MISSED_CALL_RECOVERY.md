# 📞 WORKFLOW 1: MISSED CALL RECOVERY

**Created:** December 6, 2025  
**Priority:** CRITICAL (Primary workflow)  
**Purpose:** Capture and convert missed calls into leads

---

## 🎯 WORKFLOW OVERVIEW

**Trigger:** Incoming call to GHL tracking number with status "No Answer"  
**Goal:** Immediately engage the lead via SMS and convert to booking  
**Success Metric:** 80%+ response rate within 5 minutes

---

## 🔗 TRIGGER CONDITIONS

### When This Workflow Activates:

1. **Call received** on GHL tracking number
2. **Call status** = "No Answer" OR "Busy" OR "Voicemail"
3. **Conditional forwarding** successfully forwarded call from technician's phone

### What Happens Before This Workflow:

```
Customer searches Google → Sees ad → Calls number
↓
Technician's phone rings
↓
IF Technician answers → Normal service (workflow NOT triggered)
IF Technician doesn't answer → Call forwards to GHL number
↓
GHL captures call data → Workflow TRIGGERS
```

---

## 📋 WORKFLOW STEPS

### Step 1: Immediate SMS (0 seconds delay)

**Action:** Send SMS to caller's phone number

**Message Template:**
```
Hi! Sorry we missed your call. Do you need drain cleaning service? 
Reply YES for a quick quote.

- [Business Name]
```

**Variables Used:**
- `{{contact.phone}}` - Caller's phone number (from call log)
- `{{business.name}}` - Business name from GHL settings

**SMS Settings:**
- Sender: GHL tracking number
- Character limit: 160 characters
- Delivery: Immediate (no delay)

---

### Step 2: Wait for Response (5 minutes)

**Action:** Wait for SMS reply

**Conditions:**
- **IF reply received** → Go to Step 3
- **IF no reply after 5 minutes** → Go to Step 4

**What We're Listening For:**
- "YES" (exact match)
- "Yes" (case insensitive)
- "Y" (shorthand)
- "Sure" (alternative)
- Any positive response

---

### Step 3A: Positive Response Received

**Trigger:** Lead replies with YES (or positive response)

**Action:** Update contact status + Trigger Workflow 2 (Offer/Quote)

**GHL Actions:**
1. Update contact field: `lead_status` = "Interested"
2. Add tag: "Missed Call - Responded"
3. Update pipeline stage: "New Lead" → "Interested"
4. Trigger Workflow 2 (Offer/Quote)

**Internal Note:**
```
Lead responded to missed call SMS at {{timestamp}}
Response: {{contact.last_sms_reply}}
Next: Send quote
```

---

### Step 3B: Negative Response Received

**Trigger:** Lead replies with NO or negative response

**Action:** Mark as not interested + Stop workflow

**GHL Actions:**
1. Update contact field: `lead_status` = "Not Interested"
2. Add tag: "Missed Call - Not Interested"
3. Update pipeline stage: "New Lead" → "Lost"
4. Stop workflow

**Internal Note:**
```
Lead declined service at {{timestamp}}
Response: {{contact.last_sms_reply}}
Reason: Not interested
```

---

### Step 4: No Response After 5 Minutes

**Action:** Send follow-up email

**Email Template:**

**Subject:** Quick Quote for Drain Cleaning

**Body:**
```
Hi,

We tried reaching you earlier about drain cleaning service.

Our rates:
• Basic clog: $150
• Main line cleaning: $250
• Camera inspection: $100

Available today! Book now: [Booking Link]

Questions? Call us: [Phone Number]

Thanks,
[Business Name]
```

**Email Settings:**
- From: business@domain.com
- Reply-to: GHL tracking email
- Include booking link
- Include phone number

---

### Step 5: Wait for Email Response (24 hours)

**Action:** Wait for email reply or booking link click

**Conditions:**
- **IF email opened** → Add tag "Email Opened"
- **IF booking link clicked** → Trigger Workflow 3 (Booking)
- **IF no response after 24 hours** → Go to Step 6

---

### Step 6: Final Follow-up (24 hours after email)

**Action:** Send final SMS reminder

**Message Template:**
```
Hi! Still need drain cleaning? We have slots available today.

Book now: [Short Link]

Or call: [Phone Number]
```

**SMS Settings:**
- Last attempt to engage
- Include short booking link
- Include phone number for direct call

---

### Step 7: Mark as Cold Lead (48 hours total)

**Action:** Update lead status if no response

**GHL Actions:**
1. Update contact field: `lead_status` = "Cold"
2. Add tag: "Missed Call - No Response"
3. Update pipeline stage: "New Lead" → "Cold"
4. Add to nurture campaign (monthly newsletter)

**Internal Note:**
```
No response after 48 hours
Attempted: SMS (2x), Email (1x)
Next: Monthly nurture campaign
```

---

## 🎨 WORKFLOW DIAGRAM

```
Call Missed (GHL)
↓
[0 sec] Send SMS: "Reply YES for quote"
↓
Wait 5 minutes
↓
┌─────────────┬─────────────┬─────────────┐
│ YES Reply   │ NO Reply    │ No Response │
↓             ↓             ↓
Workflow 2    Mark Lost     Send Email
(Quote)                     ↓
                            Wait 24 hours
                            ↓
                            ┌──────────┬──────────┐
                            │ Response │ No Reply │
                            ↓          ↓
                            Workflow 3  Final SMS
                            (Booking)   ↓
                                       Wait 24 hours
                                       ↓
                                       Mark Cold
```

---

## ⚙️ GHL CONFIGURATION

### Workflow Settings:

**Name:** Missed Call Recovery  
**Type:** Automation  
**Status:** Active  
**Priority:** High

### Trigger Configuration:

```json
{
  "trigger_type": "inbound_call",
  "conditions": [
    {
      "field": "call_status",
      "operator": "equals",
      "value": "no_answer"
    },
    {
      "field": "call_direction",
      "operator": "equals",
      "value": "inbound"
    }
  ]
}
```

### Action Configuration:

**Action 1: Send SMS**
```json
{
  "action_type": "send_sms",
  "delay": 0,
  "message": "Hi! Sorry we missed your call. Do you need drain cleaning service? Reply YES for a quick quote.\n\n- {{business.name}}",
  "to": "{{contact.phone}}"
}
```

**Action 2: Wait for Reply**
```json
{
  "action_type": "wait",
  "wait_type": "sms_reply",
  "timeout": 300
}
```

**Action 3: Conditional Branch**
```json
{
  "action_type": "if_else",
  "condition": {
    "field": "last_sms_reply",
    "operator": "contains",
    "value": ["yes", "y", "sure", "ok"]
  },
  "if_true": "trigger_workflow_2",
  "if_false": "send_email"
}
```

---

## 📊 SUCCESS METRICS

### Primary KPIs:

| Metric | Target | Measurement |
|--------|--------|-------------|
| SMS Response Rate | 80%+ | Replies within 5 min / Total SMS sent |
| Email Open Rate | 40%+ | Emails opened / Total emails sent |
| Lead Conversion | 25%+ | Bookings / Total missed calls |
| Response Time | <30 sec | Time from call to SMS sent |

### Secondary KPIs:

| Metric | Target | Measurement |
|--------|--------|-------------|
| Positive Response Rate | 60%+ | YES replies / Total replies |
| Booking Link Clicks | 20%+ | Clicks / Total emails sent |
| Cold Lead Rate | <30% | Cold leads / Total missed calls |

---

## 🧪 TESTING CHECKLIST

### Before Activating Workflow:

```
☐ Test call forwarding (technician phone → GHL number)
☐ Verify GHL captures call data (phone number, timestamp)
☐ Test SMS sends immediately (within 30 seconds)
☐ Test SMS reply detection (YES, NO, other)
☐ Test email sends after 5 minutes (no SMS reply)
☐ Test booking link in email works
☐ Test final SMS sends after 24 hours
☐ Test pipeline stage updates correctly
☐ Test tags are applied correctly
☐ Test workflow stops after booking
```

### Test Scenarios:

**Scenario 1: Happy Path (Lead responds YES)**
1. Make test call to GHL number
2. Don't answer (let it go to voicemail)
3. Verify SMS received within 30 seconds
4. Reply "YES" to SMS
5. Verify Workflow 2 triggers (quote sent)
6. Verify pipeline stage = "Interested"

**Scenario 2: Lead Doesn't Respond**
1. Make test call to GHL number
2. Don't answer
3. Verify SMS received
4. Don't reply to SMS
5. Wait 5 minutes
6. Verify email received
7. Wait 24 hours
8. Verify final SMS received
9. Wait 24 hours
10. Verify marked as "Cold"

**Scenario 3: Lead Says NO**
1. Make test call
2. Don't answer
3. Verify SMS received
4. Reply "NO" to SMS
5. Verify marked as "Not Interested"
6. Verify workflow stops

---

## 🔧 TROUBLESHOOTING

### Common Issues:

**Issue 1: SMS Not Sending**
- Check: GHL phone number active?
- Check: SMS credits available?
- Check: Phone number format correct? (E.164)
- Fix: Verify GHL account settings

**Issue 2: SMS Reply Not Detected**
- Check: Reply keyword exact match?
- Check: Case sensitivity settings?
- Fix: Add more reply variations (yes, y, sure, ok)

**Issue 3: Email Not Sending**
- Check: Email verified in GHL?
- Check: SMTP settings correct?
- Check: Email template has all variables?
- Fix: Test email manually first

**Issue 4: Workflow Not Triggering**
- Check: Call forwarding active?
- Check: Call status = "No Answer"?
- Check: Workflow status = "Active"?
- Fix: Test call forwarding manually

---

## 🎯 OPTIMIZATION TIPS

### A/B Testing:

**Test 1: SMS Message Variations**
- Version A: "Reply YES for quote"
- Version B: "Reply YES to book today"
- Measure: Response rate
- Winner: Higher response rate

**Test 2: Email Subject Lines**
- Version A: "Quick Quote for Drain Cleaning"
- Version B: "Your Drain Cleaning Quote - $150"
- Measure: Open rate
- Winner: Higher open rate

**Test 3: Timing**
- Version A: Email after 5 minutes
- Version B: Email after 10 minutes
- Measure: Email response rate
- Winner: Higher response rate

### Continuous Improvement:

**Weekly Review:**
- Check response rates
- Identify drop-off points
- Adjust message templates
- Test new variations

**Monthly Review:**
- Analyze conversion funnel
- Compare to industry benchmarks
- Implement AI recommendations
- Update success metrics

---

## 📝 MAINTENANCE

### Weekly Tasks:
- Review workflow performance
- Check for failed SMS/emails
- Update message templates if needed
- Test workflow end-to-end

### Monthly Tasks:
- Analyze conversion rates
- A/B test new variations
- Update success metrics
- Review AI agent recommendations

### Quarterly Tasks:
- Full workflow audit
- Update pricing in messages
- Review industry best practices
- Optimize based on data

---

**Last Updated:** December 6, 2025  
**Status:** READY FOR IMPLEMENTATION  
**Priority:** CRITICAL (Primary workflow)  
**Estimated Setup Time:** 2 hours  
**Testing Time:** 1 hour

