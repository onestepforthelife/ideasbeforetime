# 🔍 DIAGNOSTIC AGENT - Root Cause Analysis

**Purpose:** Analyze issues, find root causes, recommend solutions  
**Type:** On-demand analysis agent  
**Technology:** Python + AWS Bedrock (Claude) + LangChain

---

## 🎯 AGENT OVERVIEW

**What It Does:**
- Receives alerts from Monitor Agent
- Analyzes data to find root causes
- Generates actionable recommendations
- Provides insights to Optimizing Agent

**Why It Matters:**
- Fixes problems, not symptoms
- Saves hours of manual analysis
- Prevents recurring issues

---

## 🧠 ANALYSIS CAPABILITIES

### Issue Categories

**1. Google Ads Issues**
- High CPL (cost per lead)
- Low CTR (click-through rate)
- Low conversion rate
- Budget overspend
- Low quality score

**2. Forwarding Issues**
- Calls not forwarding
- High missed call rate
- Long ring times
- Voicemail rate high
- Call quality poor

**3. GHL Workflow Issues**
- Workflows not executing
- SMS not delivering
- Emails bouncing
- Low response rates
- Low conversion rates

**4. Business Issues**
- Low lead generation
- Low booking rate
- Low revenue
- Low customer satisfaction
- High churn rate

---

## 🔬 DIAGNOSTIC PROCESS

### Step 1: Data Collection

**Gather Context:**
```python
def collect_diagnostic_data(alert):
    """
    Collect all relevant data for analysis
    """
    issue_type = alert['metric']
    timeframe = alert['timestamp']
    
    # Collect related metrics
    data = {
        'alert': alert,
        'historical_data': get_historical_data(issue_type, days=30),
        'related_metrics': get_related_metrics(issue_type),
        'recent_changes': get_recent_changes(timeframe),
        'external_factors': get_external_factors(timeframe)
    }
    
    return data
```

**Data Sources:**
- Monitor Agent metrics (last 30 days)
- System logs (last 7 days)
- Configuration changes (last 30 days)
- External factors (weather, holidays, competition)

### Step 2: Pattern Analysis

**Identify Patterns:**
```python
def analyze_patterns(data):
    """
    Find patterns in the data
    """
    patterns = []
    
    # Time-based patterns
    if is_time_pattern(data):
        patterns.append({
            'type': 'time',
            'description': 'Issue occurs at specific times',
            'details': get_time_pattern_details(data)
        })
    
    # Correlation patterns
    correlations = find_correlations(data)
    for corr in correlations:
        patterns.append({
            'type': 'correlation',
            'description': f'{corr["metric1"]} correlates with {corr["metric2"]}',
            'strength': corr['coefficient']
        })
    
    # Trend patterns
    if is_trending(data):
        patterns.append({
            'type': 'trend',
            'description': 'Metric trending over time',
            'direction': get_trend_direction(data)
        })
    
    return patterns
```

### Step 3: Root Cause Identification

**Use AI for Analysis:**
```python
def identify_root_cause(data, patterns):
    """
    Use Claude AI to identify root cause
    """
    # Prepare prompt for Claude
    prompt = f"""
    Analyze this business issue and identify the root cause:
    
    Issue: {data['alert']['message']}
    Current Value: {data['alert']['value']}
    Target: {data['alert']['threshold']}
    
    Historical Data:
    {format_historical_data(data['historical_data'])}
    
    Patterns Found:
    {format_patterns(patterns)}
    
    Recent Changes:
    {format_changes(data['recent_changes'])}
    
    External Factors:
    {format_external_factors(data['external_factors'])}
    
    Provide:
    1. Root cause (most likely explanation)
    2. Contributing factors (other influences)
    3. Confidence level (0-100%)
    4. Recommended actions (specific steps)
    """
    
    # Call Claude via AWS Bedrock
    response = bedrock_client.invoke_model(
        modelId='anthropic.claude-3-sonnet-20240229-v1:0',
        body=json.dumps({
            'anthropic_version': 'bedrock-2023-05-31',
            'max_tokens': 2000,
            'messages': [{
                'role': 'user',
                'content': prompt
            }]
        })
    )
    
    # Parse response
    result = json.loads(response['body'].read())
    analysis = result['content'][0]['text']
    
    return parse_analysis(analysis)
```

