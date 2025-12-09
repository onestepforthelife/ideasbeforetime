# ⚙️ OPTIMIZING AGENT - Automatic Problem Resolution

**Purpose:** Execute fixes automatically via APIs  
**Type:** Action-taking agent  
**Technology:** Python + API integrations + AWS Lambda

---

## 🎯 AGENT OVERVIEW

**What It Does:**
- Receives solutions from Diagnostic Agent
- Executes automated fixes via APIs
- Monitors fix effectiveness
- Reports results to owner

**Why It Matters:**
- Fixes issues in minutes (vs hours manually)
- Works 24/7 without human intervention
- Prevents revenue loss from downtime

---

## 🔧 AUTOMATION CAPABILITIES

### Google Ads Optimizations

**Actions:**
- Pause underperforming ads
- Adjust bids based on CPL
- Revert to previous ad copy
- Add/remove negative keywords
- Adjust daily budget
- Change targeting parameters

**Example:**
```python
def fix_high_cpl(solution):
    """
    Fix high CPL by reverting ad copy
    """
    if solution['action'] == 'revert_ad_copy':
        # Get previous ad copy from history
        previous_copy = get_previous_ad_copy()
        
        # Update via Google Ads API
        google_ads_client.update_ad(
            ad_id=current_ad_id,
            headline=previous_copy['headline'],
            description=previous_copy['description']
        )
        
        # Log action
        log_optimization({
            'action': 'reverted_ad_copy',
            'expected_impact': 'CPL drops to $15 within 24h',
            'timestamp': datetime.now()
        })
        
        return {'status': 'success', 'message': 'Ad copy reverted'}
```

### Conditional Forwarding Fixes

**Actions:**
- Switch to backup carrier
- Adjust ring timeout
- Update forwarding rules
- Test forwarding connection
- Reset forwarding configuration

**Example:**
```python
def fix_forwarding_failure(solution):
    """
    Switch to backup carrier
    """
    if solution['action'] == 'switch_carrier':
        # Update Twilio forwarding
        twilio_client.update_phone_number(
            phone_number_sid=primary_number_sid,
            voice_url=backup_carrier_url
        )
        
        # Test new configuration
        test_result = test_forwarding()
        
        if test_result['success_rate'] > 95:
            return {'status': 'success', 'message': 'Switched to backup carrier'}
        else:
            # Rollback if test fails
            rollback_forwarding()
            return {'status': 'failed', 'message': 'Backup carrier also failing'}
```

### GHL Workflow Optimizations

**Actions:**
- Restart failed workflows
- Update SMS templates
- Adjust timing delays
- Fix broken integrations
- Update contact information

**Example:**
```python
def fix_low_response_rate(solution):
    """
    Adjust SMS timing for better engagement
    """
    if solution['action'] == 'adjust_timing':
        # Update workflow timing
        ghl_client.update_workflow(
            workflow_id=missed_call_workflow_id,
            delay_minutes=solution['new_timing']
        )
        
        # Monitor for 24 hours
        schedule_monitoring({
            'metric': 'response_rate',
            'duration_hours': 24,
            'expected_improvement': solution['expected_impact']
        })
        
        return {'status': 'success', 'message': f'Timing adjusted to {solution["new_timing"]} minutes'}
```

---

## 🤖 DECISION LOGIC

### Automation Rules

**Always Automate:**
- Revert to known-good configuration
- Switch to backup systems
- Restart failed processes
- Adjust within safe ranges

**Never Automate:**
- Increase budget >20%
- Change pricing
- Delete data
- Disable critical systems

**Require Approval:**
- New configurations
- Budget changes >10%
- Structural changes
- Long-term modifications

### Safety Checks

**Before Execution:**
```python
def can_automate(solution):
    """
    Check if solution can be automated safely
    """
    # Check automation flag
    if not solution['automated']:
        return False, "Solution requires manual intervention"
    
    # Check risk level
    if solution['risk_level'] == 'high':
        return False, "High-risk action requires approval"
    
    # Check business hours
    if solution['requires_business_hours'] and not is_business_hours():
        return False, "Action requires business hours"
    
    # Check budget impact
    if solution['budget_impact'] > 100:
        return False, "Budget impact exceeds $100 threshold"
    
    return True, "Safe to automate"
```

**After Execution:**
```python
def verify_fix(action, expected_impact):
    """
    Verify fix worked as expected
    """
    # Wait for metrics to update
    time.sleep(300)  # 5 minutes
    
    # Check if metric improved
    current_value = get_current_metric_value(action['metric'])
    
    if current_value <= action['target']:
        return {
            'success': True,
            'message': f"Fix successful: {action['metric']} now {current_value}"
        }
    else:
        # Rollback if fix didn't work
        rollback_action(action)
        return {
            'success': False,
            'message': f"Fix failed: {action['metric']} still {current_value}, rolled back"
        }
```

