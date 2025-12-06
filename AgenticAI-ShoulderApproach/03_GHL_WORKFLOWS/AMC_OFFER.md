# 🔄 WORKFLOW 5: AMC (ANNUAL MAINTENANCE CONTRACT) OFFER

**Purpose:** Convert one-time customers to recurring revenue  
**Trigger:** 30 days after job completion  
**Goal:** 30% AMC conversion rate, $150/year per customer

---

## 🎯 WORKFLOW OVERVIEW

**When:** 30 days after successful service  
**What:** Offer annual maintenance plan  
**Why:** Recurring revenue = predictable cash flow + customer retention

---

## 📋 WORKFLOW STEPS

### Step 1: Eligibility Check
**Timing:** 30 days after job completion  
**Criteria:**
- Job completed successfully
- Customer left 4+ star review (or no review)
- No complaints or issues
- Not already on AMC

**Action:** Tag as "AMC Eligible" in GHL

### Step 2: Educational Email
**Timing:** Day 30  
**Channel:** Email

**Subject:** "Protect Your Drains Year-Round 🛡️"

**Email Content:**
- Problem: Drains need regular maintenance
- Solution: Annual Maintenance Contract
- Benefits: 2 cleanings/year, priority service, 20% off repairs
- Pricing: $150/year (save $100 vs individual services)
- Social proof: "500+ customers trust our AMC"
- CTA: "Get Protected Now"

### Step 3: SMS Follow-Up
**Timing:** Day 32 (2 days after email)  
**Channel:** SMS

**Message:**
```
Hi [Customer Name]! 👋

Loved working on your drains last month.

Want to keep them flowing all year?

🛡️ Annual Maintenance: $150/year
✅ 2 cleanings included
✅ Priority service
✅ 20% off repairs

Learn more: [Link]

- [Business Name]
```

### Step 4: Value Comparison
**Timing:** Day 35 (if no response)  
**Channel:** Email

**Subject:** "You're Paying Too Much for Drain Service"

**Email Content:**
- Cost comparison table:
  * Without AMC: $125 × 2 = $250/year
  * With AMC: $150/year (save $100)
- Additional benefits:
  * Skip the line (priority scheduling)
  * Emergency service included
  * 20% off any repairs
- Testimonials from AMC customers
- Limited time offer: "Sign up this week, get first cleaning free"

### Step 5: Phone Call (High-Value Customers)
**Timing:** Day 38 (if spent >$200 on initial service)  
**Channel:** Phone call from owner

**Script:**
- "Hi [Name], this is [Owner] from [Business]"
- "Wanted to personally thank you for choosing us"
- "I noticed you had [specific issue] - those can recur"
- "We have an annual plan that prevents that"
- "Would you like to hear about it?"
- [Explain benefits, answer questions]
- "Can I sign you up today?"

### Step 6: Final Offer
**Timing:** Day 45 (if still no response)  
**Channel:** SMS

**Message:**
```
Last chance! 🚨

Annual Drain Maintenance: $150/year
(Regular price: $250)

✅ 2 cleanings
✅ Priority service
✅ 20% off repairs

Offer expires in 48 hours.

Sign up: [Link]

- [Business Name]
```

### Step 7: Nurture Sequence (If Not Converted)
**Timing:** Ongoing (quarterly)  
**Channel:** Email

**Content:**
- Seasonal drain tips
- Case studies of prevented issues
- Customer testimonials
- Special offers (holidays, anniversaries)
- Re-offer AMC every 6 months

---

## 🤖 AI INTEGRATION

**Monitor Agent Tracks:**
- AMC offer delivery rate (target: 100%)
- Email open rate (target: 50%)
- SMS open rate (target: 95%)
- Conversion rate (target: 30%)
- Revenue per AMC customer (target: $150/year)

**Diagnostic Agent Analyzes:**
- Why customers don't convert (price, timing, value perception)
- Which messaging works best (savings vs convenience vs priority)
- Which customers are most likely to convert (job type, spend, location)
- When to offer (30 days vs 60 days vs 90 days)

**Optimizing Agent Fixes:**
- Adjust pricing if conversion low (<20%)
- Change timing if engagement low (30 days vs 60 days)
- Personalize offers based on customer profile
- A/B test messaging (savings vs benefits)
- Prioritize high-value customers for phone calls

---

## 📊 SUCCESS METRICS

**Delivery Metrics:**
- Email delivery: >95%
- SMS delivery: >99%
- Phone call completion: >80%

**Engagement Metrics:**
- Email open rate: >50%
- SMS open rate: >95%
- Link click rate: >40%
- Phone call answer rate: >60%

**Business Metrics:**
- AMC conversion rate: >30% (industry avg: 10-15%)
- Average contract value: $150/year
- Customer lifetime value: +$450 (3 years avg)
- Churn rate: <10%/year

---

## 🔧 TECHNICAL SETUP

### GHL Workflow Configuration

**Trigger:** 30 days after opportunity status = "Completed"

**Conditions:**
- Customer rating ≥4 stars OR no rating
- No open complaints
- Not already on AMC
- Job value >$75

**Actions:**
1. Tag as "AMC Eligible"
2. Send educational email (Day 30)
3. Wait 2 days → Send SMS (Day 32)
4. Wait 3 days → Send value comparison email (Day 35)
5. If job value >$200 → Create task for owner call (Day 38)
6. Wait 7 days → Send final offer SMS (Day 45)
7. If not converted → Add to nurture sequence

