# 💰 WORKFLOW 2: OFFER/QUOTE

**Created:** December 6, 2025  
**Priority:** HIGH  
**Purpose:** Send pricing and convert interested leads to bookings

---

## 🎯 WORKFLOW OVERVIEW

**Trigger:** Lead replies YES to Workflow 1 (Missed Call Recovery)  
**Goal:** Provide clear pricing and get booking commitment  
**Success Metric:** 40%+ conversion to booking

---

## 🔗 TRIGGER CONDITIONS

### When This Workflow Activates:

1. **Lead replied YES** to missed call SMS
2. **Pipeline stage** = "Interested"
3. **Lead status** = "Interested"

---

## 📋 WORKFLOW STEPS

### Step 1: Send Pricing (Immediate)

**Message Template:**
```
Great! Our rates:

🔧 Basic clog: $150
🔧 Main line: $250  
🔧 Camera inspection: $100

Available today! Reply BOOK to schedule or CALL to speak with us.
```

**SMS Settings:**
- Immediate send (no delay)
- Include pricing
- Clear call-to-action
- Two options (BOOK or CALL)

---

### Step 2: Wait for Response (10 minutes)

**Conditions:**
- **IF "BOOK" reply** → Trigger Workflow 3 (Booking)
- **IF "CALL" reply** → Send technician contact
- **IF question** → Send to human
- **IF no reply** → Send follow-up

---

### Step 3A: Lead Wants to Book

**Action:** Trigger Workflow 3 (Booking Confirmation)

**GHL Actions:**
1. Update pipeline stage: "Interested" → "Ready to Book"
2. Add tag: "Quote Accepted"
3. Trigger Workflow 3

---

### Step 3B: Lead Wants to Call

**Message:**
```
Perfect! Call us now: {{business.phone}}

Or book online: {{booking.link}}

We're available {{business.hours}}
```

**GHL Actions:**
1. Add tag: "Wants to Call"
2. Alert technician (push notification)
3. Update pipeline stage: "Interested" → "Warm Lead"

---

### Step 3C: Lead Has Questions

**Message:**
```
I'll connect you with our team. They'll call you within 15 minutes.

Or call us now: {{business.phone}}
```

**GHL Actions:**
1. Create task for technician: "Call lead - has questions"
2. Add tag: "Has Questions"
3. Send alert to technician

---

### Step 4: No Response Follow-up (10 minutes)

**Message:**
```
Still interested? We have same-day availability.

Reply BOOK or call {{business.phone}}
```

---

### Step 5: Final Attempt (2 hours)

**Message:**
```
Last chance for today's availability! 

$150 basic clog cleaning

Book: {{booking.link}}
```

---

## ⚙️ GHL CONFIGURATION

**Trigger:**
```json
{
  "trigger_type": "sms_reply",
  "conditions": [
    {
      "field": "last_sms_reply",
      "operator": "contains",
      "value": ["yes", "y", "sure"]
    },
    {
      "field": "pipeline_stage",
      "operator": "equals",
      "value": "Interested"
    }
  ]
}
```

---

## 📊 SUCCESS METRICS

| Metric | Target |
|--------|--------|
| Booking Conversion | 40%+ |
| Call Request Rate | 30%+ |
| Response Time | <2 min |

---

**Status:** READY FOR IMPLEMENTATION  
**Setup Time:** 1 hour

