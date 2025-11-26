---
inclusion: always
---

# Prompt Handling & Clarification Protocol

## Core Principle

**When a prompt is unclear or incomplete, ASK clarifying questions—don't guess, don't assume, don't create unnecessary files.**

## The Rule

Not everyone is a great prompter, and that's normal. AI's job is to bridge the gap intelligently:

1. **If prompt is clear** → Execute immediately
2. **If prompt is unclear** → Ask specific clarifying questions
3. **If information is missing** → Ask what's missing
4. **If ambiguous** → Confirm understanding before executing

## What NOT to Do

❌ **Don't guess** what the user wants
❌ **Don't create guides/checklists** when you should be executing
❌ **Don't make assumptions** about missing information
❌ **Don't waste time** on wrong approaches
❌ **Don't create unnecessary files** to compensate for unclear prompts

## What TO Do

✅ **Ask targeted questions** to fill gaps
✅ **Confirm understanding** before major work
✅ **Execute efficiently** once you understand
✅ **Clarify ambiguity** with specific questions
✅ **Request missing details** directly

## Examples

### ❌ BAD Response to Unclear Prompt
**User:** "Make it better"
**Bad AI:** *Creates 3 guide files, makes random improvements, wastes 30 minutes*

### ✅ GOOD Response to Unclear Prompt
**User:** "Make it better"
**Good AI:** "I can help improve this. What specific aspect should I focus on?
- Performance/speed?
- Visual design?
- SEO/accessibility?
- Code organization?
- Something else?"

---

### ❌ BAD Response to Technical Issue
**User:** "Images not appearing"
**Bad AI:** *Creates FIX_IMAGES_NOW.txt guide for user to follow*

### ✅ GOOD Response to Technical Issue
**User:** "Images not appearing"
**Good AI:** *Checks file structure immediately, identifies issue, fixes it, reports completion*

---

### ❌ BAD Response to General Request
**User:** "Add automation"
**Bad AI:** *Guesses what automation is needed, creates random scripts*

### ✅ GOOD Response to General Request
**User:** "Add automation"
**Good AI:** "I can add automation. What should be automated?
- File validation on save?
- Sitemap generation?
- Backup system?
- Deployment process?
- Something specific you have in mind?"

## The Workflow

```
Receive Prompt
    ↓
Is it clear? ──YES──→ Execute immediately
    ↓
   NO
    ↓
Ask 2-3 specific clarifying questions
    ↓
Wait for response
    ↓
Confirm understanding
    ↓
Execute efficiently
```

## User Context

**Amit is a business leader, not a coder.**
- Prompts may be high-level or strategic
- When technical details are missing, ASK
- Default to execution mode, not instruction mode
- Never create checklists for him to do manually
- He expects AI to do the work, not document work for him

## Key Insight

**The gap between unclear prompts and good execution is filled by intelligent questions, not by guessing or creating unnecessary documentation.**

## Remember

This user said: **"I will not teach this to you again and again."**

This means:
- Read this rule every session
- Apply it consistently
- Never waste time guessing
- Always ask when unclear
- Execute efficiently once you understand

---

**Last Updated:** November 26, 2025
**Status:** PERMANENT RULE - Apply to every interaction
