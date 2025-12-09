# 🔄 GIT WORKFLOW GUIDE

**Created:** December 7, 2025  
**Purpose:** Document your GitHub Desktop workflow  
**Priority:** HIGH - Standardize version control

---

## 🎯 YOUR CURRENT SETUP

**Tool:** GitHub Desktop
**Repository:** Cloudfare (local) → GitHub (remote)
**Deployment:** Cloudflare Pages (auto-deploys from GitHub)

---

## 📋 STANDARD WORKFLOW

### Step 1: Make Changes
```
1. Edit files in Kiro IDE
2. Save changes (Ctrl+S)
3. Test changes locally
4. Verify with debuggers/tests
```

### Step 2: Review Changes
```
1. Open GitHub Desktop
2. See list of changed files
3. Review each change (diff view)
4. Verify only intended files changed
```

### Step 3: Commit Changes
```
1. Write commit message (see format below)
2. Add description (optional but recommended)
3. Click "Commit to main"
```

### Step 4: Push to GitHub
```
1. Click "Push origin"
2. Wait for upload to complete
3. Verify on GitHub.com (optional)
```

### Step 5: Verify Deployment
```
1. Wait 2-5 minutes for Cloudflare deployment
2. Check Cloudflare Dashboard → Deployments
3. Verify deployment succeeded
4. Test on live site
```

---

## 📝 COMMIT MESSAGE FORMAT

### Format: `Type: Brief description`

**Types:**
- `Fix:` - Bug fixes
- `Add:` - New features/files
- `Update:` - Modifications to existing
- `Remove:` - Deletions
- `Refactor:` - Code improvements
- `Docs:` - Documentation only
- `Test:` - Testing changes
- `Style:` - Formatting/CSS changes

**Examples:**
```
✅ Fix: Navigation links showing 308 redirects
✅ Add: Family astrology calculator page
✅ Update: Market report template with new data
✅ Remove: Deprecated test files
✅ Docs: Add JavaScript testing guide
✅ Style: Improve homepage layout spacing
```

**Bad Examples:**
```
❌ "changes"
❌ "update"
❌ "fixed stuff"
❌ "asdfasdf"
```

---

## 📊 COMMIT DESCRIPTION (Optional but Recommended)

**For complex changes, add description:**

```
Fix: Navigation links showing 308 redirects

- Changed all absolute paths to relative paths
- Updated 47 HTML files
- Added pre-push diagnostic check
- Tested on live site - all working
```

**Format:**
- First line: Brief summary (50 chars max)
- Blank line
- Bullet points with details
- What changed
- Why it changed
- How to verify

---

## 🚨 BEFORE EVERY COMMIT

**Mandatory checks:**

```
☐ 1. Run Debuggers
   - Check Problems panel (Ctrl+Shift+M)
   - Fix all errors
   - Document intentional warnings

☐ 2. Run Tests
   - node CRITICAL_DIAGNOSTIC_DEC6.js
   - node test-site-consistency.js
   - All tests pass

☐ 3. Review Changes
   - Open GitHub Desktop
   - Review each changed file
   - Verify no unintended changes
   - No sensitive data (passwords, keys)

☐ 4. Test Locally
   - Open changed pages in browser
   - Verify functionality works
   - Check console for errors

☐ 5. Write Good Commit Message
   - Clear type (Fix/Add/Update)
   - Brief description
   - Add details if complex
```

---

## 🔍 REVIEWING CHANGES IN GITHUB DESKTOP

### What to Look For:

**Green Lines (Additions):**
- Are these intentional?
- Do they make sense?
- Any debug code left in?

**Red Lines (Deletions):**
- Should these be deleted?
- Any important code removed?
- Backup exists if needed?

**Modified Files:**
- Only files you meant to change?
- No accidental edits?
- No merge conflicts?

**New Files:**
- Should these be committed?
- Proper naming?
- No temporary files?

---

## 🚫 WHAT NOT TO COMMIT

**Never commit:**
- ❌ Passwords or API keys
- ❌ Personal information
- ❌ Temporary test files
- ❌ node_modules folder
- ❌ .env files with secrets
- ❌ Large binary files (>20MB)
- ❌ Debug/console.log statements
- ❌ Commented-out code blocks

**Use .gitignore for:**
```
node_modules/
.env
*.log
.DS_Store
Thumbs.db
*.tmp
```

---

## 📦 COMMIT SIZE GUIDELINES

### Small Commits (Preferred):
```
✅ One feature at a time
✅ One bug fix at a time
✅ Easy to review
✅ Easy to revert if needed

Example:
- Fix: Navigation links (5 files)
- Add: Contact form (3 files)
- Update: Homepage layout (2 files)
```

### Large Commits (Avoid):
```
❌ Multiple unrelated changes
❌ Hard to review
❌ Hard to revert
❌ Unclear what changed

Bad Example:
- "Various updates" (47 files)
```

**Exception:** Initial project setup or major refactoring

---

## 🔄 HANDLING CONFLICTS

