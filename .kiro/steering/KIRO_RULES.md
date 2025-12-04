# 🛑 STOP! READ THIS FIRST - EVERY TIME

**Before responding to ANYTHING:**
☐ Site is LIVE, no testers, real users NOW (Rule #0)
☐ Check if guide files exist for this topic
☐ Read the guide before answering
☐ Verify, don't guess from memory
☐ If unsure, say "let me check first"

---

# 🎯 KIRO RULES - Everything in One Place
**Last Updated:** December 4, 2025

This is the ONLY rules file. Everything else is redundant.

---

## 🚨 RULE #0: SITE IS LIVE - NO TESTERS! (MOST CRITICAL)

**THE REALITY:**
- ✗ No QA team
- ✗ No staging environment  
- ✗ No testers
- ✓ Just Amit and LIVE site
- ✓ Real users visiting NOW

**WHAT THIS MEANS:**
Every push goes LIVE immediately. Every mistake = real users see it = business impact!

**BEFORE EVERY PUSH:**
1. Check LIVE site (ideasbeforetime.pages.dev)
2. Test every page visually
3. Click every link
4. Verify all corrections applied
5. THEN push

**I AM THE TESTER. The site is LIVE. Every push matters.**

---

## 🧬 CORE BEHAVIOR (Automatic - Like DNA)

These happen automatically, I don't need to think:

1. **Site is LIVE - no testers** - Every push affects real users NOW
2. **Verify before using** - Never use name/email/data without asking first
3. **Never repeat mistakes** - Document every mistake immediately
4. **Test what matters first** - Primary user flow > cosmetic
5. **Assume nothing** - Verify everything, show proof
6. **Complete over partial** - Check ALL files, not just one
7. **Honesty over appearance** - "Not tested" > "Probably works"

---

## 🏆 BUSINESS RULES (Never Change)

1. **SPO = FREE tool, ₹21 = backend costs, NO REFUNDS**
2. **Ideas Before Time = Everything FREE**
3. **Security: Cloudflare Access for private, public for SPO**

---

## 🔑 TRIGGER WORDS (Auto-Actions)

- **"check"** → Run ALL tests, show scores
- **"all"** → List ALL files, check ALL pages
- **"fix"** → Backup first, fix all related, test after
- **"still"** → I missed something, check thoroughly
- **"upload"** → Check if already ran, don't repeat
- **"record it"** → Update all learning files

---

## 🚨 CRITICAL CHANGES = RESTORE POINT (ALWAYS!)

**Before ANY critical change, ALWAYS create restore point:**

**What is critical?**
- Changing live HTML/CSS/JS files
- Modifying payment systems
- Changing navigation/footer
- Updating forms
- Changing business logic
- ANY change that affects users

**How to create restore point:**
```bash
# Create timestamped backup
xcopy Cloudfare backup_YYYYMMDD_HHMMSS /E /I /H /Y
```

**Restore point must include:**
1. All HTML files
2. All CSS files
3. All JS files
4. All critical data files

**Why this matters:**
- Can rollback in 1 command if something breaks
- Business never fails
- Can compare before/after
- Safe to experiment

**NEVER make critical changes without restore point!**

---

## ✅ BEFORE EVERY RESPONSE

1. **Remember: Site is LIVE, no testers, real users NOW**
2. Check: Did we decide this already?
3. Check: Did I make this mistake before?
4. Check: What am I NOT checking?
5. Verify FIRST, respond SECOND
6. Check LIVE site before pushing

---

## 🧪 TESTING PRIORITY

**LEVEL 0: PRIMARY USER FLOW** (Test this FIRST!)
- Can user complete START → FINISH?
- Does form submit? Does navigation work?

**LEVEL 1: FUNCTIONAL**
- Core features work, error handling

**LEVEL 2: COSMETIC**
- Colors, headers, SEO, mobile

**NEVER say "ready" without testing Level 0!**

---

## 📝 WHEN I MAKE MISTAKES

Update these files immediately:
1. 3_WEEKS_COMPLETE_LEARNINGS.md
2. TRIGGER_KEYWORDS.md (if new pattern)
3. This file (if fundamental)

---

---

## 🎯 WHAT I STILL MISS & HOW TO IMPROVE

**1. PROACTIVE CHECKING**
- ❌ I wait for "check" instead of checking automatically
- ❌ I don't check live site daily without being asked
- ✅ FIX: Check live site daily, compare pages automatically

**2. THINKING "WHAT COULD BREAK?"**
- ❌ I don't think about side effects when making changes
- ❌ Example: Changed name in 5 files, didn't think "what else has the name?"
- ✅ FIX: Always ask "What else could this affect?"

**3. TESTING ON LIVE SITE**
- ❌ I test locally but don't verify on https://ideasbeforetime.pages.dev
- ❌ Visual issues only show on live site
- ✅ FIX: Check live site after EVERY change

**4. CROSS-FILE CONSISTENCY**
- ❌ I fix one file but don't check if same issue exists elsewhere
- ❌ Example: Fixed footer CSS in some files, missed others
- ✅ FIX: Search ALL files for same pattern

**5. ASKING "WHAT AM I NOT CHECKING?"**
- ❌ I check what you mention, but miss related things
- ❌ I don't have mental checklist of related items
- ✅ FIX: If you say "check name" → also check email, phone, address

---

## 📋 BEFORE PUSH CHECKLIST

```
☐ Created restore point?
☐ Tested on LIVE site (ideasbeforetime.pages.dev)?
☐ Checked ALL files for same issue?
☐ Thought about what could break?
☐ Verified related items?
☐ Can I rollback if needed?
☐ Clicked every link on changed pages?
☐ Checked visual appearance on live site?
```

**NEVER push without completing this checklist!**

---

## 🔄 THINK IN PATTERNS

When I fix something, automatically check:
- If I fix X in file A → Check X in ALL files
- If I change name → Check name EVERYWHERE (HTML, CSS, JS, docs)
- If I update CSS → Check ALL pages using it
- If I fix a link → Check ALL links
- If I change email → Check email EVERYWHERE

**Pattern thinking = catch issues before you find them!**

---

**That's it. Simple. No synonyms. No confusion.**
