# 📊 CloudWatch RUM Setup - Week 2
**Goal:** Track user behavior, errors, performance automatically

---

## ✅ STEP 1: Create RUM App Monitor (10 min)

```bash
aws rum create-app-monitor \
  --name "ideasbeforetime-production" \
  --domain "ideasbeforetime.pages.dev" \
  --app-monitor-configuration '{
    "AllowCookies": true,
    "EnableXRay": true,
    "SessionSampleRate": 1.0,
    "Telemetries": ["errors","performance","http"]
  }'
```

**Output:** Copy the snippet code

---

## ✅ STEP 2: Add to All Pages (5 min)

```html
<!-- Add before </head> in common-navigation.js or all HTML files -->
<script>
(function(n,i,v,r,s,c,x,z){n[s]||(n[s]=function(){(n[s].q=n[s].q||[]).push(arguments)},
n[s].l=1*new Date,c=i.createElement(v),x=i.getElementsByTagName(v)[0],c.async=1,
c.src=r,x.parentNode.insertBefore(c,x))})(window,document,"script",
"https://client.rum.us-east-1.amazonaws.com/1.x.x/cwr.js","cwr");

cwr('init', {
  applicationId: 'YOUR_APP_ID',
  applicationVersion: '1.0.0',
  region: 'us-east-1'
});
</script>
```

---

## ✅ STEP 3: Track Custom Events

```javascript
// Track SPO usage
cwr('recordEvent', {
  type: 'spo_generation',
  data: { success: true, duration: 3500 }
});

// Track report downloads
cwr('recordEvent', {
  type: 'report_download',
  data: { report: 'acrylic', format: 'pdf' }
});

// Track payment
cwr('recordEvent', {
  type: 'payment_complete',
  data: { amount: 21, currency: 'INR' }
});
```

---

## ✅ STEP 4: Setup Alerts

```bash
# Alert on high error rate
aws cloudwatch put-metric-alarm \
  --alarm-name rum-high-errors \
  --metric-name ErrorCount \
  --namespace AWS/RUM \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 1 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold
```

**Cost:** Free tier = 100K events/month
