# ⭐ WORKFLOW 4: POST-JOB REVIEW REQUEST

**Purpose:** Collect reviews, build reputation, identify issues  
**Trigger:** Job marked complete in GHL  
**Goal:** 80% review rate, 4.8+ star average

---

## 🎯 WORKFLOW OVERVIEW

**When:** 2 hours after job completion  
**What:** Request review via SMS + email  
**Why:** Reviews drive 67% of new customer decisions

---

## 📋 WORKFLOW STEPS

### Step 1: Job Completion
**Trigger:** Technician marks job complete in mobile app  
**Action:** Update opportunity status to "Completed"

**Data Captured:**
- Completion time
- Services performed
- Amount charged
- Customer satisfaction (technician rating)
- Photos taken
- Notes

### Step 2: Thank You SMS (Immediate)
**Timing:** Within 5 minutes  
**Channel:** SMS

**Message:**
```
Thank you for choosing [Business Name]! 🙏

Your drain is flowing smoothly again.

Questions about today's service?
Reply to this message anytime.

- [Technician Name]
```

### Step 3: Review Request SMS (2 Hours Later)
**Timing:** 2 hours after completion  
**Channel:** SMS

**Message:**
```
Hi [Customer Name]! 👋

How was your experience with [Technician Name]?

⭐ Leave a quick review (30 seconds):
[Review Link]

Your feedback helps us improve!

- [Business Name]
```

### Step 4: Review Request Email (Same Time)
**Timing:** 2 hours after completion  
**Channel:** Email

**Email Content:**
- Thank you message
- Service summary (what was done)
- Before/after photos (if available)
- Review request with star rating
- Multiple review platform links (Google, Yelp, Facebook)
- Incentive offer (5% off next service)

### Step 5: Follow-Up (If No Response)
**Timing:** 3 days after initial request  
**Channel:** SMS

**Message:**
```
Hi [Customer Name],

We'd love to hear about your experience!

⭐ Quick review (30 sec):
[Review Link]

Get 5% off your next service!

- [Business Name]
```

### Step 6: Final Follow-Up (If Still No Response)
**Timing:** 7 days after initial request  
**Channel:** Email

**Email Content:**
- Personalized message from owner
- Emphasize importance of feedback
- Offer 10% off next service
- Direct link to easiest platform (Google)

---

## 🤖 AI INTEGRATION

**Monitor Agent Tracks:**
- Review request delivery rate (target: 99%)
- Review submission rate (target: 80%)
- Average star rating (target: 4.8+)
- Response time (target: <24h)

**Diagnostic Agent Analyzes:**
- Why customers don't leave reviews (timing, platform, incentive)
- Why low ratings happen (service issue, price, communication)
- Which platforms get most reviews (Google vs Yelp vs Facebook)
- Which technicians get best reviews

**Optimizing Agent Fixes:**
- Adjust timing if low response (2h vs 4h vs next day)
- Change incentive if not working (5% vs 10% vs free inspection)
- Prioritize best platform (if Google gets 80%, focus there)
- Alert owner if rating drops below 4.5

---

## 📊 SUCCESS METRICS

**Delivery Metrics:**
- SMS delivery: >99%
- Email delivery: >95%
- Follow-up sent: 100%

**Engagement Metrics:**
- SMS open rate: >95%
- Email open rate: >50%
- Review link click rate: >60%

**Business Metrics:**
- Review submission rate: >80% (industry avg: 10-20%)
- Average star rating: >4.8/5
- Response time: <24 hours
- Positive review rate: >95%

---

## 🔧 TECHNICAL SETUP

### GHL Workflow Configuration

**Trigger:** Opportunity status = "Completed"

**Actions:**
1. Wait 5 minutes → Send thank you SMS
2. Wait 2 hours → Send review request SMS
3. Wait 2 hours → Send review request email
4. Wait 3 days (if no review) → Send follow-up SMS
5. Wait 7 days (if no review) → Send final email
6. If review received → Send thank you + discount code

### Review Platform Integration

**Google My Business:**
- Direct review link (short URL)
- Auto-respond to reviews
- Monitor rating changes

**Yelp:**
- Review link
- Monitor reviews
- Respond to feedback

**Facebook:**
- Review link
- Auto-post positive reviews
- Respond to comments

### Incentive System