---

## 📊 OPTIMIZATION EXAMPLES

### Example 1: Auto-Fix High CPL

**Input from Diagnostic Agent:**
```json
{
  "priority": "immediate",
  "action": "revert_ad_copy",
  "automated": true,
  "expected_impact": "CPL drops to $15 within 24 hours",
  "confidence": 90
}
```

**Execution:**
1. Verify automation allowed ✅
2. Get previous ad copy from history
3. Update Google Ads via API
4. Log action in database
5. Schedule verification in 24 hours
6. Send notification to owner

**Result:**
```json
{
  "status": "success",
  "action_taken": "Reverted ad copy to version from 2025-12-03",
  "timestamp": "2025-12-06T10:35:00Z",
  "verification_scheduled": "2025-12-07T10:35:00Z",
  "notification_sent": true
}
```

### Example 2: Auto-Switch Carrier

**Input from Diagnostic Agent:**
```json
{
  "priority": "immediate",
  "action": "switch_to_backup_carrier",
  "automated": true,
  "expected_impact": "Success rate returns to 98% within 5 minutes",
  "confidence": 95
}
```

**Execution:**
1. Verify automation allowed ✅
2. Update Twilio forwarding to backup
3. Test forwarding (make test call)
4. Verify success rate >95%
5. Log action
6. Send SMS alert to owner

**Result:**
```json
{
  "status": "success",
  "action_taken": "Switched forwarding from Verizon to AT&T",
  "test_result": {
    "success_rate": 98,
    "ring_time": 18,
    "call_quality": "excellent"
  },
  "timestamp": "2025-12-06T10:40:00Z",
  "notification_sent": true
}
```

### Example 3: Requires Approval

**Input from Diagnostic Agent:**
```json
{
  "priority": "short_term",
  "action": "increase_daily_budget",
  "automated": false,
  "budget_change": "+$50/day",
  "expected_impact": "Generate 5 more leads/day",
  "confidence": 75
}
```

**Execution:**
1. Verify automation allowed ❌ (requires approval)
2. Create approval request
3. Send to owner via SMS + Email
4. Wait for approval
5. Execute if approved

**Result:**
```json
{
  "status": "pending_approval",
  "action": "increase_daily_budget",
  "approval_request_sent": true,
  "approval_link": "https://app.example.com/approve/12345",
  "expires_in": "24 hours"
}
```

---

## 🔔 NOTIFICATIONS

### Success Notification

**SMS to Owner:**
```
✅ AUTO-FIX SUCCESSFUL

Issue: High CPL ($23.50)
Action: Reverted ad copy
Expected: CPL drops to $15 in 24h
Status: Monitoring

View details: [Link]
```

### Failure Notification

**SMS to Owner:**
```
⚠️ AUTO-FIX FAILED

Issue: Forwarding failure
Action: Switched to backup carrier
Result: Backup also failing
Status: MANUAL ACTION REQUIRED

Call now: [Phone]
```

### Approval Request

**SMS to Owner:**
```
📋 APPROVAL NEEDED

Action: Increase Google Ads budget
Change: +$50/day ($100 → $150)
Impact: +5 leads/day
Cost: +$1,500/month

Approve: [Link]
Expires: 24 hours
```

---

## 🎯 SUCCESS METRICS

**Agent Performance:**
- Automation success rate: >90%
- Fix effectiveness: >85%
- Rollback rate: <10%
- Response time: <5 minutes

**Business Impact:**
- Issues auto-resolved: 70% (vs 0% manual)
- Resolution time: 5 min (vs 2 hours manual)
- Downtime prevented: 95%
- Revenue protected: $3,000/month

---

## 📝 IMPLEMENTATION CHECKLIST

**API Integration:**
- ☐ Google Ads API setup
- ☐ Twilio API setup
- ☐ GHL API setup
- ☐ Test all API calls

**Safety Systems:**
- ☐ Implement automation rules
- ☐ Add safety checks
- ☐ Configure rollback logic
- ☐ Test approval workflow

**Monitoring:**
- ☐ Log all actions
- ☐ Track success/failure
- ☐ Monitor fix effectiveness
- ☐ Alert on failures

**Testing:**
- ☐ Test each automation
- ☐ Test rollback scenarios
- ☐ Test approval flow
- ☐ Load testing

---

**Status:** READY FOR IMPLEMENTATION  
**Priority:** HIGH - Enables autonomous operation  
**Dependencies:** All APIs, Diagnostic Agent  
**Timeline:** 1 week development + 1 week testing
