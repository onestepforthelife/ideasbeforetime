# 🎯 MASTER RULES - Complete Reference
**Last Updated:** December 7, 2025
**Purpose:** All core rules in one place

---

## 🧬 DNA LEVEL (Never Change)

### Rule #0: Site is LIVE - No Testers
- Every push affects real users NOW
- Test before push, verify after
- Business cannot fail

### Perfection Over Speed
- 5 min testing > 12 hours debugging
- Test systematically, not quickly
- Show proof, not promises

---

## 🚨 MANDATORY WORKFLOWS

### Before Every Push:
```bash
# 1. Run diagnostic (5 min)
node CRITICAL_DIAGNOSTIC_DEC6.js

# 2. Check Problems panel (Ctrl+Shift+M)
# Fix all errors

# 3. Test locally
# Verify functionality works

# 4. Push to GitHub
# 5. Purge Cloudflare cache
# 6. Test live site
```

### Trigger Keywords (Auto-Actions):
- **"check"** → Run all tests
- **"all"** → List all files, check all
- **"fix"** → Backup + fix + test
- **"still"** → I missed something, check thoroughly
- **"record it"** → Update all learning files

---

## 📋 TESTING PRIORITY

**Level 0:** Primary user flow (can user complete task?)
**Level 1:** Functionality (does it work?)
**Level 2:** Live site (test on actual URL)
**Level 3:** Cosmetic (colors, alignment)

---

## 💡 KEY LEARNINGS

### Never Say "Done" Without:
- Testing primary user flow
- Checking live site
- Running diagnostics
- Showing proof

### Always Check:
- ALL files (not just one)
- ALL file types (HTML, CSS, JS)
- Build logs first (when deployment fails)
- What I'm NOT checking

### Credit Efficiency:
- Trust loaded context (don't re-read)
- Batch operations (parallel reads)
- Execute immediately (create + run)
- Minimal responses (result, not process)

---

## 🎯 QUICK REFERENCE

**UX:** Important things first, CTAs above fold
**Testing:** Backend + Frontend, not just UI
**Documentation:** Read official docs before implementing
**Git:** Test → Review → Clear message → Push
**Debugging:** Check Problems panel → Run tests → Fix

---

**For detailed guides, see:**
- PRACTICAL_TESTING_RULEBOOK.md (testing procedures)
- 3_WEEKS_COMPLETE_LEARNINGS.md (44 learnings)
- HOW_TO_TEACH_KIRO.md (knowledge upload)
