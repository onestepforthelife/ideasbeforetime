# 🔍 DEBUGGER EXTENSIONS GUIDE

**Created:** December 7, 2025  
**Purpose:** How to use HTML & CSS debugger extensions effectively  
**Priority:** HIGH - Improves development speed and quality

---

## 🎯 INSTALLED EXTENSIONS

### 1. HTML Debugger
**What it does:**
- Validates HTML structure
- Finds syntax errors
- Checks for missing tags
- Identifies accessibility issues
- Validates semantic HTML

### 2. CSS Debugger
**What it does:**
- Validates CSS syntax
- Finds unused CSS
- Detects specificity issues
- Checks for browser compatibility
- Identifies performance issues

---

## 📋 HOW TO USE THEM

### When to Use HTML Debugger:

**1. Before Every Push:**
```
☐ Open HTML file in editor
☐ Check Problems panel (Ctrl+Shift+M)
☐ Fix all errors and warnings
☐ Verify semantic HTML structure
☐ Check accessibility issues
```

**2. When Creating New Pages:**
```
☐ Validate HTML structure
☐ Check for missing closing tags
☐ Verify proper nesting
☐ Check meta tags
☐ Validate forms
```

**3. When User Reports Issues:**
```
☐ Open reported page
☐ Check Problems panel
☐ Look for HTML errors
☐ Fix structural issues
```

### When to Use CSS Debugger:

**1. Before Every Push:**
```
☐ Open CSS file in editor
☐ Check Problems panel
☐ Fix syntax errors
☐ Remove unused CSS
☐ Check browser compatibility
```

**2. When Styling Issues Occur:**
```
☐ Check CSS specificity
☐ Look for conflicting rules
☐ Verify selector syntax
☐ Check for typos
```

**3. Performance Optimization:**
```
☐ Find unused CSS
☐ Optimize selectors
☐ Remove redundant rules
☐ Check file size
```

---

## 🚀 INTEGRATION WITH EXISTING WORKFLOW

### Step 1: Check Problems Panel (Mandatory)
**Before running any test scripts:**
```
1. Open Problems panel (Ctrl+Shift+M)
2. Filter by file type (HTML/CSS)
3. Fix all errors (red icons)
4. Fix critical warnings (yellow icons)
5. Document any intentional warnings
```

### Step 2: Run Automated Tests
**After fixing debugger issues:**
```bash
# Then run existing test scripts
node test-site-consistency.js
node test-content-consistency.js
node test-industry-standards.js
```

### Step 3: Visual Verification
**After tests pass:**
```
1. Open page in browser
2. Check DevTools Console (F12)
3. Verify no errors
4. Test functionality
```

---

## 🎯 GOLDEN RULE #45: USE DEBUGGERS BEFORE TESTS

**New Mandatory Workflow:**

```
1. Write/Edit HTML/CSS
2. Check Problems panel (debuggers) ← NEW STEP
3. Fix all errors/warnings
4. Run automated test scripts
5. Visual verification
6. Push to GitHub
```

**Why this order:**
- Debuggers catch syntax errors instantly
- Automated tests check logic/structure
- Visual verification checks appearance
- Each layer catches different issues

---

## 📊 WHAT EACH TOOL CATCHES

### HTML Debugger Catches:
- ✅ Missing closing tags
- ✅ Invalid nesting
- ✅ Deprecated elements
- ✅ Missing required attributes
- ✅ Accessibility issues (ARIA)
- ✅ Semantic HTML violations

### CSS Debugger Catches:
- ✅ Syntax errors (missing semicolons)
- ✅ Invalid property values
- ✅ Unknown properties
- ✅ Unused selectors
- ✅ Specificity conflicts
- ✅ Browser compatibility issues

### Automated Tests Catch:
- ✅ Consistency across pages
- ✅ Missing navigation/footer
- ✅ Content accuracy
- ✅ Industry standards compliance
- ✅ Performance metrics

### Visual Verification Catches:
- ✅ Layout issues
- ✅ Alignment problems
- ✅ Color inconsistencies
- ✅ Responsive design issues
- ✅ User experience problems

---

## 🔧 PRACTICAL EXAMPLES

### Example 1: HTML Error Detection

**Debugger Shows:**
```
Error: Unclosed <div> tag at line 45
Warning: Missing alt attribute on <img> at line 67
```

**Fix:**
```html
<!-- Before -->
<div class="container">
    <img src="image.jpg">

<!-- After -->
<div class="container">
    <img src="image.jpg" alt="Description">
</div>
```

### Example 2: CSS Error Detection

**Debugger Shows:**
```
Error: Missing semicolon at line 23
Warning: Unknown property 'text-colour' at line 45
```

**Fix:**
```css
/* Before */
.header {
    color: #333
    text-colour: red;
}

/* After */
.header {
    color: #333;
    text-color: red;
}
```

### Example 3: Accessibility Issue

**Debugger Shows:**
```
Warning: Form input missing associated label
Warning: Button missing accessible name
```

**Fix:**
```html
<!-- Before -->
<input type="text" name="email">
<button><i class="icon"></i></button>

<!-- After -->
<label for="email">Email:</label>
<input type="text" id="email" name="email">
<button aria-label="Submit form"><i class="icon"></i></button>
```

---

## 📋 UPDATED PRE-PUSH CHECKLIST

**Before EVERY push:**