### Step 4: Solution Generation

**Generate Recommendations:**
```python
def generate_solutions(root_cause):
    """
    Generate actionable solutions
    """
    solutions = []
    
    # Immediate fixes (can be automated)
    immediate = get_immediate_fixes(root_cause)
    for fix in immediate:
        solutions.append({
            'priority': 'immediate',
            'action': fix['action'],
            'automated': fix['can_automate'],
            'expected_impact': fix['impact']
        })
    
    # Short-term fixes (manual intervention)
    short_term = get_short_term_fixes(root_cause)
    for fix in short_term:
        solutions.append({
            'priority': 'short_term',
            'action': fix['action'],
            'timeline': fix['timeline'],
            'expected_impact': fix['impact']
        })
    
    # Long-term improvements
    long_term = get_long_term_improvements(root_cause)
    for improvement in long_term:
        solutions.append({
            'priority': 'long_term',
            'action': improvement['action'],
            'investment': improvement['cost'],
            'expected_impact': improvement['impact']
        })
    
    return solutions
```

---

## 📊 DIAGNOSTIC EXAMPLES

### Example 1: High CPL Diagnosis

**Alert Received:**
```json
{
  "metric": "cpl",
  "value": 23.50,
  "threshold": 15.00,
  "severity": "critical"
}
```

**Data Collected:**
- CPL history: $12 → $15 → $18 → $23.50 (trending up)
- CTR: 5.2% (stable)
- Conversion rate: 8% (down from 12%)
- Recent changes: New ad copy deployed 3 days ago
- External: Competitor launched campaign

**Patterns Found:**
- Time pattern: CPL spike started 3 days ago
- Correlation: CPL increase correlates with conversion rate drop
- Trend: Steady increase over 7 days

**Root Cause Analysis (Claude):**
```
ROOT CAUSE: New ad copy attracting wrong audience

ANALYSIS:
- CTR stable (5.2%) indicates ads still engaging
- Conversion rate dropped 33% (12% → 8%)
- This means clicks are coming, but not converting
- New ad copy deployed 3 days ago (timing matches)
- Likely attracting curiosity clicks, not qualified leads

CONTRIBUTING FACTORS:
- Competitor campaign may have increased bid prices
- Seasonal factor (holiday season) may affect intent

CONFIDENCE: 85%

RECOMMENDED ACTIONS:
1. IMMEDIATE: Revert to previous ad copy (automated)
2. SHORT-TERM: A/B test new copy with better qualification
3. LONG-TERM: Implement negative keywords to filter unqualified clicks
```

**Solutions Generated:**
```json
[
  {
    "priority": "immediate",
    "action": "Revert to previous ad copy",
    "automated": true,
    "expected_impact": "CPL drops to $15 within 24 hours"
  },
  {
    "priority": "short_term",
    "action": "Add negative keywords: 'DIY', 'free', 'cheap'",
    "timeline": "1-2 days",
    "expected_impact": "Filter 20% unqualified clicks, improve conversion to 11%"
  },
  {
    "priority": "long_term",
    "action": "Implement lead scoring to qualify before forwarding",
    "investment": "$500 setup",
    "expected_impact": "Reduce CPL by 30%, improve conversion to 15%"
  }
]
```

### Example 2: Forwarding Failure Diagnosis

**Alert Received:**
```json
{
  "metric": "forwarding_success",
  "value": 85,
  "threshold": 95,
  "severity": "critical"
}
```

**Data Collected:**
- Success rate history: 98% → 95% → 90% → 85% (declining)
- Missed calls: 15 in last hour (vs 2 average)
- Ring time: 45 seconds (vs 20 average)
- Recent changes: None in forwarding config
- External: Carrier maintenance window (Verizon)

