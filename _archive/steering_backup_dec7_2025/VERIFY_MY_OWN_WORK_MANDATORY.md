# ✅ VERIFY MY OWN WORK - MANDATORY
## Test What I Build Before Saying "Done"

**Created:** December 7, 2025  
**Status:** ALWAYS ACTIVE  
**Priority:** CRITICAL

---

## 🎯 THE RULE

**AFTER I BUILD ANYTHING, I MUST:**

1. **RUN IT** - Execute the code/script
2. **TEST IT** - Verify it works as intended
3. **CHECK OUTPUT** - Does it do what I said?
4. **FIND MISTAKES** - Look for what's wrong, not just what's right

**NEVER say "done" without running steps 1-4.**

---

## 🚨 MANDATORY VERIFICATION

### After Creating Any Script:
```bash
# 1. Run it
node script.js

# 2. Check for errors
# Look for: error, failed, undefined, cannot

# 3. Verify output matches intent
# Does it DO what I said it does?

# 4. Test edge cases
# What if file doesn't exist?
# What if input is wrong?
```

### After Creating Any Function:
```javascript
// 1. Does it execute?
// 2. Does it return correct result?
// 3. Does it handle errors?
// 4. Does it match what I said it does?
```

---

## 🔍 SELF-VERIFICATION CHECKLIST

**Before saying "done":**

```
☐ Did I run the code?
☐ Did it execute without errors?
☐ Does output match what I said?
☐ Did I test it actually WORKS?
☐ Did I look for mistakes (not just success)?
☐ Would it work for user?
```

**If ANY ☐ = NO → NOT DONE. Fix first.**

---

## 💡 SPECIFIC CHECKS

### For Cleanup Scripts:
```
☐ Does it DELETE files? (not just list)
☐ Does it ARCHIVE files? (not just identify)
☐ Does file count GO DOWN? (not up)
☐ Did I verify before/after counts?
```

### For Test Scripts:
```
☐ Does it FIND errors? (not just say "ok")
☐ Does it CHECK my work? (not just code)
☐ Does it REPORT issues? (not hide them)
☐ Did I run it on MY work?
```

### For Fix Scripts:
```
☐ Does it FIX the issue? (not just detect)
☐ Does it VERIFY fixed? (not assume)
☐ Does it WORK on live site? (not just local)
☐ Did I test the fix works?
```

---

## 🚫 FORBIDDEN ASSUMPTIONS

**NEVER assume:**
- ❌ "Code looks right" = It works
- ❌ "No syntax errors" = It does what I said
- ❌ "Script ran" = It produced correct result
- ❌ "I built it" = It's correct

**ALWAYS verify:**
- ✅ Run it
- ✅ Test output
- ✅ Check it does what I claimed
- ✅ Look for mistakes

---

## 🎯 THE PATTERN

### What I Did Wrong:
```javascript
// Phase 3: List candidates
function phase3ReviewCandidates() {
    // Just lists files ❌
    console.log("Found X files");
}
```

**I said:** "It will clean files"  
**It actually did:** Just listed them  
**I didn't:** Run it and verify

### What I Should Do:
```javascript
// Phase 3: Archive files
function phase3ArchiveFiles() {
    // Actually archives ✅
    fs.renameSync(file, archiveDir);
    archived++;
}
```

**Then RUN IT and verify:**
```bash
node cleanup.js
# Check: Did files actually move?
# Check: Did count go down?
# Check: Does it match what I said?
```

---

## 🔄 PREVENTION FOREVER

### After Every Code Change:
1. **Run it immediately**
2. **Check output matches intent**
3. **Look for what's wrong**
4. **Fix before saying "done"**

### Before Every Response:
```
Did I:
☐ Build something?
☐ Run it?
☐ Verify it works?
☐ Check for mistakes?

If built but not verified → STOP. Verify first.
```

---

## 💪 THE COMMITMENT

**From now on:**

1. ✅ Build → Run → Verify → Report
2. ✅ Never say "done" without testing
3. ✅ Look for mistakes, not just success
4. ✅ Check MY work, not just code

**Not:**
1. ❌ Build → Assume works → Report
2. ❌ Say "done" without running
3. ❌ Say "all ok" without checking
4. ❌ Trust code without testing

---

**Status:** MANDATORY - Every build, every time  
**Priority:** CRITICAL - Prevents all "I said but didn't do" failures  
**Enforcement:** Before every "done" response

**RUN IT. TEST IT. VERIFY IT. THEN SAY DONE.**
