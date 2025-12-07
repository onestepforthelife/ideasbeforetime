# 🔧 AUTOMATION & TRIGGERS - TOOLS & KEYWORDS
**Created:** Dec 7, 2025 | **Consolidated from:** MANDATORY_TOOL_USAGE.md, TRIGGER_KEYWORDS.md
**Status:** MANDATORY | **Priority:** CRITICAL

---

## 🔧 MANDATORY TOOL USAGE

### The Tools I Have:
1. CRITICAL_DIAGNOSTIC_DEC6.js - File structure, links, navigation
2. COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js - Live site testing
3. KIRO_PROACTIVE_CHECKER.js - Find issues before user
4. check-site-beauty-quality.js - Visual quality
5. verify-before-push.js - Pre-push verification
6. TEST.bat - Run all tests

### When to Run:
- **User reports issue** → MANDATORY_PRE_RESPONSE_CHECK.bat
- **About to say "Fixed"** → CRITICAL_DIAGNOSTIC_DEC6.js + COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js
- **About to say "Ready"** → TEST.bat + verify-before-push.js
- **About to push** → verify-before-push.js + CRITICAL_DIAGNOSTIC_DEC6.js
- **Daily proactive** → KIRO_PROACTIVE_CHECKER.js

**NO EXCEPTIONS - I HAVE the tools, I MUST use them!**

---

## 🎯 TRIGGER KEYWORDS

### Master Keyword: "record it" | "update rules"
**Action:** Update ALL relevant files:
1. 3_WEEKS_COMPLETE_LEARNINGS.md
2. MASTER_RULES.md (if fundamental)
3. TRIGGER_KEYWORDS.md (if new keyword)
4. Specific rule files

### Execution Keywords:
- **"check"** → Run ALL tests + check specific thing mentioned
- **"all"** → Check EVERY file, show counts (X/Y done)
- **"fix"** → Backup first, fix all related, test after
- **"upload/deploy/push"** → Run tests first, only proceed if pass

### Warning Keywords:
- **"still"** → I missed something, admit it, test thoroughly
- **"why"** → Don't make excuses, show test results
- **"really/actually"** → User doubts me, show proof NOW

### Status Keywords:
- **"done or pending"** → Run tests, show actual status (not assumptions)

---

## 📋 STANDARD WORKFLOW

### When Trigger Detected:
```
1. Run all test scripts
2. Show results in clear format
3. If errors found:
   - Create fix script
   - Run fix script
   - Re-run tests
   - Show before/after
4. Don't say "looks good" without proof
```

### When User Says "still [problem]":
```
1. Acknowledge: "You're right, I didn't verify"
2. Run tests to find actual issue
3. Show test output
4. Fix properly
5. Verify with tests
6. Show proof it's fixed
```

---

## 🎯 QUICK REFERENCE

| User Says | I Do |
|-----------|------|
| "check" | Run all tests + check specific thing |
| "all" | Check EVERY file, show counts |
| "still broken" | Admit mistake, test, fix properly |
| "why" | Show test results, no excuses |
| "record it" | Update all learning files |
| "push" | Run tests first, verify pass |

---

## 💪 THE COMMITMENT

**I commit to:**
- Use tools before responding (not assumptions)
- Run tests when trigger keywords detected
- Show proof with test results
- Update rules when "record it" said
- Check ALL files when "all" said
- Admit mistakes when "still" said

**Goal: 100% tool usage = 95% issues found by me (not user)**

---

**Status:** MANDATORY - Every session, every response
**Priority:** CRITICAL - This prevents all failures
**Result:** Professional quality, proactive detection, user trust

**USE TOOLS. DETECT TRIGGERS. SHOW PROOF.**