**Patterns Found:**
- Time pattern: Issue started 2 hours ago
- Correlation: Success rate drop correlates with carrier maintenance
- Trend: Rapid decline over 2 hours

**Root Cause Analysis (Claude):**
```
ROOT CAUSE: Carrier maintenance affecting forwarding

ANALYSIS:
- No configuration changes in system
- Timing matches Verizon maintenance window
- Ring time increased (network delay)
- Success rate declining rapidly (network issues)
- Pattern consistent with carrier-side problem

CONTRIBUTING FACTORS:
- Single carrier dependency (no backup)
- No automatic failover configured

CONFIDENCE: 95%

RECOMMENDED ACTIONS:
1. IMMEDIATE: Switch to backup carrier (automated)
2. SHORT-TERM: Monitor Verizon status, switch back when resolved
3. LONG-TERM: Implement multi-carrier failover system
```

**Solutions Generated:**
```json
[
  {
    "priority": "immediate",
    "action": "Switch forwarding to AT&T backup line",
    "automated": true,
    "expected_impact": "Success rate returns to 98% within 5 minutes"
  },
  {
    "priority": "short_term",
    "action": "Monitor Verizon status page, switch back when maintenance complete",
    "timeline": "2-4 hours",
    "expected_impact": "Resume normal operations"
  },
  {
    "priority": "long_term",
    "action": "Implement automatic carrier failover (if primary fails, switch to backup)",
    "investment": "$200 setup + $50/month",
    "expected_impact": "99.9% uptime, automatic recovery"
  }
]
```

### Example 3: Low Booking Rate Diagnosis

**Alert Received:**
```json
{
  "metric": "booking_rate",
  "value": 33,
  "threshold": 50,
  "severity": "high"
}
```

**Data Collected:**
- Booking rate history: 55% → 50% → 45% → 33% (declining)
- Leads: 12 today (normal)
- Quote response time: 45 minutes (vs 15 minutes target)
- Recent changes: Technician on vacation (reduced capacity)
- External: None

**Patterns Found:**
- Time pattern: Decline started 5 days ago (when technician left)
- Correlation: Response time increased, booking rate decreased
- Trend: Steady decline over 5 days

**Root Cause Analysis (Claude):**
```
ROOT CAUSE: Slow quote response time due to reduced capacity

ANALYSIS:
- Lead volume normal (12/day)
- Quote response time tripled (15min → 45min)
- Timing matches technician vacation start
- Customers booking with faster competitors
- Classic capacity constraint issue

CONTRIBUTING FACTORS:
- No backup technician coverage
- No automated quote system
- Manual quote process bottleneck

CONFIDENCE: 90%

RECOMMENDED ACTIONS:
1. IMMEDIATE: Hire temporary technician (manual)
2. SHORT-TERM: Implement automated quote system for standard jobs
3. LONG-TERM: Build technician backup roster, cross-train staff
```

**Solutions Generated:**
```json
[
  {
    "priority": "immediate",
    "action": "Hire temporary technician from staffing agency",
    "automated": false,
    "expected_impact": "Response time drops to 20 minutes, booking rate returns to 50%"
  },
  {
    "priority": "short_term",
    "action": "Implement automated quote system (standard drain cleaning: $125, emergency: $175)",
    "timeline": "1 week",
    "expected_impact": "Instant quotes for 70% of jobs, response time <5 minutes"
  },
  {
    "priority": "long_term",
    "action": "Build backup technician roster (3 on-call techs), cross-train office staff",
    "investment": "$1,000 training",
    "expected_impact": "Never miss quotes, maintain 55% booking rate year-round"
  }
]
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### LangChain Integration

**Agent Setup:**
```python
from langchain.agents import initialize_agent, Tool
from langchain.llms import Bedrock
from langchain.memory import ConversationBufferMemory

