# 🚀 AWS Bedrock Setup - Week 1 Implementation
**Start Date:** December 4, 2025  
**Goal:** Replace Gemini with Bedrock, achieve 40% cost savings

---

## ✅ STEP 1: AWS Account Setup (15 minutes)

### 1.1 Create AWS Account
```
1. Go to: https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Enter email: onestepforthelife@gmail.com
4. Choose account name: "IdeasBeforeTime"
5. Select "Personal" account type
6. Enter payment details (required, but free tier available)
7. Verify phone number
8. Choose "Basic Support - Free"
```

### 1.2 Enable Bedrock Access
```
1. Sign in to AWS Console
2. Search for "Bedrock" in services
3. Select region: us-east-1 (cheapest, most models)
4. Click "Get Started"
5. Request model access:
   ✅ Amazon Nova Pro
   ✅ Amazon Nova Lite
   ✅ Claude 3.5 Sonnet
   ✅ Cohere Command
6. Wait 2-5 minutes for approval (usually instant)
```

### 1.3 Create IAM User for API Access
```
1. Go to IAM → Users → Create User
2. Username: "bedrock-api-user"
3. Enable: "Programmatic access"
4. Attach policy: "AmazonBedrockFullAccess"
5. Download credentials:
   - Access Key ID: AKIA...
   - Secret Access Key: wJal...
6. SAVE THESE SECURELY!
```

---

## ✅ STEP 2: Test Bedrock API (30 minutes)

### 2.1 Install AWS SDK
```bash
# In your project folder
npm install @aws-sdk/client-bedrock-runtime
```

### 2.2 Create Test Script
```javascript
// test-bedrock.js
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const client = new BedrockRuntimeClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'YOUR_ACCESS_KEY',
        secretAccessKey: 'YOUR_SECRET_KEY'
    }
});

async function testBedrock() {
    const prompt = "Rewrite this LinkedIn headline to be more impactful: 'Software Engineer at Tech Company'";
    
    const input = {
        modelId: 'amazon.nova-pro-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
            messages: [{
                role: 'user',
                content: prompt
            }],
            max_tokens: 500,
            temperature: 0.7
        })
    };
    
    try {
        const command = new InvokeModelCommand(input);
        const response = await client.send(command);
        const result = JSON.parse(new TextDecoder().decode(response.body));
        
        console.log('✅ Bedrock Response:');
        console.log(result.content[0].text);
        console.log('\n💰 Cost:', result.usage);
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testBedrock();
```

### 2.3 Run Test
```bash
node test-bedrock.js
```

**Expected Output:**
```
✅ Bedrock Response:
"Innovative Software Engineer | Building Scalable Solutions | Tech Enthusiast"

💰 Cost: { input_tokens: 25, output_tokens: 15 }
```

---

## ✅ STEP 3: Compare with Gemini (30 minutes)

### 3.1 Side-by-Side Test
```javascript
// compare-ai-models.js
const testPrompt = `
Optimize this LinkedIn profile:
Name: John Doe
Current Headline: Software Engineer
Experience: 5 years in web development
Skills: JavaScript, React, Node.js

Generate:
1. Optimized headline
2. Professional summary (3 sentences)
3. Top 3 skill highlights
`;

async function compareModels() {
    console.log('🔵 Testing Gemini...');
    const geminiResult = await callGemini(testPrompt);
    console.log(geminiResult);
    console.log('Cost: ~$0.005\n');
    
    console.log('🟢 Testing Bedrock Nova...');
    const bedrockResult = await callBedrock(testPrompt);
    console.log(bedrockResult);
    console.log('Cost: ~$0.003\n');
    
    console.log('📊 Comparison:');
    console.log('Quality: Rate both outputs');
    console.log('Speed: Measure response time');
    console.log('Cost: Bedrock 40% cheaper ✅');
}
```

### 3.2 Quality Checklist
```
Rate each output (1-10):
□ Headline is impactful
□ Summary is professional
□ Skills are relevant
□ Tone is appropriate
□ No generic phrases
□ Industry-specific language

Winner: ___________
```

---

## ✅ STEP 4: Integrate Bedrock into SPO (2 hours)

### 4.1 Update social-optimizer-ai-engine.js
```javascript
// OLD: Gemini API call
async function generateWithGemini(prompt) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    return response.json();
}

// NEW: Bedrock API call
async function generateWithBedrock(prompt) {
    const response = await fetch('YOUR_LAMBDA_ENDPOINT/bedrock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    return response.json();
}

// Switch between models
const AI_PROVIDER = 'bedrock'; // or 'gemini'
async function generateContent(prompt) {
    if (AI_PROVIDER === 'bedrock') {
        return generateWithBedrock(prompt);
    } else {
        return generateWithGemini(prompt);
    }
}
```

### 4.2 Create Lambda Function (Backend)
```javascript
// lambda/bedrock-handler.js
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

exports.handler = async (event) => {
    const { prompt } = JSON.parse(event.body);
    
    const client = new BedrockRuntimeClient({ region: 'us-east-1' });
    
    const input = {
        modelId: 'amazon.nova-pro-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 2000,
            temperature: 0.7
        })
    };
    
    const command = new InvokeModelCommand(input);
    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.body));
    
    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
            content: result.content[0].text,
            usage: result.usage
        })
    };
};
```

