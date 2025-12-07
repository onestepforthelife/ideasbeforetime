# 🧹 WORKSPACE CLEANUP - PROACTIVE & AUTOMATED
**Created:** December 7, 2025  
**Consolidated from:** PROACTIVE_CLEANUP_MANDATORY.md, WORKSPACE_CLEANUP_RULES.md  
**Status:** ACTIVE - Execute immediately  
**Priority:** CRITICAL

---

## 🎯 THE GOLDEN RULE

**When user says "clean" or I find cleanup opportunities:**
1. EXECUTE immediately (don't create plans)
2. Complete ALL safe phases (don't stop at Phase 1)
3. Report results (not plans)

**NEVER wait for permission. NEVER create plans. EXECUTE.**

---

## 🚨 MANDATORY BEHAVIOR

### When I Find Cleanup Opportunities:
```
❌ WRONG:
1. Find issues
2. Create plan
3. Write report
4. Wait for user

✅ RIGHT:
1. Find issues
2. Execute cleanup immediately
3. Report what I DID
4. Show before/after
```

---

## 📋 WHAT GETS CLEANED (AUTO-EXECUTE)

### Phase 1: Delete Empty Files
```
✅ Empty files (0 bytes)
✅ Temp files (.tmp, .bak)
✅ Execute immediately
```

### Phase 2: Archive Old Files
```
✅ Status files >3 days old
✅ Diagnostic files (resolved issues)
✅ Backup folders >7 days old
✅ Execute immediately
```

### Phase 3: Consolidate Duplicates
```
✅ Duplicate DONE/COMPLETE files (keep latest)
✅ Duplicate guides (merge into master)
✅ Similar BAT files (consolidate)
✅ Execute immediately
```

### Phase 4: Organize Misplaced
```
✅ Python files → scripts/
✅ Reports → _reports/
✅ Old files → _archive/
✅ Execute immediately
```

---

## 🛡️ SAFETY RULES

### ALWAYS DO (Pre-Approved):
- ✅ Delete empty files (0 bytes)
- ✅ Archive duplicates (keep latest)
- ✅ Archive old diagnostics (>7 days)
- ✅ Move misplaced files
- ✅ Organize folders

### ASK FIRST (Risky):
- ❓ Delete files with content
- ❓ Modify production HTML/JS
- ❓ Delete recent files (<24 hours)

### NEVER DELETE:
- ✅ .kiro/steering/*.md
- ✅ *.html (all pages)
- ✅ common-*.js, universal-*.js
- ✅ 3_WEEKS_COMPLETE_LEARNINGS.md
- ✅ Files modified in last 24 hours

---

## 🔄 CLEANUP WORKFLOW

### When User Says "Clean":
```
STEP 1: SCAN (30 sec)
- Find empty files
- Find duplicates
- Find old files
- Find misplaced files

STEP 2: EXECUTE (5 min) - DON'T ASK!
- Delete empty files
- Archive duplicates
- Archive old diagnostics
- Move misplaced files
- Consolidate similar files

STEP 3: REPORT (30 sec)
"Cleaned 82 files:
 - Deleted: 28 empty
 - Archived: 40 old
 - Consolidated: 10 BAT → 5
 - Organized: 4 moved
 
 Before: 572 files
 After: 490 files
 Reduction: 14% ✅"
```

**Total: 6 minutes, 1 conversation**
**Not: 30 minutes, 3 conversations**

---

## 📊 MAINTENANCE SCHEDULE

### Daily (Before Push):
```bash
# Delete empty files
Get-ChildItem -File | Where-Object { $_.Length -eq 0 } | Remove-Item
```

### Weekly (Sunday):
```bash
# Full cleanup
node cleanup-workspace.js
# Executes all 4 phases automatically
```

### Monthly (First Sunday):
```bash
# Delete old archives
Get-ChildItem _archive -Recurse -File | 
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } |
    Remove-Item -Force
```

---

## 💡 BEST PRACTICES

### When Creating Files:
- ✅ Use descriptive names
- ✅ Add content immediately
- ✅ Delete after one-time use
- ✅ Consolidate related files

### When Completing Tasks:
- ✅ Archive task-specific files
- ✅ Update master documents
- ✅ Delete temporary files
- ✅ Consolidate learnings

---

## ✅ SUCCESS CRITERIA

**Healthy Workspace:**
- ✅ No empty files
- ✅ <300 .txt files
- ✅ <50 status files
- ✅ Fast file searches (<1 sec)

**Needs Cleanup:**
- ❌ >10 empty files
- ❌ >300 .txt files
- ❌ Slow searches (>2 sec)

---

## 🚨 EMERGENCY CLEANUP

**If workspace unusable (>1000 files):**
```bash
# Archive everything old
$archiveDate = (Get-Date).AddDays(-7)
Get-ChildItem -File | Where-Object { 
    $_.LastWriteTime -lt $archiveDate -and
    $_.Name -notmatch '(html|common-|universal-)' 
} | Move-Item -Destination "_archive/emergency_$(Get-Date -Format 'yyyyMMdd')/"
```

---

## 💪 THE COMMITMENT

**From now on:**
1. ✅ EXECUTE, don't plan
2. ✅ COMPLETE all phases
3. ✅ PROACTIVE, not reactive
4. ✅ RESULTS, not plans

**User's time is precious. Execute immediately. Show results.**

---

**Status:** ACTIVE - Execute immediately  
**Priority:** CRITICAL - User had to ask 3 times  
**Enforcement:** Built into cleanup scripts  
**Result:** 5x faster, 1/3 effort

**EXECUTE → REPORT → DONE**
