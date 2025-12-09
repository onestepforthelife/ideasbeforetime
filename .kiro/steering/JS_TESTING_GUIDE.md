# 🔧 JAVASCRIPT TESTING GUIDE

**Created:** December 7, 2025  
**Purpose:** How to test and debug JavaScript files effectively  
**Priority:** CRITICAL - You have 100+ JS files

---

## 🎯 WHAT YOU HAVE

**JavaScript Files Count:** 100+ files including:
- Test scripts (test-site-consistency.js, etc.)
- Automation (workspace-cleanup-dec7.js, etc.)
- Widgets (chat-ai-widget.js, goda-chat-widget.js, etc.)
- Error tracking (error-tracker.js, etc.)
- Build tools (generate-sitemap.js, etc.)

---

## 📋 TESTING WORKFLOW

### Step 1: Syntax Check (Instant)
**Use JavaScript Debugger Extension:**
```
1. Open .js file in editor
2. Check Problems panel (Ctrl+Shift+M)
3. Fix red errors (syntax)
4. Fix yellow warnings (best practices)
```

**Common Syntax Errors:**
- Missing semicolons
- Unclosed brackets/parentheses
- Undefined variables
- Typos in function names

### Step 2: Run the Script (Test)
**For Node.js scripts:**
```bash
node script-name.js
```

**For browser scripts:**
```html
<!-- Add to test HTML page -->
<script src="script-name.js"></script>
<!-- Open in browser, check Console (F12) -->
```

### Step 3: Check Output
**Node.js scripts:**
- Check terminal output
- Look for errors
- Verify expected results

**Browser scripts:**
- Open DevTools (F12)
- Check Console tab
- Look for errors (red text)
- Check Network tab (API calls)

---

## 🚨 COMMON JS ERRORS & FIXES

### Error 1: "ReferenceError: X is not defined"
**Problem:** Using variable before declaring
**Fix:**
```javascript
// Before (ERROR)
console.log(myVar);
let myVar = 5;

// After (FIXED)
let myVar = 5;
console.log(myVar);
```

### Error 2: "TypeError: Cannot read property 'X' of undefined"
**Problem:** Accessing property of undefined object
**Fix:**
```javascript
// Before (ERROR)
const name = user.name;

// After (FIXED)
const name = user?.name || 'Unknown';
// Or
if (user && user.name) {
    const name = user.name;
}
```

### Error 3: "SyntaxError: Unexpected token"
**Problem:** Missing bracket, comma, or quote
**Fix:**
```javascript
// Before (ERROR)
const obj = {
    name: 'Test'
    age: 25
};

// After (FIXED)
const obj = {
    name: 'Test',  // Added comma
    age: 25
};
```

### Error 4: "Promise rejection unhandled"
**Problem:** Async function without error handling
**Fix:**
```javascript
// Before (ERROR)
async function fetchData() {
    const response = await fetch(url);
    return response.json();
}

// After (FIXED)
async function fetchData() {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        return null;
    }
}
```

---

## 🔍 TESTING YOUR SPECIFIC FILES

### Test Scripts (test-*.js)
**How to test:**
```bash
# Run the test
node test-site-consistency.js

# Check output
# Should show: Pass/Fail results
# Should exit with: 0 (success) or 1 (failure)
```

**What to check:**
- Does it run without errors?
- Does it check what it should?
- Are results accurate?
- Does it exit correctly?

### Automation Scripts (workspace-cleanup-*.js, fix-*.js)
**How to test:**
```bash
# ALWAYS backup first!
# Then run
node workspace-cleanup-dec7.js

# Check what changed
git status
```

**What to check:**
- Did it modify correct files?
- Did it skip files it should skip?
- Are changes reversible?
- Did it log what it did?

### Widget Scripts (chat-ai-widget.js, goda-chat-widget.js)
**How to test:**
```html
<!-- Create test.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Widget Test</title>
</head>
<body>
    <h1>Testing Widget</h1>
    <script src="chat-ai-widget.js"></script>
</body>
</html>
```

**Open in browser, check:**
- Does widget appear?
- Does it function correctly?
- Any console errors?
- Does it work on mobile?

---

## 📊 VALIDATION CHECKLIST

**Before pushing ANY .js file:**