### Payment Integration (Stripe)

**AMC Subscription:**
- Annual plan: $150/year (one payment)
- Monthly plan: $15/month (12 payments)
- Auto-renewal enabled
- Payment reminders 7 days before renewal
- Easy cancellation (self-service)

**Payment Link:**
- Embedded in emails/SMS
- One-click checkout
- Save payment method
- Instant confirmation

### Scheduling Integration

**AMC Benefits:**
- 2 cleanings per year (scheduled automatically)
- Priority booking (flagged in system)
- 20% discount code (auto-applied)
- Emergency service (24/7 access)

---

## 🎨 CUSTOMER EXPERIENCE

**Customer Journey:**
1. Completes service → Happy with results
2. 30 days later → Receives AMC offer
3. Sees value → Saves $100/year
4. Signs up → Easy one-click payment
5. Gets confirmation → 2 cleanings scheduled
6. Receives service → Drains stay clear
7. Renews → Becomes loyal customer

**Pain Points Solved:**
- ❌ "Drains clog again" → ✅ Preventive maintenance
- ❌ "Emergency costs $$$" → ✅ Priority service included
- ❌ "Forgot to schedule" → ✅ Auto-scheduled
- ❌ "Too expensive" → ✅ Save $100/year

---

## 🔄 EDGE CASES

### Customer Had Issues
**If:** Customer complained or left <4 stars  
**Then:**
1. Don't send AMC offer
2. Focus on resolving issue first
3. Follow up after resolution
4. Offer AMC 60 days later (if resolved)

### Customer Already Booked Again
**If:** Customer booked 2nd service before AMC offer  
**Then:**
1. Send AMC offer immediately
2. Emphasize: "You're already a repeat customer!"
3. Offer discount: "Sign up today, get 10% off"

### Customer Asks Questions
**If:** Customer replies with questions  
**Then:**
1. Auto-respond with FAQ
2. Offer to schedule call
3. Owner follows up within 24h
4. Answer all questions
5. Close the sale

### Customer Wants to Cancel
**If:** Customer wants to cancel AMC  
**Then:**
1. Ask why (collect feedback)
2. Offer to pause instead (3 months)
3. Offer discount to stay (10% off)
4. If still cancels → Easy self-service
5. Follow up in 6 months

---

## 📱 MOBILE APP INTEGRATION

**Technician App:**
- See AMC customers (flagged)
- Priority scheduling
- Service history visible
- Upsell prompts (if customer not on AMC)

**Customer App:**
- View AMC benefits
- See scheduled cleanings
- Track savings
- Manage subscription
- Request emergency service

**Business Owner App:**
- Monitor AMC conversion rate
- Track recurring revenue
- View churn rate
- Manage renewals

---

## 🎯 OPTIMIZATION OPPORTUNITIES

**A/B Testing:**
- Pricing ($150 vs $175 vs $199)
- Payment frequency (annual vs monthly)
- Timing (30 days vs 60 days)
- Messaging (savings vs convenience)
- Incentives (free cleaning vs discount)

**Personalization:**
- High-value customers → Phone call
- Repeat customers → Loyalty discount
- Seasonal customers → Seasonal plan
- Commercial customers → Custom plan

**Upsells:**
- Add video inspection: +$50/year
- Add emergency service: +$25/year
- Add multiple properties: +$100/property
- Add quarterly service: +$100/year

---

## 💰 BUSINESS IMPACT

**Revenue Impact:**
- 100 customers × 30% conversion = 30 AMC customers
- 30 × $150/year = $4,500/year recurring revenue
- Year 2: 60 AMC customers = $9,000/year
- Year 3: 90 AMC customers = $13,500/year

**Cost Savings:**
- Predictable revenue = better cash flow
- Reduced marketing cost (retention vs acquisition)
- Higher customer lifetime value (+$450 per customer)

**Customer Benefits:**
- Save $100/year
- Priority service
- Peace of mind
- No emergency costs

**Total Impact:** +$4,500/year (Year 1) growing to $13,500/year (Year 3)

---

## 📝 IMPLEMENTATION CHECKLIST

**GHL Setup:**
- ☐ Configure 30-day trigger
- ☐ Set up eligibility criteria
- ☐ Create email templates
- ☐ Create SMS templates
- ☐ Set up nurture sequence
- ☐ Test end-to-end flow

**Payment Setup:**
- ☐ Create Stripe subscription
- ☐ Set up payment links
- ☐ Configure auto-renewal
- ☐ Set up payment reminders
- ☐ Test checkout flow

**Scheduling:**
- ☐ Configure AMC benefits
- ☐ Set up priority booking
- ☐ Create discount codes
- ☐ Schedule auto-cleanings
- ☐ Test scheduling flow

**Mobile App:**
- ☐ Add AMC flag
- ☐ Display benefits
- ☐ Enable subscription management
- ☐ Test customer view

**Testing:**
- ☐ Test offer delivery
- ☐ Test payment flow
- ☐ Test scheduling
- ☐ Test cancellation
- ☐ Test edge cases

---

**Status:** READY FOR IMPLEMENTATION  
**Priority:** HIGH - Recurring revenue is business foundation  
**Dependencies:** GHL account, Stripe account, Mobile app  
**Timeline:** 3-4 days setup + 1 week testing
