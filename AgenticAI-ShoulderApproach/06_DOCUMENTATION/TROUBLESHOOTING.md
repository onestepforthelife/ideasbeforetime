# 🔧 TROUBLESHOOTING GUIDE

**Version:** 1.0  
**Last Updated:** December 6, 2025  
**Support:** support@drainpro.com

---

## 🎯 QUICK DIAGNOSTIC

**Before diving into specific issues, run this quick diagnostic:**

```bash
# 1. Check system status
curl https://status.drainpro.com/api/status

# 2. Check your API key
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.drainpro.com/v1/health

# 3. Check AI agents
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.drainpro.com/v1/ai/agents

# 4. Check recent errors
# Login to dashboard → Logs → Last 24 hours
```

---

## 📞 CALL FORWARDING ISSUES

### Issue 1: Calls Not Forwarding

**Symptoms:**
- Customers call but don't reach GHL
- Calls go to voicemail
- No missed call workflow triggered

**Diagnostic Steps:**
```
1. Check forwarding status
   - Dial *#21# from technician's phone
   - Should show: "Forwarding to +[GHL number]"
   
2. Test forwarding manually
   - Have technician call someone (line busy)
   - Call technician's number from test phone
   - Should forward within 2 seconds
   
3. Check Twilio logs
   - Login to Twilio console
   - Check incoming calls log
   - Verify calls are reaching Twilio
   
4. Check GHL webhook
   - Login to GHL
   - Check webhook logs
   - Verify webhooks being received
```

**Solutions:**

**Solution 1: Reactivate Forwarding**
```
Verizon: *71 + GHL number
AT&T: *67 + GHL number
T-Mobile: **67* + GHL number + #

Then test by calling technician's number
```

**Solution 2: Update GHL Number**
```
1. Login to carrier account
2. Update forwarding number to correct GHL number
3. Test forwarding
```

**Solution 3: Check Twilio Status**
```
1. Login to Twilio console
2. Check phone number status (should be "Active")
3. Check account balance (should be >$0)
4. Verify webhook URL is correct
```

**Solution 4: Restart GHL Workflow**
```
1. Login to GHL
2. Go to Workflows
3. Find "Missed Call Recovery"
4. Click "Republish"
5. Test again
```

---

### Issue 2: Forwarding Delay Too Long

**Symptoms:**
- Calls take >30 seconds to forward
- Customers hang up before forward
- Low capture rate

**Diagnostic Steps:**
```
1. Check ring time setting
   - Should be 4 rings (20 seconds)
   - If longer, adjust carrier settings
   
2. Test from different locations
   - Test from multiple phones
   - Check if delay is consistent
   
3. Check network latency
   - Run speed test on technician's phone
   - Check carrier coverage in area
```

**Solutions:**

**Solution 1: Reduce Ring Time**
```
Call carrier support:
"Please reduce conditional forwarding ring time to 15 seconds (3 rings)"

Then test forwarding speed
```

**Solution 2: Switch Carrier**
```
If current carrier has poor coverage:
1. Port number to better carrier
2. Set up forwarding on new carrier
3. Test forwarding speed
```

---

## 🤖 AI AGENT ISSUES

### Issue 3: Monitor Agent Not Detecting Issues

**Symptoms:**
- High CPL but no alert
- Forwarding failing but no notification
- Metrics not updating

**Diagnostic Steps:**
```
1. Check agent status
   GET /ai/agents
   - Should show "active"
   
2. Check last run time
   - Should be within last 15-60 minutes
   - If older, agent may be stuck
   
3. Check CloudWatch logs
   - Login to AWS Console
   - Go to CloudWatch → Logs
   - Search for "Monitor Agent"
   - Check for errors
   
4. Check thresholds
   - May be set too high
   - Adjust in dashboard
```

**Solutions:**

**Solution 1: Restart Agent**
```
1. Login to AWS Console
2. Go to Lambda
3. Find "monitor-agent" function
4. Click "Test" to trigger manually
5. Check logs for errors
```

