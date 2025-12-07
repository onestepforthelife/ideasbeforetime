# ☁️ CLOUDFLARE DEPLOYMENT RULES
## Automated Prevention System

**Created:** December 7, 2025  
**Purpose:** Prevent deployment issues like 308 redirects, large files, wrong syntax  
**Status:** ACTIVE - Automated via hooks

---

## 🎯 GOLDEN RULE #48: VERIFY BEFORE EVERY PUSH

**BEFORE pushing to GitHub:**
```bash
node VERIFY_BEFORE_PUSH.js
```

**This automatically checks:**
1. ✅ File sizes (<20MB) - prevents deployment failures
2. ✅ _redirects syntax - prevents wrong configuration
3. ✅ Critical files exist - prevents broken site
4. ✅ Reminds about post-push actions

**Exit code:**
- 0 = Safe to push ✅
- 1 = Issues found, fix first ❌

---

## 📋 AUTOMATED CHECKLIST

### BEFORE PUSH (Automated):
```
☐ Run: node VERIFY_BEFORE_PUSH.js
☐ Fix any critical issues found
☐ Re-run until exit code 0
☐ Then push to GitHub
```

### AFTER PUSH (Manual - 5 minutes):
```
☐ Check Cloudflare build logs (30 sec)
   → Dashboard → Deployments → Latest → Build log
   → Look for errors, warnings, file size issues

☐ Purge Cloudflare cache (MANDATORY!)
   → Dashboard → Caching → Purge Everything
   → Confirm

☐ Wait 5-10 minutes for cache propagation
   → Cache propagates to all edge servers worldwide
   → Don't test immediately!

☐ Test live site
   → Run: node COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js
   → Should show: 0 critical issues
   → All pages should return 200 OK
```

---

## 🚨 COMMON ISSUES & FIXES

### Issue 1: 308 Permanent Redirect
**Cause:** Cloudflare cache not purged  
**Fix:** Purge cache → Wait 5-10 min → Test  
**Prevention:** Always purge after deployment

### Issue 2: File Too Large (>25MB)
**Cause:** Large file in repository  
**Fix:** Delete or move to external storage  
**Prevention:** Run VERIFY_BEFORE_PUSH.js before commit

### Issue 3: Wrong _redirects Syntax
**Cause:** Using 200 status codes or wrong format  
**Fix:** Use correct format: `[source] [destination] [code]`  
**Prevention:** Read Cloudflare docs, use VERIFY_BEFORE_PUSH.js

### Issue 4: Build Failed
**Cause:** Various (dependencies, config, file size)  
**Fix:** Check build logs FIRST (30 seconds)  
**Prevention:** Always check build logs after push

---

## 📖 _REDIRECTS FILE RULES

### ✅ CORRECT Format:
```
# Redirect old page to new page
/old-page /new-page 301

# Redirect to external site
/twitter https://twitter.com/username 302

# Wildcard redirect
/blog/* /articles/:splat 301
```

### ❌ WRONG Format:
```
/*.html 200    ← WRONG! (200 is not a redirect)
/* 200         ← WRONG! (not redirect syntax)
```

### 💡 Remember:
- `_redirects` is for REDIRECTS (301/302) only
- NOT for serving files (that's automatic)
- Cloudflare Pages serves .html files automatically
- No configuration needed for normal pages
- Format: `[source] [destination] [code]`

---

## 🔄 AUTOMATION SYSTEM

### 1. Kiro Hook (Automatic)
**File:** `.kiro/hooks/pre-push-verification.json`

**Triggers when you say:**
- "push"
- "upload"
- "deploy"
- "commit"

**Action:** Runs `node VERIFY_BEFORE_PUSH.js` automatically

### 2. Verification Script
**File:** `VERIFY_BEFORE_PUSH.js`

**Checks:**
- File sizes (<20MB)
- _redirects syntax
- Critical files exist
- Reminds about post-push actions

### 3. Live Site Check
**File:** `COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js`

**Tests:**
- All critical pages load (200 OK)
- No 308 redirects
- Navigation/footer present
- Tools functionality works

---

## 📚 DOCUMENTATION REFERENCES

### Cloudflare Pages Redirects:
- URL: https://developers.cloudflare.com/pages/configuration/redirects/
- Format: `[source] [destination] [code]`
- Limits: 2,000 static + 100 dynamic redirects
- File: `_redirects` (no extension)

### Cloudflare Pages Deployment:
- File size limit: 25MB per file
- Build logs: Dashboard → Deployments → Build log
- Cache: Dashboard → Caching → Purge Everything
- Propagation: 5-10 minutes worldwide

---

## 🎯 PREVENTION CHECKLIST

**To prevent 308 redirects:**
```
☐ Always purge cache after deployment
☐ Wait 5-10 minutes for propagation
☐ Test live site after propagation
☐ Don't use wrong _redirects syntax
```

**To prevent deployment failures:**
```
☐ Run VERIFY_BEFORE_PUSH.js before commit
☐ Keep files under 20MB
☐ Check build logs after push
☐ Fix issues immediately
```

**To prevent wrong configuration:**
```
☐ Read official Cloudflare documentation
☐ Don't guess syntax
☐ Understand what features are FOR
☐ Test on live site after changes
```

---

## 🚀 WORKFLOW SUMMARY

### Complete Deployment Workflow:
```
1. Make changes to files
2. Run: node VERIFY_BEFORE_PUSH.js
3. Fix any issues found
4. Push to GitHub
5. Check Cloudflare build logs (30 sec)
6. Purge Cloudflare cache (MANDATORY!)
7. Wait 5-10 minutes
8. Run: node COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js
9. Verify: 0 critical issues ✅
```

**Total time:** 15-20 minutes (including wait time)  
**Result:** Zero deployment issues, all pages working

---

## 📊 SUCCESS METRICS

**Good Deployment:**
- ✅ VERIFY_BEFORE_PUSH.js passes (exit code 0)
- ✅ Build logs show success
- ✅ Cache purged immediately
- ✅ Waited 5-10 minutes
- ✅ Live site check: 0 critical issues
- ✅ All pages return 200 OK

**Bad Deployment:**
- ❌ Skipped verification
- ❌ Didn't check build logs
- ❌ Forgot to purge cache
- ❌ Tested immediately (cache not propagated)
- ❌ 308 redirects on live site
- ❌ Users cannot access pages

---

**Status:** ACTIVE - Automated via Kiro hooks  
**Priority:** CRITICAL - Prevents all deployment issues  
**Automation:** Pre-push verification + Post-push checklist  
**Result:** Zero deployment failures, professional quality

**REMEMBER: Automate prevention, not just detection!**