```
☐ 1. Syntax Check
   - Open in editor
   - Check Problems panel
   - Fix all errors

☐ 2. Run Test
   - node script.js (for Node)
   - Or open in browser
   - Check for errors

☐ 3. Verify Output
   - Does it do what expected?
   - Are results correct?
   - No unhandled errors?

☐ 4. Check Dependencies
   - All required files exist?
   - All imports work?
   - All APIs accessible?

☐ 5. Test Edge Cases
   - Empty input
   - Invalid input
   - Missing files
   - Network errors
```

---

## 🎯 GOLDEN RULE #46: TEST JS BEFORE PUSH

**Mandatory workflow:**
```
1. Write/Edit JS
2. Check Problems panel (syntax)
3. Run script (functionality)
4. Check output (correctness)
5. Test edge cases (robustness)
6. Then push
```

**Never push untested JavaScript!**

---

## 💡 DEBUGGING TIPS

### Tip 1: Use console.log Liberally
```javascript
function processData(data) {
    console.log('Input:', data);  // See what comes in
    
    const result = transform(data);
    console.log('After transform:', result);  // See intermediate
    
    return result;
}
```

### Tip 2: Check Types
```javascript
console.log(typeof myVar);  // "string", "number", "object", etc.
console.log(Array.isArray(myVar));  // true/false
```

### Tip 3: Use Debugger Statement
```javascript
function complexFunction() {
    debugger;  // Execution pauses here in DevTools
    // Step through code line by line
}
```

### Tip 4: Test in Isolation
```javascript
// Test one function at a time
function add(a, b) {
    return a + b;
}

// Test it
console.log(add(2, 3));  // Should be 5
console.log(add(-1, 1));  // Should be 0
```

---

## 🚀 PERFORMANCE TESTING

**For scripts that might be slow:**

```javascript
// Measure execution time
console.time('myFunction');
myFunction();
console.timeEnd('myFunction');
// Output: myFunction: 123.456ms
```

**For memory usage:**
```javascript
// Check memory before
const before = process.memoryUsage();

// Run your code
heavyOperation();

// Check memory after
const after = process.memoryUsage();
console.log('Memory used:', (after.heapUsed - before.heapUsed) / 1024 / 1024, 'MB');
```

---

## 📝 DOCUMENTATION STANDARDS

**Every JS file should have:**

```javascript
/**
 * FILENAME: script-name.js
 * PURPOSE: What this script does
 * USAGE: How to run it
 * DEPENDENCIES: What it needs
 * AUTHOR: Your name
 * LAST UPDATED: Date
 */

// Example function documentation
/**
 * Processes user data and returns formatted result
 * @param {Object} userData - User data object
 * @param {string} userData.name - User's name
 * @param {number} userData.age - User's age
 * @returns {string} Formatted user info
 */
function processUser(userData) {
    // Implementation
}
```

---

## 🔧 TOOLS & EXTENSIONS

### Recommended Extensions:
1. **ESLint** - JavaScript linter
2. **Prettier** - Code formatter
3. **JavaScript Debugger** - Built-in debugging
4. **Node.js Extension Pack** - For Node.js development

### Command Line Tools:
```bash
# Check syntax (if you have Node.js)
node --check script.js

# Run with debugging
node --inspect script.js
```

---

## 📊 TESTING MATRIX

| File Type | Test Method | Check For |
|-----------|-------------|-----------|
| Test scripts | `node test.js` | Pass/fail, accuracy |
| Automation | `node script.js` | Correct changes, logs |
| Widgets | Browser test | Appearance, function |
| Error tracking | Browser console | Catches errors |
| Build tools | Run + verify output | Correct files created |

---

## 🚨 CRITICAL CHECKS

**Before deploying to live site:**

```
☐ All JS files pass syntax check
☐ All test scripts pass
☐ All widgets work in browser
☐ No console errors
☐ No unhandled promise rejections
☐ Performance acceptable (<1s for most operations)
☐ Memory usage reasonable
☐ Works on mobile browsers
```

---

## 💡 QUICK REFERENCE

**Syntax Error?**
→ Check Problems panel (Ctrl+Shift+M)

**Runtime Error?**
→ Check Console (F12 in browser, or terminal for Node)

**Logic Error?**
→ Add console.log, test with different inputs

**Performance Issue?**
→ Use console.time/timeEnd

**Memory Leak?**
→ Check process.memoryUsage()

---

**Status:** ACTIVE - Use for all JavaScript development  
**Priority:** CRITICAL - 100+ JS files need testing  
**Integration:** Works with DEBUGGER_EXTENSIONS_GUIDE.md

**REMEMBER: Syntax check → Run test → Verify output → Then push!** 🔧