### 4.3 Deploy Lambda
```bash
# Package function
cd lambda
npm install @aws-sdk/client-bedrock-runtime
zip -r function.zip .

# Upload to Lambda
aws lambda create-function \
  --function-name bedrock-spo-handler \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-bedrock-role \
  --handler index.handler \
  --zip-file fileb://function.zip

# Create API Gateway endpoint
aws apigatewayv2 create-api \
  --name bedrock-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:us-east-1:YOUR_ACCOUNT:function:bedrock-spo-handler
```

---

## ✅ STEP 5: Setup Secrets Manager (30 minutes)

### 5.1 Store Credentials Securely
```bash
# Create secret for Bedrock
aws secretsmanager create-secret \
  --name prod/bedrock/credentials \
  --secret-string '{
    "accessKeyId": "AKIA...",
    "secretAccessKey": "wJal...",
    "region": "us-east-1"
  }'

# Create secret for Gemini (backup)
aws secretsmanager create-secret \
  --name prod/gemini/api-key \
  --secret-string '{"apiKey": "AIza..."}'
```

### 5.2 Update Lambda to Use Secrets
```javascript
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function getCredentials() {
    const client = new SecretsManagerClient({ region: 'us-east-1' });
    const command = new GetSecretValueCommand({ SecretId: 'prod/bedrock/credentials' });
    const response = await client.send(command);
    return JSON.parse(response.SecretString);
}

exports.handler = async (event) => {
    const creds = await getCredentials();
    const bedrockClient = new BedrockRuntimeClient({
        region: creds.region,
        credentials: {
            accessKeyId: creds.accessKeyId,
            secretAccessKey: creds.secretAccessKey
        }
    });
    // ... rest of handler
};
```

---

## ✅ STEP 6: Testing & Validation (1 hour)

### 6.1 Test Checklist
```
□ Bedrock API responds correctly
□ Lambda function works
□ API Gateway endpoint accessible
□ Secrets Manager retrieves credentials
□ SPO generates content via Bedrock
□ Quality matches or exceeds Gemini
□ Response time < 5 seconds
□ Error handling works
□ Cost tracking enabled
```

### 6.2 Load Test
```javascript
// test-load.js
async function loadTest() {
    const promises = [];
    for (let i = 0; i < 10; i++) {
        promises.push(callBedrockAPI(`Test prompt ${i}`));
    }
    
    const start = Date.now();
    const results = await Promise.all(promises);
    const duration = Date.now() - start;
    
    console.log(`✅ 10 requests completed in ${duration}ms`);
    console.log(`Average: ${duration/10}ms per request`);
}
```

---

## ✅ STEP 7: Cost Monitoring (30 minutes)

### 7.1 Setup CloudWatch Billing Alarm
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name bedrock-cost-alert \
  --alarm-description "Alert when Bedrock costs exceed $50/month" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 86400 \
  --evaluation-periods 1 \
  --threshold 50 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:YOUR_ACCOUNT:billing-alerts
```

### 7.2 Track Usage
```javascript
// Add to Lambda function
const usage = {
    timestamp: new Date().toISOString(),
    model: 'amazon.nova-pro-v1:0',
    inputTokens: result.usage.input_tokens,
    outputTokens: result.usage.output_tokens,
    cost: (result.usage.input_tokens * 0.0008 + result.usage.output_tokens * 0.0024) / 1000
};

// Log to CloudWatch
console.log('USAGE:', JSON.stringify(usage));
```

---

## 📊 SUCCESS METRICS

### Week 1 Goals
- [ ] AWS account created
- [ ] Bedrock access enabled
- [ ] Test script working
- [ ] Quality comparison done
- [ ] Lambda deployed
- [ ] Secrets Manager configured
- [ ] SPO using Bedrock
- [ ] Cost monitoring active

### Expected Results
- ✅ 40% cost reduction vs Gemini
- ✅ Equal or better content quality
- ✅ Response time < 5 seconds
- ✅ Zero API key leaks
- ✅ Automatic failover to Gemini if Bedrock fails

---

## 🚨 TROUBLESHOOTING

### Issue 1: "Access Denied" Error
**Solution:** Check IAM permissions, ensure BedrockFullAccess policy attached

### Issue 2: Model Not Available
**Solution:** Request model access in Bedrock console, wait for approval

### Issue 3: Lambda Timeout
**Solution:** Increase timeout to 30 seconds in Lambda configuration

### Issue 4: CORS Error
**Solution:** Add CORS headers to Lambda response

### Issue 5: High Costs
**Solution:** Check CloudWatch logs, reduce max_tokens, use Nova Lite for simple tasks

---

## 📚 RESOURCES

**AWS Documentation:**
- Bedrock Getting Started: https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html
- Lambda + Bedrock: https://docs.aws.amazon.com/bedrock/latest/userguide/lambda.html
- Secrets Manager: https://docs.aws.amazon.com/secretsmanager/

**Code Examples:**
- Bedrock SDK: https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-bedrock-runtime
- Lambda Templates: https://github.com/aws-samples/amazon-bedrock-samples

**Pricing:**
- Bedrock: https://aws.amazon.com/bedrock/pricing/
- Lambda: https://aws.amazon.com/lambda/pricing/
- Secrets Manager: https://aws.amazon.com/secrets-manager/pricing/

---

## 🎯 NEXT STEPS (Week 2)

After Bedrock is working:
1. Add CloudWatch RUM for analytics
2. Optimize prompts for better quality
3. Test different models (Nova Lite for simple tasks)
4. Implement A/B testing (Bedrock vs Gemini)
5. Monitor cost savings

---

**Status:** Ready to start  
**Time Required:** 5-6 hours total  
**Difficulty:** Medium  
**Risk:** Low (can fallback to Gemini)  
**Expected Savings:** $12/month (40% reduction)

