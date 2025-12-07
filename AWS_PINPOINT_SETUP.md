# 📧 Pinpoint Email Automation - Month 2
**Goal:** Automated follow-ups, engagement campaigns

---

## ✅ STEP 1: Create Pinpoint Project

```bash
aws pinpoint create-app --create-application-request Name=ideasbeforetime
```

---

## ✅ STEP 2: Verify Email Domain

```bash
aws sesv2 create-email-identity --email-identity ideasbeforetime.com
```

Add DNS records shown in output

---

## ✅ STEP 3: Create Campaigns

### Campaign 1: Report Preview → Full Access
```javascript
// Day 0: User views preview
await pinpoint.sendMessages({
    ApplicationId: 'YOUR_APP_ID',
    MessageRequest: {
        Addresses: {
            [email]: { ChannelType: 'EMAIL' }
        },
        MessageConfiguration: {
            EmailMessage: {
                FromAddress: 'reports@ideasbeforetime.com',
                SimpleEmail: {
                    Subject: { Data: 'Want the full report?' },
                    HtmlPart: { Data: '<p>You viewed 30% of the Acrylic report. Get full access free!</p>' }
                }
            }
        }
    }
});

// Day 3: Reminder
// Day 7: Last chance
```

### Campaign 2: SPO Trial → Paid
```javascript
// Automated drip campaign
const campaigns = [
    { day: 1, subject: 'How did SPO work for you?' },
    { day: 3, subject: 'Upgrade for ₹21 - Full features' },
    { day: 7, subject: 'Success stories from SPO users' }
];
```

**Cost:** Free tier = 5K emails/month