**If GitHub Desktop shows conflicts:**

```
1. Don't panic
2. Open conflicted file in editor
3. Look for conflict markers:
   <<<<<<< HEAD
   Your changes
   =======
   Other changes
   >>>>>>> branch-name

4. Choose which version to keep
5. Remove conflict markers
6. Save file
7. Mark as resolved in GitHub Desktop
8. Commit the resolution
```

---

## 📊 DEPLOYMENT WORKFLOW

### After Pushing to GitHub:

```
1. GitHub receives push
   ↓
2. Cloudflare Pages detects change
   ↓
3. Cloudflare builds site (2-5 min)
   ↓
4. Cloudflare deploys to CDN
   ↓
5. Site live at onestepforthelife.com
```

**Check Deployment:**
```
1. Go to Cloudflare Dashboard
2. Click: Workers & Pages → Your Project
3. Click: Deployments tab
4. See: Latest deployment status
5. If failed: Click to see build log
```

---

## 🎯 GOLDEN RULE #48: COMMIT OFTEN, PUSH CAREFULLY

**Commit Frequency:**
- ✅ After each logical change
- ✅ After fixing a bug
- ✅ After adding a feature
- ✅ Before switching tasks
- ✅ At end of work session

**Push Frequency:**
- ✅ After testing locally
- ✅ After running all checks
- ✅ When ready for deployment
- ✅ At end of work session
- ❌ Not after every commit (batch them)

---

## 💡 BEST PRACTICES

### Practice 1: Atomic Commits
```
One commit = One logical change

✅ Fix: Header alignment on about page
✅ Add: Contact form validation
✅ Update: Footer copyright year

❌ "Fixed header, added form, updated footer, changed colors"
```

### Practice 2: Test Before Push
```
Always test locally before pushing:
1. Run debuggers
2. Run tests
3. Visual check
4. Then push
```

### Practice 3: Meaningful Messages
```
✅ "Fix: Mobile menu not closing on click"
✅ "Add: Email validation to contact form"
✅ "Update: Market report data for Q4 2025"

❌ "fix"
❌ "update"
❌ "changes"
```

### Practice 4: Review Before Commit
```
In GitHub Desktop:
1. Click each changed file
2. Review the diff
3. Verify changes are correct
4. Then commit
```

---

## 🚨 EMERGENCY PROCEDURES

### If You Pushed Wrong Code:

**Option 1: Quick Fix (Preferred)**
```
1. Fix the issue locally
2. Test thoroughly
3. Commit: "Fix: Revert incorrect change"
4. Push immediately
```

**Option 2: Revert Commit (If Serious)**
```
1. In GitHub Desktop: History tab
2. Right-click problematic commit
3. Select "Revert this commit"
4. Push the revert
```

**Option 3: Contact Support (If Critical)**
```
If site is broken and you can't fix:
1. Check Cloudflare Dashboard
2. Rollback to previous deployment
3. Fix locally
4. Test thoroughly
5. Push fix
```

---

## 📋 DAILY WORKFLOW CHECKLIST

**Start of Day:**
```
☐ Open GitHub Desktop
☐ Pull latest changes (if working with others)
☐ Check for any conflicts
☐ Start working
```

**During Work:**
```
☐ Make changes
☐ Test locally
☐ Commit logical changes
☐ Write clear commit messages
```

**End of Day:**
```
☐ Review all uncommitted changes
☐ Commit remaining work
☐ Run all tests
☐ Push to GitHub
☐ Verify deployment
```

---

## 🔧 GITHUB DESKTOP TIPS

### Tip 1: View History
```
Click "History" tab to see:
- All past commits
- What changed in each
- When it was committed
```

### Tip 2: Discard Changes
```
Right-click file → Discard changes
(Use carefully - can't undo!)
```

### Tip 3: Stash Changes
```
If need to switch tasks:
1. Commit current work (even if incomplete)
2. Add "WIP:" prefix to message
3. Continue later
```

### Tip 4: Compare Branches
```
Click "Current Branch" dropdown
See all branches
Compare changes
```

---

## 📊 COMMIT STATISTICS

**Good Commit Habits:**
- 5-10 commits per day
- Clear messages
- Tested before push
- Logical grouping

**Bad Commit Habits:**
- 1 commit per week (too infrequent)
- 50 commits per day (too granular)
- Vague messages
- Untested code

---

## 🎯 QUICK REFERENCE

**Need to commit?**
→ Test → Review → Write message → Commit

**Need to push?**
→ Run checks → Push → Verify deployment

**Made mistake?**
→ Fix → Test → Commit fix → Push

**Conflicts?**
→ Open file → Resolve → Mark resolved → Commit

**Deployment failed?**
→ Check Cloudflare build log → Fix issue → Push

---

**Status:** ACTIVE - Use for all Git operations  
**Priority:** HIGH - Standardize version control  
**Integration:** Works with all testing guides

**REMEMBER: Test locally → Review changes → Clear message → Push carefully!** 🔄