**Solution 2: Adjust Thresholds**
```
1. Login to Business Owner app
2. Go to AI Settings
3. Adjust thresholds:
   - CPL max: $20 → $15 (more sensitive)
   - Forwarding min: 95% → 90% (more sensitive)
4. Save and test
```

**Solution 3: Check API Credentials**
```
1. Login to AWS Console
2. Go to Secrets Manager
3. Verify all API keys are valid:
   - Google Ads API key
   - Twilio API key
   - GHL API key
4. Update if expired
```

---

### Issue 4: Diagnostic Agent Wrong Diagnosis

**Symptoms:**
- Root cause identified incorrectly
- Recommended solution doesn't work
- Issue persists after fix

**Diagnostic Steps:**
```
1. Review diagnostic report
   - Check data used for diagnosis
   - Verify data is accurate
   
2. Check historical data
   - May need more data points
   - Check if trend is real or anomaly
   
3. Manual verification
   - Verify root cause manually
   - Check if diagnosis makes sense
```

**Solutions:**

**Solution 1: Provide More Data**
```
Wait 24-48 hours for more data:
- More Google Ads data
- More call data
- More booking data

Then re-run diagnosis
```

**Solution 2: Manual Override**
```
1. Login to Business Owner app
2. Go to AI Diagnostics
3. Click "Manual Override"
4. Provide correct root cause
5. Agent learns from correction
```

---

### Issue 5: Optimizing Agent Making Wrong Changes

**Symptoms:**
- Auto-fix doesn't improve metrics
- Changes make things worse
- Unintended side effects

**Diagnostic Steps:**
```
1. Check change log
   - What changes were made?
   - When were they made?
   
2. Check impact
   - Did metrics improve or worsen?
   - How long since change?
   
3. Check safety checks
   - Were safety checks bypassed?
   - Should approval be required?
```

**Solutions:**

**Solution 1: Rollback Changes**
```
1. Login to Business Owner app
2. Go to AI Activity Log
3. Find problematic change
4. Click "Rollback"
5. Verify metrics return to normal
```

**Solution 2: Disable Auto-Fix**
```
1. Login to Business Owner app
2. Go to AI Settings
3. Disable "Auto-Fix" for Optimizing Agent
4. Require manual approval for all changes
```

**Solution 3: Adjust Safety Checks**
```
1. Login to AWS Console
2. Go to Lambda → optimizing-agent
3. Update safety check thresholds
4. Redeploy function
```

---

## 📱 MOBILE APP ISSUES

### Issue 6: App Not Receiving Notifications

**Symptoms:**
- Technician not notified of missed calls
- Customer not receiving booking confirmations
- No push notifications

**Diagnostic Steps:**
```
1. Check notification permissions
   - Settings → DrainPro → Notifications
   - Should be "Allowed"
   
2. Check notification settings in app
   - App → Settings → Notifications
   - All should be enabled
   
3. Test notification manually
   - Send test notification from dashboard
   - Should receive within 5 seconds
   
4. Check device settings
   - Do Not Disturb off
   - Battery saver off (can block notifications)
```

**Solutions:**

**Solution 1: Enable Notifications**
```
iOS:
1. Settings → DrainPro
2. Enable "Allow Notifications"
3. Enable "Sounds" and "Badges"

Android:
1. Settings → Apps → DrainPro
2. Enable "Notifications"
3. Set priority to "High"
```

**Solution 2: Reinstall App**
```
1. Uninstall DrainPro app
2. Restart phone
3. Reinstall from App Store/Play Store
4. Login and enable notifications
5. Test notification
```

**Solution 3: Check Backend**
```
1. Login to AWS Console
2. Go to SNS (Simple Notification Service)
3. Check topic subscriptions
4. Verify device token is registered
5. Send test notification
```

---

### Issue 7: App Crashing

**Symptoms:**
- App closes unexpectedly
- App freezes
- Can't complete actions

**Diagnostic Steps:**
```
1. Check app version
   - Should be latest version
   - Update if outdated
   
2. Check device OS
   - iOS 14+ or Android 10+ required
   - Update OS if outdated
   
3. Check crash logs
   - iOS: Settings → Privacy → Analytics
   - Android: Developer options → Bug report
   
4. Check storage space
   - Need at least 500MB free
   - Clear cache if low
```

