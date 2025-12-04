# 🔐 Secrets Manager Setup - Week 1
**Goal:** Secure all API keys, no hardcoded credentials

---

## ✅ STEP 1: Create Secrets

```bash
# Bedrock credentials
aws secretsmanager create-secret \
  --name prod/bedrock/credentials \
  --secret-string '{
    "accessKeyId": "AKIA...",
    "secretAccessKey": "wJal...",
    "region": "us-east-1"
  }'

# Gemini API key (backup)
aws secretsmanager create-secret \
  --name prod/gemini/api-key \
  --secret-string '{"apiKey": "AIza..."}'

# Razorpay credentials
aws secretsmanager create-secret \
  --name prod/razorpay/credentials \
  --secret-string '{
    "keyId": "rzp_live_...",
    "keySecret": "..."
  }'

# Email service
aws secretsmanager create-secret \
  --name prod/email/smtp \
  --secret-string '{
    "host": "smtp.gmail.com",
    "user": "onestepforthelife@gmail.com",
    "password": "..."
  }'
```

---

## ✅ STEP 2: Grant Lambda Access

```bash
# Add policy to Lambda execution role
aws iam attach-role-policy \
  --role-name lambda-execution-role \
  --policy-arn arn:aws:iam::aws:policy/SecretsManagerReadWrite
```

---

## ✅ STEP 3: Use in Lambda

```javascript
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function getSecret(secretName) {
    const client = new SecretsManagerClient({ region: 'us-east-1' });
    const response = await client.send(new GetSecretValueCommand({ SecretId: secretName }));
    return JSON.parse(response.SecretString);
}

// Usage
const bedrockCreds = await getSecret('prod/bedrock/credentials');
const razorpayCreds = await getSecret('prod/razorpay/credentials');
```

---

## ✅ STEP 4: Remove Hardcoded Keys

```bash
# Search for hardcoded keys
grep -r "AIza" .
grep -r "rzp_" .
grep -r "AKIA" .

# Replace with Secrets Manager calls
```

**Cost:** $0.40/secret/month after 30-day trial