# Initialize Claude via Bedrock
llm = Bedrock(
    model_id="anthropic.claude-3-sonnet-20240229-v1:0",
    region_name="us-east-1"
)

# Define tools for agent
tools = [
    Tool(
        name="GetHistoricalData",
        func=get_historical_data,
        description="Get historical metrics for analysis"
    ),
    Tool(
        name="FindCorrelations",
        func=find_correlations,
        description="Find correlations between metrics"
    ),
    Tool(
        name="GetRecentChanges",
        func=get_recent_changes,
        description="Get recent system changes"
    ),
    Tool(
        name="GetExternalFactors",
        func=get_external_factors,
        description="Get external factors (weather, holidays, etc.)"
    )
]

# Initialize agent
diagnostic_agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent="zero-shot-react-description",
    verbose=True,
    memory=ConversationBufferMemory()
)

def diagnose_issue(alert):
    """
    Main diagnostic function
    """
    prompt = f"""
    Diagnose this business issue:
    
    Alert: {alert['message']}
    Metric: {alert['metric']}
    Current Value: {alert['value']}
    Target: {alert['threshold']}
    
    Use available tools to:
    1. Gather historical data
    2. Find patterns and correlations
    3. Check recent changes
    4. Consider external factors
    5. Identify root cause
    6. Recommend solutions
    
    Provide a structured analysis with confidence level.
    """
    
    result = diagnostic_agent.run(prompt)
    return parse_diagnostic_result(result)
```

---

## 📊 OUTPUT FORMAT

**Diagnostic Report:**
```json
{
  "alert_id": "alert_12345",
  "timestamp": "2025-12-06T10:30:00Z",
  "issue": {
    "metric": "cpl",
    "value": 23.50,
    "threshold": 15.00,
    "severity": "critical"
  },
  "analysis": {
    "root_cause": "New ad copy attracting wrong audience",
    "contributing_factors": [
      "Competitor campaign increased bid prices",
      "Holiday season affecting intent"
    ],
    "confidence": 85,
    "evidence": [
      "CTR stable at 5.2%",
      "Conversion rate dropped 33%",
      "Timing matches ad copy change"
    ]
  },
  "solutions": [
    {
      "priority": "immediate",
      "action": "Revert to previous ad copy",
      "automated": true,
      "expected_impact": "CPL drops to $15 within 24 hours",
      "confidence": 90
    }
  ],
  "next_steps": [
    "Optimizing Agent will execute immediate fix",
    "Owner review required for long-term improvements",
    "Monitor CPL for 48 hours to confirm fix"
  ]
}
```

---

## 🎯 SUCCESS METRICS

**Agent Performance:**
- Diagnostic accuracy: >90%
- Root cause identification: >85%
- Solution effectiveness: >80%
- Analysis time: <5 minutes

**Business Impact:**
- Issues resolved: +60% (vs manual)
- Resolution time: -75% (5 min vs 2 hours)
- Recurring issues: -80%
- Owner time saved: 15 hours/week

---

## 📝 IMPLEMENTATION CHECKLIST

**AWS Bedrock Setup:**
- ☐ Enable Claude model access
- ☐ Configure IAM permissions
- ☐ Set up API credentials
- ☐ Test model invocation

**LangChain Setup:**
- ☐ Install LangChain library
- ☐ Configure agent tools
- ☐ Set up memory system
- ☐ Test agent execution

**Integration:**
- ☐ Connect to Monitor Agent
- ☐ Connect to Optimizing Agent
- ☐ Set up data pipeline
- ☐ Configure alert routing

**Testing:**
- ☐ Test with historical issues
- ☐ Validate root cause accuracy
- ☐ Test solution generation
- ☐ Measure analysis time

---

**Status:** READY FOR IMPLEMENTATION  
**Priority:** HIGH - Enables intelligent problem-solving  
**Dependencies:** AWS Bedrock, LangChain, Monitor Agent  
**Timeline:** 1 week development + 1 week testing