**Solutions:**

**Solution 1: Update App**
```
1. Go to App Store/Play Store
2. Search "DrainPro"
3. Click "Update"
4. Wait for update to complete
5. Open app and test
```

**Solution 2: Clear Cache**
```
iOS:
1. Delete and reinstall app

Android:
1. Settings → Apps → DrainPro
2. Storage → Clear Cache
3. Restart app
```

**Solution 3: Report Crash**
```
1. Email support@drainpro.com
2. Include:
   - Device model
   - OS version
   - App version
   - Steps to reproduce
   - Screenshot if possible
```

---

## 💳 PAYMENT ISSUES

### Issue 8: Payment Failing

**Symptoms:**
- Customer can't pay
- Card declined
- Payment stuck in "processing"

**Diagnostic Steps:**
```
1. Check card details
   - Correct card number
   - Valid expiration date
   - Correct CVV
   
2. Check Stripe status
   - Login to Stripe dashboard
   - Check payment logs
   - Look for decline reason
   
3. Test with different card
   - Try different card
   - Try different payment method
   
4. Check account status
   - Stripe account active?
   - No holds or restrictions?
```

**Solutions:**

**Solution 1: Retry Payment**
```
1. Ask customer to re-enter card details
2. Verify all information correct
3. Try payment again
4. If fails, try different card
```

**Solution 2: Check Stripe Dashboard**
```
1. Login to Stripe dashboard
2. Find failed payment
3. Check decline reason:
   - Insufficient funds → Ask customer to use different card
   - Card declined → Contact card issuer
   - Fraud prevention → Contact Stripe support
```

**Solution 3: Manual Payment**
```
If online payment fails:
1. Accept cash/check on-site
2. Mark payment as "Cash" in app
3. Issue receipt manually
```

---

## 🔗 INTEGRATION ISSUES

### Issue 9: GHL Workflow Not Triggering

**Symptoms:**
- Webhook received but workflow doesn't start
- No SMS sent
- No actions executed

**Diagnostic Steps:**
```
1. Check workflow status
   - Login to GHL
   - Verify workflow is "Published" (not draft)
   
2. Check trigger conditions
   - Verify trigger matches webhook data
   - Check for typos in trigger
   
3. Check workflow errors
   - GHL → Workflows → Errors tab
   - Look for failed executions
   
4. Test manually
   - Trigger workflow manually
   - Verify it works
```

**Solutions:**

**Solution 1: Republish Workflow**
```
1. Login to GHL
2. Go to Workflows
3. Find problematic workflow
4. Click "Edit"
5. Click "Publish"
6. Test again
```

**Solution 2: Fix Trigger Conditions**
```
1. Edit workflow
2. Check trigger conditions
3. Ensure they match webhook data exactly
4. Example:
   - Trigger: "Phone equals {{phone}}"
   - Webhook: {"phone": "+1234567890"}
   - Must match format exactly
```

**Solution 3: Check Workflow Actions**
```
1. Edit workflow
2. Check each action for errors
3. Common issues:
   - Invalid phone number format
   - Missing required fields
   - API rate limits exceeded
4. Fix errors and republish
```

---

### Issue 10: Google Ads Not Tracking Conversions

**Symptoms:**
- Bookings happening but not showing in Google Ads
- Conversion tracking not working
- Can't optimize campaigns

**Diagnostic Steps:**
```
1. Check conversion tracking setup
   - Google Ads → Tools → Conversions
   - Verify conversion action exists
   
2. Check GCLID capture
   - Verify GCLID being captured from ad clicks
   - Check contact custom fields in GHL
   
3. Check conversion API calls
   - Check logs for conversion API calls
   - Verify API calls succeeding
   
4. Check conversion delay
   - Conversions may take 24-48 hours to show
   - Check historical data
```

**Solutions:**

