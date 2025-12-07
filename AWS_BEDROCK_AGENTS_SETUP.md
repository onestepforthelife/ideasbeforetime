# 🤖 Bedrock Agents Setup - Month 2
**Goal:** Autonomous SPO with multi-step reasoning

---

## ✅ STEP 1: Create Agent

```bash
aws bedrock-agent create-agent \
  --agent-name spo-assistant \
  --foundation-model amazon.nova-pro-v1:0 \
  --instruction "You are a LinkedIn profile optimization assistant. Analyze profiles, suggest improvements, find job matches, and track applications."
```

---

## ✅ STEP 2: Add Action Groups

```javascript
// Define tools the agent can use
const actionGroups = [
    {
        name: 'ProfileAnalysis',
        description: 'Analyze LinkedIn profile and identify weak sections',
        apiSchema: {
            type: 'object',
            properties: {
                profile: { type: 'string' }
            }
        }
    },
    {
        name: 'JobMatching',
        description: 'Find relevant jobs based on profile',
        apiSchema: {
            type: 'object',
            properties: {
                skills: { type: 'array' },
                experience: { type: 'number' }
            }
        }
    },
    {
        name: 'ApplicationTracking',
        description: 'Track job application status',
        apiSchema: {
            type: 'object',
            properties: {
                jobId: { type: 'string' },
                status: { type: 'string' }
            }
        }
    }
];
```

---

## ✅ STEP 3: Agent Workflow

```javascript
// User: "Optimize my profile and find jobs"
// Agent executes:
1. ProfileAnalysis(profile) → Identifies weak headline
2. GenerateContent(headline) → Creates better headline
3. JobMatching(skills) → Finds 10 relevant jobs
4. ApplicationTracking(jobs) → Sets up tracking
5. SendReminder(user) → Schedules follow-ups
```

---

## ✅ STEP 4: Invoke Agent

```javascript
const { BedrockAgentRuntimeClient, InvokeAgentCommand } = require('@aws-sdk/client-bedrock-agent-runtime');

async function invokeAgent(userInput) {
    const client = new BedrockAgentRuntimeClient({ region: 'us-east-1' });
    
    const response = await client.send(new InvokeAgentCommand({
        agentId: 'YOUR_AGENT_ID',
        agentAliasId: 'YOUR_ALIAS_ID',
        sessionId: `session-${Date.now()}`,
        inputText: userInput
    }));
    
    return response;
}

// Usage
const result = await invokeAgent("Optimize my LinkedIn profile and find me 5 relevant jobs in chemical engineering");
```

**Cost:** Included in Bedrock pricing
