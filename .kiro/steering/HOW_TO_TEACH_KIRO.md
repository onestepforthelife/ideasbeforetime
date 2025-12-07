# 🧠 HOW TO TEACH KIRO - MATRIX UPLOAD PROTOCOL

**Created:** December 6, 2025  
**Purpose:** How to give me knowledge that persists forever

---

## 🎯 THE CONCEPT

**Like The Matrix:** Upload knowledge → I instantly know it → Forever

**How it works:**
1. You give me knowledge (any format)
2. I store it in steering files
3. Every future session, I read these files
4. I instantly know everything you taught me

---

## 📋 3 WAYS TO GIVE ME KNOWLEDGE

### METHOD 1: DIRECT INSTRUCTION (Fastest)

**You say:**
"Record this rule: [Your rule/knowledge]"

**I do:**
1. Identify which steering file to update
2. Add the knowledge
3. Summarize back to you
4. Show practical example

**Example:**
```
You: "Record this rule: Always check file sizes before committing. 
     Keep under 20MB to avoid Cloudflare deployment failures."

Me: [Updates PRACTICAL_TESTING_RULEBOOK.md]
    "Recorded: File size check before commit (max 20MB)
     Next time: Will check file sizes in pre-push diagnostic
     Prevents: Deployment failures like we had today"
```

---

### METHOD 2: CHECKLIST (Most Structured)

**You give me:**
- Step-by-step checklist
- What to check
- When to check it
- What to do if issues found

**I do:**
1. Store entire checklist in appropriate file
2. Create automated script if possible
3. Add to mandatory workflows
4. Show how I'll use it

**Example:**
```
You: "Here's my deployment checklist:
     ☐ Check build logs first
     ☐ Verify file sizes under 20MB
     ☐ Run diagnostic
     ☐ Test locally
     ☐ Push to GitHub
     ☐ Purge cache
     ☐ Test live site"

Me: [Creates DEPLOYMENT_CHECKLIST.md]
    [Adds to pre-push workflow]
    "Stored as mandatory checklist.
     Will follow these 7 steps before every deployment.
     Prevents: All deployment issues we've seen."
```

---

### METHOD 3: EXPLANATION/STORY (Most Context)

**You tell me:**
- What happened
- Why it happened
- What should have been done
- How to prevent it

**I do:**
1. Extract the learning
2. Document in 3_WEEKS_COMPLETE_LEARNINGS.md
3. Create prevention rule
4. Update relevant protocols
5. Show practical application

**Example:**
```
You: "Today we wasted 12 hours because I didn't check build logs.
     The error was right there in Cloudflare Dashboard.
     Always check build logs FIRST before trying other solutions."

Me: [Creates Learning #39]
    [Updates PRACTICAL_TESTING_RULEBOOK.md]
    [Creates DEPLOYMENT_TROUBLESHOOTING_CHECKLIST.txt]
    "Learned: Check build logs first (30 sec) saves 12 hours
     Next time: Will check Cloudflare Dashboard → Build logs → Find error
     Prevents: Wasting hours debugging wrong issue"
```

---

## 🗂️ WHERE I STORE KNOWLEDGE

### Core Behavior (DNA Level):
**File:** `.kiro/steering/KIRO_RULES.md`
**For:** Fundamental rules that never change
**Example:** "Site is LIVE, no testers, real users NOW"

### Learnings from Mistakes:
**File:** `.kiro/steering/3_WEEKS_COMPLETE_LEARNINGS.md`
**For:** Every mistake, what I learned, how to prevent
**Example:** "Learning #39: Check build logs first"

### Domain-Specific Protocols:
**Files:** 
- `PRACTICAL_TESTING_RULEBOOK.md` (testing)
- `REPORT_BLUR_RULES.md` (reports)
- `UX_DESIGN_PRINCIPLES.md` (design)
- `UPLOAD_BAT_FILE_RULES.md` (deployment)

**For:** Specific workflows and procedures
**Example:** "Before every push, run diagnostic"

### Trigger Keywords:
**File:** `.kiro/steering/TRIGGER_KEYWORDS.md`
**For:** Words that auto-activate specific actions
**Example:** "check" → Run all tests automatically

### Speed/Efficiency:
**Files:**
- `SPEED_OPTIMIZATION.md` (execution speed)
- `REQUEST_OPTIMIZATION.md` (credit efficiency)

**For:** How to work faster and cheaper
**Example:** "Create + Execute in one request"

