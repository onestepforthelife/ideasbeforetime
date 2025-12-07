# 🧹 WORKSPACE CLEANUP RULES
## Keep System Fast - Clean Regularly

**Created:** December 7, 2025  
**Purpose:** Prevent workspace bloat, keep system fast  
**Status:** ACTIVE - Run weekly

---

## 🎯 GOLDEN RULE #45: WEEKLY WORKSPACE CLEANUP

**Every Sunday (or after major work):**
```bash
node cleanup-workspace.js
```

**This automatically:**
- ✅ Deletes empty files (0 bytes)
- ✅ Archives old status files (>3 days)
- ✅ Lists review candidates for manual cleanup

**Time:** 30 seconds  
**Risk:** ZERO (safe operations only)

---

## 📋 WHAT GETS CLEANED

### AUTO-DELETE (No Risk):
1. 🗑️ Empty files (0 bytes) - No content = No value
2. 🗑️ Backup folders older than 7 days - Work is stable
3. 🗑️ Temp files (.tmp, .bak)

### AUTO-ARCHIVE (Safe):
1. 📦 Status files older than 3 days
2. 📦 Diagnostic files for resolved issues
3. 📦 One-time test scripts

### MANUAL REVIEW (Check First):
1. 🔍 Duplicate DONE/COMPLETE files (81 found)
2. 🔍 Old diagnostic files (15 found)
3. 🔍 One-time test scripts (2 found)
4. 🔍 Duplicate guides (8 found)

---

## 🛡️ NEVER DELETE

**Protected Files:**
- ✅ .kiro/steering/*.md (all steering files)
- ✅ *.html (all pages)
- ✅ common-*.js, universal-*.js (production scripts)
- ✅ MASTER_GUIDE.txt
- ✅ 3_WEEKS_COMPLETE_LEARNINGS.md
- ✅ Files modified in last 24 hours

---

## 🚀 CLEANUP RESULTS (Dec 7, 2025)

**Phase 1 - Deleted Empty Files:**
- 28 files deleted (0 bytes each)
- Including: GODA_CHATBOT_COMPLETE_GUIDE.txt, ZERO_COST_UNTIL_DEC15.txt, etc.

**Phase 2 - Archived Status Files:**
- 0 files (none older than 3 days)

**Phase 3 - Review Candidates:**
- 106 files identified for potential cleanup
- 81 duplicate DONE/COMPLETE files
- 15 old diagnostic files
- 2 one-time test scripts
- 8 duplicate guides

**Total Potential Cleanup: 134 files (28 deleted + 106 candidates)**

---

## 📈 PERFORMANCE IMPACT

**Before Cleanup:**
- Total files: ~600
- .txt files: 338
- Empty files: 28

**After Phase 1:**
- Total files: ~572 (-28)
- .txt files: 310 (-28)
- Empty files: 0 ✅

**After Full Cleanup (if all candidates removed):**
- Total files: ~466 (-134, 22% reduction)
- .txt files: 204 (-134, 40% reduction)
- Faster file searches ✅
- Cleaner workspace ✅

---

## 🔄 MAINTENANCE SCHEDULE

### Daily (Automatic):
```bash
# Before every push - delete empty files
Get-ChildItem -File | Where-Object { $_.Length -eq 0 } | Remove-Item
```

### Weekly (Sunday):
```bash
# Full cleanup
node cleanup-workspace.js

# Review candidates
# Manually delete if confirmed redundant
```

### Monthly (First Sunday):
```bash
# Delete old archives (>30 days)
Get-ChildItem _archive -Recurse -File | 
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } |
    Remove-Item -Force
```

---

## 💡 CLEANUP BEST PRACTICES

### When Creating New Files:
1. ✅ Use descriptive names (not "temp.txt")
2. ✅ Add content immediately (no empty files)
3. ✅ Delete after one-time use (test scripts)
4. ✅ Consolidate related files (not 10 status files)

### When Completing Tasks:
1. ✅ Archive task-specific files
2. ✅ Update master documents (not create new)
3. ✅ Delete temporary test files
4. ✅ Consolidate learnings into main file

### When Troubleshooting:
1. ✅ Create diagnostic files (for investigation)
2. ✅ Archive after issue resolved
3. ✅ Update prevention rules
4. ✅ Delete one-time test scripts

---

## 🎯 AGGRESSIVE CLEANUP (Optional)

**If workspace still too cluttered:**

```bash
# Archive all DONE/COMPLETE files
node cleanup-workspace-aggressive.js
```

**This will:**
- Archive 81 duplicate DONE/COMPLETE files
- Archive 15 old diagnostic files
- Delete 2 one-time test scripts
- Consolidate 8 duplicate guides

**Expected cleanup: 106 files**

---

## 📊 MONITORING

**Check workspace health:**
```bash
# Count files by type
Get-ChildItem -File | Group-Object Extension | 
    Select-Object Name, Count | Sort-Object Count -Descending

# Find large files
Get-ChildItem -File | Sort-Object Length -Descending | 
    Select-Object -First 10 Name, @{Name="Size(MB)";Expression={$_.Length/1MB}}

# Find old files
Get-ChildItem -File | Where-Object { 
    $_.LastWriteTime -lt (Get-Date).AddDays(-30) 
} | Measure-Object
```

---

## ✅ SUCCESS CRITERIA

**Healthy Workspace:**
- ✅ No empty files
- ✅ <300 .txt files
- ✅ <50 status files
- ✅ No files older than 30 days (except masters)
- ✅ Fast file searches (<1 second)

**Needs Cleanup:**
- ❌ >10 empty files
- ❌ >300 .txt files
- ❌ >50 status files
- ❌ Many files older than 30 days
- ❌ Slow file searches (>2 seconds)

---

## 🚨 EMERGENCY CLEANUP

**If workspace becomes unusable:**

```bash
# Nuclear option - archive everything old
$archiveDate = (Get-Date).AddDays(-7)
Get-ChildItem -File | Where-Object { 
    $_.LastWriteTime -lt $archiveDate -and
    $_.Name -notmatch '(html|common-|universal-)' 
} | Move-Item -Destination "_archive/emergency_$(Get-Date -Format 'yyyyMMdd')/"
```

**Only use if:**
- Workspace has >1000 files
- File searches take >5 seconds
- Can't find important files
- System performance degraded

---

**Status:** ACTIVE - Run weekly  
**Priority:** MEDIUM (performance improvement)  
**Safety:** HIGH (archives, doesn't delete critical files)  
**Last Run:** December 7, 2025 (28 files cleaned)

**REMEMBER: Clean workspace = Fast system = Better productivity!**