```
☐ 1. Check Problems Panel (Ctrl+Shift+M)
   - Fix all HTML errors
   - Fix all CSS errors
   - Document intentional warnings

☐ 2. Run Diagnostic
   node CRITICAL_DIAGNOSTIC_DEC6.js

☐ 3. Run Automated Tests
   node test-site-consistency.js
   node test-content-consistency.js
   node test-industry-standards.js

☐ 4. Visual Verification
   - Open in browser
   - Check DevTools Console
   - Test functionality

☐ 5. Push to GitHub
   - Commit with clear message
   - Push changes
   - Verify deployment
```

---

## 🎯 KEYBOARD SHORTCUTS

**Essential Shortcuts:**
- `Ctrl+Shift+M` - Open Problems panel
- `F8` - Go to next error/warning
- `Shift+F8` - Go to previous error/warning
- `Ctrl+.` - Quick fix suggestions
- `F12` - Go to definition

**Use these to navigate errors quickly!**

---

## 💡 TIPS FOR MAXIMUM EFFICIENCY

### Tip 1: Fix Errors First, Warnings Second
- Red icons (errors) break functionality
- Yellow icons (warnings) are best practices
- Fix all errors before pushing
- Document why warnings are intentional

### Tip 2: Use Quick Fixes
- Hover over error/warning
- Click lightbulb icon
- Select suggested fix
- Saves time on common issues

### Tip 3: Filter by Severity
- Click filter icon in Problems panel
- Show only errors
- Fix all errors
- Then show warnings

### Tip 4: Group by File
- Organize problems by file
- Fix one file at a time
- Easier to track progress

### Tip 5: Learn Common Patterns
- Same errors repeat
- Learn the fix once
- Apply everywhere
- Update templates

---

## 🚨 COMMON ISSUES & FIXES

### Issue 1: "Duplicate ID"
**Problem:** Same ID used multiple times
**Fix:** Make IDs unique or use classes
```html
<!-- Before -->
<div id="container">...</div>
<div id="container">...</div>

<!-- After -->
<div id="container-1">...</div>
<div id="container-2">...</div>
```

### Issue 2: "Missing Alt Text"
**Problem:** Images without alt attributes
**Fix:** Add descriptive alt text
```html
<!-- Before -->
<img src="logo.png">

<!-- After -->
<img src="logo.png" alt="Company Logo">
```

### Issue 3: "Invalid CSS Property"
**Problem:** Typo in CSS property name
**Fix:** Use correct property name
```css
/* Before */
.text {
    colour: red; /* British spelling */
}

/* After */
.text {
    color: red; /* US spelling - CSS standard */
}
```

### Issue 4: "Unclosed Tag"
**Problem:** Missing closing tag
**Fix:** Add closing tag
```html
<!-- Before -->
<div class="wrapper">
    <p>Content

<!-- After -->
<div class="wrapper">
    <p>Content</p>
</div>
```

---

## 📊 MEASURING SUCCESS

**Good Development:**
- 0 errors in Problems panel
- 0-5 intentional warnings (documented)
- All tests pass
- Visual verification clean

**Bad Development:**
- Multiple errors ignored
- Warnings not addressed
- Tests not run
- Visual issues present

**Target: Zero errors before every push!**

---

## 🔄 CONTINUOUS IMPROVEMENT

**After Each Session:**
```
☐ Review common errors found
☐ Update templates to prevent
☐ Document new patterns
☐ Share learnings
```

**Weekly Review:**
```
☐ Check most common errors
☐ Create prevention rules
☐ Update steering files
☐ Improve workflow
```

---

## 🎯 INTEGRATION WITH EXISTING RULES

### Works With:
- ✅ DNA_RULE_PERFECTION_OVER_SPEED.md (catch errors early)
- ✅ PRACTICAL_TESTING_RULEBOOK.md (systematic testing)
- ✅ KIRO_RULES.md (quality standards)
- ✅ 3_WEEKS_COMPLETE_LEARNINGS.md (continuous learning)

### Enhances:
- ✅ Faster error detection (instant vs manual)
- ✅ Better code quality (catch before tests)
- ✅ Professional standards (accessibility, semantics)
- ✅ Reduced debugging time (fix early)

---

## 📝 QUICK REFERENCE CARD

**Before Every Response:**
```
1. Check Problems panel (Ctrl+Shift+M)
2. Fix all errors (red icons)
3. Fix critical warnings (yellow icons)
4. Run automated tests
5. Visual verification
6. Then respond/push
```

**If Problems Panel Shows Errors:**
```
STOP → Fix errors → Re-check → Continue
```

**Never push with errors in Problems panel!**

---

## 🚀 NEXT STEPS

**Immediate Actions:**
1. ✅ Open Problems panel (Ctrl+Shift+M)
2. ✅ Check all open HTML/CSS files
3. ✅ Fix any existing errors
4. ✅ Document intentional warnings
5. ✅ Update workflow to include debugger check

**Long Term:**
1. ⏳ Create error prevention templates
2. ⏳ Build automated error fixing scripts
3. ⏳ Integrate with CI/CD pipeline
4. ⏳ Track error patterns over time

---

**Status:** ACTIVE - Use before every push  
**Priority:** HIGH - Catches errors early  
**Integration:** Works with all existing workflows  
**Result:** Higher quality code, faster development

**REMEMBER: Debuggers catch syntax, tests catch logic, eyes catch appearance. Use all three!** 🔍