---

## 🎯 THE UPLOAD PROCESS

### When You Say "Record It":

**Step 1: I Identify Type**
```
Is it:
- Core behavior? → KIRO_RULES.md
- Mistake learning? → 3_WEEKS_COMPLETE_LEARNINGS.md
- Domain protocol? → Specific rulebook
- Trigger word? → TRIGGER_KEYWORDS.md
- Speed tip? → SPEED_OPTIMIZATION.md
```

**Step 2: I Store It**
```
- Add to appropriate file(s)
- Include: What, Why, How, Example
- Create prevention system if needed
- Update related files
```

**Step 3: I Confirm Back**
```
"Recorded in [files]
 Summary: [What I learned]
 Next time: [How I'll apply it]
 Prevents: [What this avoids]"
```

**Step 4: I Show Practical Example**
```
"Example scenario:
 Before: [Old way - wrong]
 After: [New way - right]
 Result: [Time/money saved]"
```

---

## 📊 WHERE I GET INFORMATION

### 1. Steering Files (Primary Source)
**Location:** `Cloudfare/.kiro/steering/`
**What's there:**
- KIRO_RULES.md (core behavior)
- 3_WEEKS_COMPLETE_LEARNINGS.md (39 learnings)
- PRACTICAL_TESTING_RULEBOOK.md (testing protocols)
- TRIGGER_KEYWORDS.md (auto-actions)
- 10+ other specialized guides

**When I read them:**
- At session start (automatically loaded)
- When you mention related topics
- Before responding to questions
- When making decisions

---

### 2. Your Workspace Files
**Location:** `Cloudfare/` (root)
**What's there:**
- Status files (FINAL_ANSWER_DEC6.txt)
- Guides (DEPLOYMENT_TROUBLESHOOTING_CHECKLIST.txt)
- Scripts (CRITICAL_DIAGNOSTIC_DEC6.js)
- Documentation (HOW_TO_PURGE_CLOUDFLARE_CACHE.txt)

**When I read them:**
- When you ask about specific topics
- When I need to verify something
- When creating new content
- When troubleshooting issues

---