**Discount Codes:**
- 5% off: Auto-generated after review
- 10% off: Manual for final follow-up
- Valid for 90 days
- One-time use
- Tracked in GHL

---

## 🎨 CUSTOMER EXPERIENCE

**Customer Journey:**
1. Job completed → Thank you message (feels appreciated)
2. 2 hours later → Review request (timing is right)
3. Clicks link → Easy 1-click rating (no friction)
4. Leaves review → Gets discount code (rewarded)
5. Uses discount → Books again (loyalty)

**Pain Points Solved:**
- ❌ "Too complicated" → ✅ 1-click rating
- ❌ "I forgot" → ✅ Multiple reminders
- ❌ "Why should I?" → ✅ Discount incentive
- ❌ "Which platform?" → ✅ All options provided

---

## 🔄 EDGE CASES

### Negative Experience
**If:** Customer indicates dissatisfaction  
**Then:**
1. Don't send review request
2. Alert owner immediately
3. Owner calls within 1 hour
4. Resolve issue
5. Follow up after resolution

**Detection:**
- Technician rating <3 stars
- Customer replies with negative keywords
- Complaint mentioned in notes

### No Contact Info
**If:** Email/phone invalid  
**Then:**
1. Skip automated requests
2. Technician asks in person
3. Update contact info
4. Send manual request

### Already Left Review
**If:** Customer already reviewed  
**Then:**
1. Stop automated requests
2. Send thank you message
3. Send discount code
4. Mark as "Reviewed" in GHL

### Customer Opts Out
**If:** Customer replies "STOP"  
**Then:**
1. Unsubscribe from review requests
2. Still send service updates
3. Note preference in GHL

---

## 📱 MOBILE APP INTEGRATION

**Technician App:**
- Rate customer experience (1-5 stars)
- Add notes about service
- Upload before/after photos
- Mark job complete (triggers workflow)

**Customer App:**
- In-app review option
- View service history
- See discount codes earned
- Track review status

**Business Owner App:**
- Monitor review rates
- View all reviews
- Respond to reviews
- Track incentive usage

---

## 🎯 OPTIMIZATION OPPORTUNITIES

**A/B Testing:**
- Timing (2h vs 4h vs next day)
- Incentive amount (5% vs 10% vs free service)
- Message wording (casual vs formal)
- Platform priority (Google vs Yelp)

**Personalization:**
- Use technician name
- Reference specific service
- Mention before/after improvement
- Customize based on customer history

**Automation:**
- Auto-respond to positive reviews
- Auto-alert on negative reviews
- Auto-post to social media
- Auto-generate case studies

---

## 💰 BUSINESS IMPACT

**Revenue Impact:**
- More reviews = +30% new customers
- Higher rating = +20% conversion rate
- Repeat customers = +25% from discount
- Total: +$3,000/month in new revenue

**Cost Savings:**
- Automated requests = -10h/week admin time = $1,000/month
- Early issue detection = -$500/month in refunds
- Total: +$1,500/month saved

**Reputation Impact:**
- 4.8+ rating = Top 5% in industry
- 100+ reviews = Trust signal
- Fast responses = Professional image

**Total Impact:** +$4,500/month from this workflow

---

## 📝 IMPLEMENTATION CHECKLIST

**GHL Setup:**
- ☐ Configure completion trigger
- ☐ Set up SMS templates
- ☐ Set up email templates
- ☐ Configure timing delays
- ☐ Set up follow-up sequences
- ☐ Test end-to-end flow

**Review Platforms:**
- ☐ Claim Google My Business
- ☐ Set up Yelp business page
- ☐ Configure Facebook reviews
- ☐ Create short review links
- ☐ Set up auto-responses

**Incentive System:**
- ☐ Create discount code system
- ☐ Configure auto-generation
- ☐ Set expiration rules
- ☐ Track usage in GHL

**Mobile App:**
- ☐ Add completion button
- ☐ Add rating system
- ☐ Add photo upload
- ☐ Test workflow trigger

**Testing:**
- ☐ Test thank you message
- ☐ Test review request
- ☐ Test follow-ups
- ☐ Test incentive delivery
- ☐ Test negative case handling

---

**Status:** READY FOR IMPLEMENTATION  
**Priority:** HIGH - Drives new customer acquisition  
**Dependencies:** GHL account, Review platform accounts, Mobile app  
**Timeline:** 2-3 days setup + 1 week testing
