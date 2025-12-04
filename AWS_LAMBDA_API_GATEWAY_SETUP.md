# ⚡ Lambda + API Gateway Setup - Week 2
**Goal:** Serverless backend for email gates, SPO, payments

---

## ✅ STEP 1: Create Lambda Functions

### 1.1 Email Gate Handler
```javascript
// lambda/email-gate-handler.js
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

exports.handler = async (event) => {
    const { email, reportName } = JSON.parse(event.body);
    
    // Validate email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return { statusCode: 400, body: 'Invalid email' };
    }
    
    // Send report
    const ses = new SESClient({ region: 'us-east-1' });
    await ses.send(new SendEmailCommand({
        Source: 'reports@ideasbeforetime.com',
        Destination: { ToAddresses: [email] },
        Message: {
            Subject: { Data: `Your ${reportName} Report` },
            Body: { Html: { Data: `<a href="https://ideasbeforetime.pages.dev/reports/${reportName}.pdf">Download</a>` }}
        }
    }));
    
    // Log to DynamoDB
    // ... track conversion
    
    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true })
    };
};
```

### 1.2 SPO Handler (Already created in Week 1)

### 1.3 Payment Webhook
```javascript
// lambda/payment-webhook.js
const crypto = require('crypto');

exports.handler = async (event) => {
    const { razorpay_signature, razorpay_payment_id, razorpay_order_id } = JSON.parse(event.body);
    
    // Verify signature
    const secret = process.env.RAZORPAY_SECRET;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
    
    if (expectedSignature !== razorpay_signature) {
        return { statusCode: 400, body: 'Invalid signature' };
    }
    
    // Payment verified - unlock features
    // ... update DynamoDB user record
    
    return { statusCode: 200, body: JSON.stringify({ verified: true }) };
};
```

---

## ✅ STEP 2: Deploy All Functions

```bash
# Package and deploy
for func in email-gate-handler bedrock-spo-handler payment-webhook; do
    cd lambda/$func
    npm install
    zip -r function.zip .
    
    aws lambda create-function \
      --function-name $func \
      --runtime nodejs18.x \
      --role arn:aws:iam::ACCOUNT:role/lambda-execution-role \
      --handler index.handler \
      --zip-file fileb://function.zip \
      --timeout 30 \
      --memory-size 512
    
    cd ../..
done
```

---

## ✅ STEP 3: Create API Gateway

```bash
# Create HTTP API
aws apigatewayv2 create-api \
  --name ideasbeforetime-api \
  --protocol-type HTTP \
  --cors-configuration '{
    "AllowOrigins": ["https://ideasbeforetime.pages.dev"],
    "AllowMethods": ["POST","GET"],
    "AllowHeaders": ["Content-Type"]
  }'

# Add routes
aws apigatewayv2 create-route \
  --api-id YOUR_API_ID \
  --route-key "POST /email-gate" \
  --target integrations/YOUR_INTEGRATION_ID

aws apigatewayv2 create-route \
  --api-id YOUR_API_ID \
  --route-key "POST /spo" \
  --target integrations/YOUR_INTEGRATION_ID

aws apigatewayv2 create-route \
  --api-id YOUR_API_ID \
  --route-key "POST /payment-webhook" \
  --target integrations/YOUR_INTEGRATION_ID
```

**Endpoint:** `https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com`

---

## ✅ STEP 4: Update Frontend

```javascript
// Update request-access.html
async function requestReport(email, reportName) {
    const response = await fetch('https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/email-gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reportName })
    });
    
    if (response.ok) {
        alert('Report sent to your email!');
    }
}

// Update social-optimizer-app.js
async function generateProfile(profileData) {
    const response = await fetch('https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/spo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: profileData })
    });
    
    return response.json();
}
```

**Cost:** Free tier = 1M requests/month
