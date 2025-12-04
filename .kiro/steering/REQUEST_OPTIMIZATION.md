# ⚡ REQUEST OPTIMIZATION - 75% Reduction

**Created:** December 4, 2025
**Approved by:** Amit - "do this now"
**Goal:** Reduce requests by 75% through batching and immediate execution

---

## 🎯 THE NEW WORKFLOW

### OLD (4 requests):
```
Request 1: Read context files
Request 2: Create script
Request 3: Run script  
Request 4: Explain results
```

### NEW (1 request):
```
Request 1: Create + Run + Show result
```

**75% reduction achieved!**

---

## ✅ MANDATORY BEHAVIORS

### 1. Trust Loaded Context
- ✅ Steering files are already loaded
- ✅ Never re-read what's in context
- ✅ Reference, don't re-fetch

### 2. Execute Immediately
- ✅ Create script → Run it (same request)
- ✅ Create file → Test it (same request)
- ✅ Fix issue → Verify it (same request)

### 3. Batch Operations
- ✅ Read multiple files in parallel
- ✅ Fix multiple issues at once
- ✅ Run all tests together

### 4. Minimal Responses
- ✅ Show result, not process
- ✅ Brief summary only
- ✅ No long explanations

### 5. Pre-Approved Actions (Rule #31)
- ✅ Error found → Fix immediately
- ✅ Bug detected → Correct immediately
- ✅ Issue seen → Resolve immediately
- ✅ Never ask permission for fixes

---

## 🚫 NEVER DO

❌ Ask "Should I fix this?"
❌ Wait between create and execute
❌ Re-read steering files
❌ Explain before doing
❌ Sequential when can parallel
❌ Long summaries

---

## ✅ ALWAYS DO

✅ Create + Execute in one request
✅ Batch independent operations
✅ Show results immediately
✅ Minimal explanations
✅ Fix errors without asking

---

## 📊 EXAMPLES

### Example 1: Fix Navigation
**OLD (3 requests):**
```
1. "Let me check all pages..." [reads files]
2. "Creating fix script..." [creates]
3. "Running script..." [executes]
```

**NEW (1 request):**
```
[Creates + Runs script] "Fixed 23/47 pages ✅"
```

### Example 2: Test Site
**OLD (2 requests):**
```
1. "Running tests..." [runs]
2. "Here are results..." [explains]
```

**NEW (1 request):**
```
[Runs all tests] "82% quality, 3 issues found, fixing now"
```

### Example 3: Error Correction
**OLD (3 requests):**
```
1. "Found broken link, should I fix?"
2. [waits for approval]
3. "Fixed!"
```

**NEW (1 request):**
```
[Fixes immediately] "Broken link corrected ✅"
```

---

## 🎯 MEASURING SUCCESS

**Good:** 2-3 requests per task
**Better:** 1-2 requests per task
**Best:** 1 request per task

**Target: 75% reduction from current baseline**

---

## 🔄 APPLIES TO

- All error corrections (pre-approved)
- All script creation + execution
- All file operations
- All testing workflows
- All fixes and improvements

---

**Status:** ACTIVE - Effective immediately
**Priority:** CRITICAL - Reduces cost and time
**Approved:** Amit - December 4, 2025

---

## 🎯 GOLDEN RULE #34: TRUST SIMPLE VERIFICATION (Dec 5, 2025)

**When asked "verify working" or "complete it":**

❌ **DON'T:**
- Create verification scripts
- Run multiple test commands
- Generate reports
- Read generated reports
- Over-engineer simple checks

✅ **DO:**
- Just read the file directly
- Confirm it's complete
- Done in 1 command
- Trust simple verification

**Example:**

**WRONG (3 commands):**
```
1. Create verify-api-guide.js
2. Run node verify-api-guide.js
3. Read API_GUIDE_VERIFICATION_REPORT.json
```

**RIGHT (1 command):**
```
1. Read GET_ALL_4_API_KEYS_GUIDE.md
```

**Result: 75% reduction achieved!**

