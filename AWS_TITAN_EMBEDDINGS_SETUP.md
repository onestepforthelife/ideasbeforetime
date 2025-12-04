# 🔍 Titan Embeddings Setup - Month 3
**Goal:** Semantic search for jobs and reports

---

## ✅ STEP 1: Generate Embeddings

```javascript
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

async function generateEmbedding(text) {
    const client = new BedrockRuntimeClient({ region: 'us-east-1' });
    
    const response = await client.send(new InvokeModelCommand({
        modelId: 'amazon.titan-embed-text-v1',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({ inputText: text })
    }));
    
    const result = JSON.parse(new TextDecoder().decode(response.body));
    return result.embedding; // 1536-dimensional vector
}
```

---

## ✅ STEP 2: Store in DynamoDB

```javascript
// Store job embeddings
async function indexJob(job) {
    const embedding = await generateEmbedding(`${job.title} ${job.description} ${job.skills}`);
    
    await dynamodb.send(new PutItemCommand({
        TableName: 'Jobs',
        Item: {
            jobId: { S: job.id },
            title: { S: job.title },
            embedding: { L: embedding.map(v => ({ N: v.toString() })) }
        }
    }));
}
```

---

## ✅ STEP 3: Semantic Search

```javascript
// Find similar jobs
async function findSimilarJobs(resume) {
    const resumeEmbedding = await generateEmbedding(resume);
    
    // Get all jobs
    const jobs = await getAllJobs();
    
    // Calculate cosine similarity
    const similarities = jobs.map(job => ({
        job,
        similarity: cosineSimilarity(resumeEmbedding, job.embedding)
    }));
    
    // Return top 10
    return similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 10)
        .map(s => s.job);
}

function cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}
```

---

## ✅ STEP 4: Report Recommendations

```javascript
// User reads Acrylic report → Suggest similar
const similarReports = await findSimilarReports('acrylic-market-report');
// Returns: Poloxamer, Paper Pulp (similar chemistry topics)
```

**Cost:** $0.0001 per 1K tokens (very cheap!)
