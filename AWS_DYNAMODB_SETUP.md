# 💾 DynamoDB Setup - Month 2
**Goal:** Store user data, analytics, job tracking

---

## ✅ STEP 1: Create Tables

```bash
# Users table
aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions \
    AttributeName=email,AttributeType=S \
  --key-schema \
    AttributeName=email,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Reports table
aws dynamodb create-table \
  --table-name Reports \
  --attribute-definitions \
    AttributeName=reportId,AttributeType=S \
  --key-schema \
    AttributeName=reportId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Jobs table
aws dynamodb create-table \
  --table-name Jobs \
  --attribute-definitions \
    AttributeName=userEmail,AttributeType=S \
    AttributeName=jobId,AttributeType=S \
  --key-schema \
    AttributeName=userEmail,KeyType=HASH \
    AttributeName=jobId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST

# Analytics table
aws dynamodb create-table \
  --table-name Analytics \
  --attribute-definitions \
    AttributeName=eventId,AttributeType=S \
    AttributeName=timestamp,AttributeType=N \
  --key-schema \
    AttributeName=eventId,KeyType=HASH \
    AttributeName=timestamp,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST
```

---

## ✅ STEP 2: Lambda Integration

```javascript
const { DynamoDBClient, PutItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');

const dynamodb = new DynamoDBClient({ region: 'us-east-1' });

// Save user
async function saveUser(email, name) {
    await dynamodb.send(new PutItemCommand({
        TableName: 'Users',
        Item: {
            email: { S: email },
            name: { S: name },
            signupDate: { N: Date.now().toString() },
            spoUsageCount: { N: '0' },
            plan: { S: 'free' }
        }
    }));
}

// Track event
async function trackEvent(eventType, data) {
    await dynamodb.send(new PutItemCommand({
        TableName: 'Analytics',
        Item: {
            eventId: { S: `${eventType}-${Date.now()}` },
            timestamp: { N: Date.now().toString() },
            type: { S: eventType },
            data: { S: JSON.stringify(data) }
        }
    }));
}
```

**Cost:** Free tier = 25GB storage, 200M requests/month
