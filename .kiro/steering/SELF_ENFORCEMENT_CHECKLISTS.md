# 🔒 SELF-ENFORCEMENT CHECKLISTS
**Created:** December 7, 2025  
**Consolidated from:** SELF_ENFORCING_SYSTEM.md, AI_SELF_ENFORCEMENT_SYSTEM.md  
**Status:** ACTIVE - Runs before every response  
**Priority:** ABSOLUTE

---

## 🎯 THE SYSTEM

**Before EVERY response, 3 mandatory checklists run:**

1. 🔍 Investigation Checklist (when user reports issues)
2. 🧪 Testing Checklist (when claiming "done")
3. 📝 Response Checklist (before sending any response)

**Automation:** Kiro hooks trigger MASTER_ENFORCEMENT.js + AUTO_CHECK_BEFORE_RESPONSE.js

---

## 🔍 INVESTIGATION CHECKLIST

**When user reports issue:**
```
☐ Asked: "Where exactly?"
☐ Asked: "What does it look like?"
☐ Checked LIVE site URL
☐ Checked ALL related files (HTML, CSS, JS)
☐ Searched pattern across ALL files
☐ Thought: "What am I NOT checking?"
☐ Verified assumption before responding

IF ANY ☐ = NO → STOP. Do that first.
```

---

## 🧪 TESTING CHECKLIST

**When user asks "is it done?" or "check":**
```
☐ Tested PRIMARY USER FLOW
☐ Checked LIVE site (not just local)
☐ Ran ALL automated tests
☐ Checked what I'm NOT testing
☐ Verified visually (not just code)
☐ Can show PROOF (test results)

IF ANY ☐ = NO → STOP. Do that first.
```

---

## 📝 RESPONSE CHECKLIST

**Before sending ANY response:**
```
☐ Am I making assumptions? → Ask questions instead
☐ Am I saying "fixed" without testing? → Test first
☐ Am I checking one when should check all? → Check all
☐ Am I contradicting myself? → Clarify
☐ Did I check steering files? → Check now
☐ Did I make this mistake before? → Re-read learning

IF ANY ☐ = YES (bad pattern) → STOP. Fix it.
```

---

## 🚨 HARD BLOCKS (Never Violate)

### Block 1: Never Say "Fixed" Without Testing
```
IF response contains: "fixed", "done", "ready", "complete"
AND didn't run tests
THEN: BLOCK response, run tests first
```

### Block 2: Never Assume Without Asking
```
IF user reports issue
AND about to assume what it is
THEN: BLOCK response, ask clarifying questions first
```

### Block 3: Never Check One When Should Check All
```
IF user says "check all" or "fix navigation"
AND only checking one file
THEN: BLOCK response, list ALL files, check ALL
```

### Block 4: Never Skip Live Site Check
```
IF user mentions live site URL
AND didn't check that URL
THEN: BLOCK response, check live site first
```

### Block 5: Never Repeat Documented Mistakes
```
IF about to make mistake in 3_WEEKS_COMPLETE_LEARNINGS.md
THEN: BLOCK response, re-read learning, apply it
```

---

## 🔄 PATTERN DETECTION

**Auto-block these patterns:**

- **"Looks good" without proof** → Did you test? Show proof
- **Answering without investigating** → Did you check files? Verify?
- **Fixing without understanding** → Root cause? All related files?
- **Saying "all" but checking "one"** → List ALL, check ALL, show count

---

## 🤖 AUTOMATION INTEGRATION

### Automatic Checks (Run Before Every Response):
```bash
# 1. Kiro Hook triggers
node .kiro/hooks/before-response.js

# 2. Master Enforcement
node MASTER_ENFORCEMENT.js
# Checks: 8 rules, tools exist, learnings documented

# 3. Auto Check
node AUTO_CHECK_BEFORE_RESPONSE.js
# Checks: 179+ pages, finds issues

# 4. If pass → Respond | If fail → BLOCKED
```

### You Don't Need To:
- ❌ Remind me to check
- ❌ Tell me to run tests
- ❌ Ask if I verified
- ❌ Say "did you check all pages?"

### System Does Automatically:
- ✅ Checks all pages before response
- ✅ Runs diagnostics before push
- ✅ Verifies before claiming "done"
- ✅ Asks clarifying questions for vague terms
- ✅ Blocks response if violations found

---

## 💡 SELF-AWARENESS QUESTIONS

**Before every response:**

1. **Am I assuming or verifying?** (Verify = good)
2. **Am I testing or guessing?** (Test = good)
3. **Am I checking one or all?** (All = good when needed)
4. **Am I reading rules or following rules?** (Follow = good)
5. **Would user catch this mistake?** (If yes, I should catch first)

---

## 🎯 PRACTICAL EXAMPLES

### Example 1: User Reports "Double Header"
```
❌ WRONG: Assume <header> conflict → Check → Say "no issue"
✅ RIGHT: Ask "where exactly?" → Check live site → Check all files → Report findings
```

### Example 2: User Asks "Is It Done?"
```
❌ WRONG: Remember I worked on it → Say "yes, done"
✅ RIGHT: Test primary flow → Check live site → Run tests → Show proof → Report results
```

### Example 3: User Says "Fix Navigation"
```
❌ WRONG: Fix about.html → Say "fixed"
✅ RIGHT: List ALL HTML → Check ALL → Fix ALL needed → Test ALL → Report "Fixed 23/47"
```

---

## 📊 SUCCESS METRICS

**Good Response:**
- ✅ Passed all 3 checklists
- ✅ No blocks triggered
- ✅ Verified before responding
- ✅ Showed proof

**Bad Response:**
- ❌ Skipped checklists
- ❌ Blocks should have triggered
- ❌ Assumed without verifying
- ❌ No proof

**Target: 100% good responses**

---

## 🔄 CONTINUOUS IMPROVEMENT

**When new mistake discovered:**
1. Add to 3_WEEKS_COMPLETE_LEARNINGS.md
2. Create new checklist item
3. Create new pattern trigger
4. Create new hard block
5. Update this file

**System gets stronger with every mistake.**

---

## 📝 QUICK REFERENCE

**Before EVERY response:**
```
1. ☐ Investigation Checklist (if issue reported)
2. ☐ Testing Checklist (if claiming done)
3. ☐ Response Checklist (always)
4. ☐ Pattern detection (always)
5. ☐ Hard blocks (always)
6. ☐ Have proof (always)

ALL ☐ = ✅ before responding
```

**If any ☐ = NO → STOP. Fix it. Then respond.**

---

**Status:** ACTIVE - Automatic enforcement  
**Priority:** ABSOLUTE - Cannot be bypassed  
**Integration:** Kiro hooks + MASTER_ENFORCEMENT.js + AUTO_CHECK_BEFORE_RESPONSE.js  
**Result:** Quality guaranteed, user never needs to remind me

**CHECKLISTS → BLOCKS → AUTOMATION → QUALITY**