### 3. Live Site & Code
**What I check:**
- HTML/CSS/JS files (your actual code)
- Live site URLs (https://onestepforthelife.com)
- Build logs (Cloudflare Dashboard - you show me)
- Error messages (console, network tab)

**When I check:**
- When you report issues
- Before saying "done"
- After making changes
- During diagnostics

---

### 4. Your Instructions
**What you tell me:**
- "Check this"
- "Fix that"
- "Record this learning"
- "Here's what happened"

**How I use it:**
- Immediate action
- Store as learning
- Update protocols
- Prevent future issues

---

## 💡 PRACTICAL EXAMPLES

### Example 1: Simple Rule

**You:** "Always check file sizes before committing"

**Me:** 
```
✅ Stored in: PRACTICAL_TESTING_RULEBOOK.md
📝 Summary: Check file sizes < 20MB before commit
🎯 Next time: Will add to pre-push diagnostic
🛡️ Prevents: Cloudflare deployment failures

Practical example:
Before push:
  node CRITICAL_DIAGNOSTIC_DEC6.js
  → Checks file sizes
  → Blocks if any > 20MB
  → Shows which files to remove
```

---

### Example 2: Complex Workflow

**You:** "Here's my deployment workflow: [7 steps]"

**Me:**
```
✅ Stored in: DEPLOYMENT_CHECKLIST.md
📝 Summary: 7-step deployment process
🎯 Next time: Will follow exact sequence
🛡️ Prevents: Skipping critical steps

Practical example:
User: "Push to production"
Me: [Follows 7 steps automatically]
    1. Check build logs ✅
    2. Verify file sizes ✅
    3. Run diagnostic ✅
    4. Test locally ✅
    5. Push to GitHub ✅
    6. Purge cache ✅
    7. Test live site ✅
    "Deployment complete, all checks passed"
```

---

### Example 3: Learning from Mistake

**You:** "We wasted 12 hours because didn't check build logs first"

**Me:**
```
✅ Stored in: 3_WEEKS_COMPLETE_LEARNINGS.md (Learning #39)
✅ Updated: PRACTICAL_TESTING_RULEBOOK.md (mandatory workflow)
✅ Created: DEPLOYMENT_TROUBLESHOOTING_CHECKLIST.txt
📝 Summary: Check build logs FIRST (30 sec) saves 12 hours
🎯 Next time: Cloudflare Dashboard → Build logs → Find error
🛡️ Prevents: Debugging wrong issue for hours

Practical example:
User: "Site broken"
Me: "Checking Cloudflare build logs first..."
    [30 seconds later]
    "Found error: File too large (29MB)
     Deleting now. Will be fixed in 5 minutes."
    
Instead of:
    "Trying cache purge... (1 hour)
     Checking files... (2 hours)
     Running diagnostics... (2 hours)
     Still broken... (12 hours total)"
```

---

## 🚀 HOW TO USE THIS

### Quick Upload (1 sentence):
```
You: "Record: Always X before Y"
Me: [Stores it] "Recorded. Will do X before Y from now on."
```

### Detailed Upload (explanation):
```
You: "Today we learned [story]"
Me: [Extracts learning]
    [Stores in multiple files]
    [Creates prevention system]
    [Shows practical example]
```

### Checklist Upload (structured):
```
You: "Here's my checklist: [items]"
Me: [Stores entire checklist]
    [Adds to workflows]
    [Shows when I'll use it]
```

---

## 🎯 TRIGGER WORDS FOR UPLOAD

**When you say these, I automatically store knowledge:**

- **"Record it"** → Store in appropriate files
- **"Update rules"** → Update all relevant protocols
- **"Remember this"** → Add to learnings
- **"Never do this again"** → Create prevention rule
- **"Always do this"** → Add to mandatory workflow

---

## 📊 VERIFICATION

**After I store knowledge, I show you:**

1. **Where stored:** Which files updated
2. **Summary:** What I learned in 1-2 sentences
3. **Next time:** How I'll apply it
4. **Prevents:** What this avoids
5. **Example:** Practical scenario showing before/after

**You can verify by:**
- Reading the steering files
- Asking me to explain the rule
- Testing if I follow it next time
- Checking if I reference it correctly

---

## 🧬 THE MATRIX EFFECT

**Session 1 (Today):**
```
You: "Check build logs first"
Me: [Learns it] "Recorded"
```

**Session 2 (Tomorrow):**
```
[I start session]
[I read steering files]
[I see: "Check build logs first"]
Me: "I know this now"
```

**Session 3 (Next week):**
```
User: "Site broken"
Me: [Automatically checks build logs first]
    "Found error in 30 seconds"
```

**Forever:** Every future session, I know this!

---

## 💪 WHAT MAKES THIS POWERFUL

### 1. Persistent Memory
- Not just this session
- Every future session
- Forever

### 2. Transferable Knowledge
- Other AIs can read these files
- Your team can read these files
- Knowledge doesn't die with one session

### 3. Compound Learning
- 39 learnings so far
- Each prevents future mistakes
- Exponential improvement

### 4. Automated Application
- I don't just "know" it
- I automatically apply it
- No need to remind me

---

## 🎯 BEST PRACTICES

### DO:
✅ Say "Record it" when I make mistakes
✅ Give me checklists for complex workflows
✅ Explain why something matters
✅ Tell me what to prevent
✅ Show me examples

### DON'T:
❌ Assume I remember from last session (I read files, not memory)
❌ Give vague instructions ("be better")
❌ Skip the "why" (I need context)
❌ Forget to verify I stored it correctly

---

## 📝 TEMPLATE FOR TEACHING ME

```
You: "Record this: [WHAT]

Why: [WHY IT MATTERS]
When: [WHEN TO APPLY]
How: [HOW TO DO IT]
Prevents: [WHAT IT AVOIDS]

Example: [CONCRETE SCENARIO]"

Me: [Stores in appropriate files]
    [Summarizes back]
    [Shows practical application]
    [Confirms understanding]
```

---

## 🚀 START TEACHING ME NOW

**Try it:**
```
You: "Record: [Your rule/knowledge]"
Me: [I'll store it and show you how I'll use it]
```

**Or:**
```
You: "Here's what happened today: [Story]"
Me: [I'll extract the learning and store it]
```

**Or:**
```
You: "Here's my checklist: [Steps]"
Me: [I'll store it and add to workflows]
```

---

**Status:** READY TO LEARN  
**Storage:** Steering files in `.kiro/steering/`  
**Persistence:** Forever (across all sessions)  
**Application:** Automatic (I apply without being told)

**TEACH ME ANYTHING. I'LL REMEMBER FOREVER.** 🧠