**Solution 1: Verify GCLID Capture**
```
1. Click on Google Ad
2. Check URL has gclid parameter
3. Verify GHL captures gclid
4. Check contact custom fields
5. Should see: gclid = "abc123..."
```

**Solution 2: Test Conversion API**
```
1. Create test booking
2. Check logs for conversion API call
3. Verify API call successful
4. Check Google Ads after 24 hours
```

**Solution 3: Reconfigure Conversion Tracking**
```
1. Google Ads → Tools → Conversions
2. Create new conversion action
3. Update conversion API code
4. Test with new conversion
```

---

## 📊 DATA SYNC ISSUES

### Issue 11: Data Not Syncing Between Systems

**Symptoms:**
- Contact in GHL but not in mobile app
- Booking in app but not in GHL
- Metrics not updating

**Diagnostic Steps:**
```
1. Check API logs
   - Look for failed API calls
   - Check error messages
   
2. Check data timestamps
   - When was data created?
   - When was last sync?
   
3. Test sync manually
   - Trigger sync from dashboard
   - Verify data appears
   
4. Check network connectivity
   - All systems online?
   - No network issues?
```

**Solutions:**

**Solution 1: Force Sync**
```
1. Login to Business Owner app
2. Go to Settings → Data Sync
3. Click "Force Sync Now"
4. Wait 1-2 minutes
5. Verify data synced
```

**Solution 2: Check API Credentials**
```
1. Verify all API keys valid
2. Check API rate limits not exceeded
3. Test API calls manually
4. Update credentials if needed
```

**Solution 3: Clear Cache**
```
1. Mobile app: Logout and login
2. Dashboard: Hard refresh (Ctrl+Shift+R)
3. Check data again
```

---

## 🚨 EMERGENCY PROCEDURES

### System Down

**If entire system is down:**
```
1. Check status page: https://status.drainpro.com
2. If down, we're already working on it
3. Estimated resolution time shown on status page
4. Temporary workaround:
   - Answer calls manually
   - Use backup phone number
   - Log leads in spreadsheet
   - We'll sync data when system restored
```

### Critical Data Loss

**If data appears lost:**
```
1. DON'T PANIC - we have backups
2. Email support@drainpro.com immediately
3. Include:
   - What data is missing
   - When you last saw it
   - What actions you took before noticing
4. We'll restore from backup within 1 hour
```

### Security Breach

**If you suspect unauthorized access:**
```
1. Change password immediately
2. Revoke all API keys
3. Email security@drainpro.com
4. We'll investigate and secure account
5. We'll notify you of findings
```

---

## 📞 GETTING HELP

### Self-Service Resources

**Documentation:**
- Full docs: https://docs.drainpro.com
- Video tutorials: https://youtube.com/drainpro
- FAQ: https://help.drainpro.com

**Community:**
- Forum: https://community.drainpro.com
- Facebook group: DrainPro Users
- Monthly webinars: Register at drainpro.com/webinars

### Contact Support

**Email Support:**
- General: support@drainpro.com
- Technical: tech@drainpro.com
- Billing: billing@drainpro.com
- Security: security@drainpro.com

**Response Times:**
- Critical (system down): 15 minutes
- High (major feature broken): 2 hours
- Medium (minor issue): 24 hours
- Low (question): 48 hours

**Phone Support:**
- Emergency only: +1-800-DRAINPRO
- Available 24/7 for critical issues

**Live Chat:**
- Available in Business Owner app
- Monday-Friday 9 AM - 5 PM EST

---

## 📋 DIAGNOSTIC CHECKLIST

**Before contacting support, please check:**

```
☐ System status page (https://status.drainpro.com)
☐ This troubleshooting guide
☐ Recent changes you made
☐ Error messages (screenshot if possible)
☐ Steps to reproduce issue
☐ When issue started
☐ How many users affected
☐ Workarounds attempted
```

**When contacting support, include:**
- Account ID
- Description of issue
- Steps to reproduce
- Screenshots/videos
- Error messages
- What you've tried
- Urgency level

---

**Last Updated:** December 6, 2025  
**Version:** 1.0  
**Support:** support@drainpro.com

