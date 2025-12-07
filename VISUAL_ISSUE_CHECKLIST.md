# 🎨 VISUAL ISSUE CHECKLIST
## When User Reports "Bad Look" or Visual Problem

**Created:** December 7, 2025  
**Purpose:** Systematic approach to visual issues  
**Status:** MANDATORY - Use every time

---

## 📋 MANDATORY QUESTIONS TO ASK

**When user says "bad look", "looks wrong", "broken layout":**

```
Ask these questions BEFORE fixing:

1. What exactly looks bad?
   - Layout/alignment?
   - Images?
   - Colors?
   - Spacing?
   - Text?
   - Mobile view?

2. What should it look like?
   - Describe expected appearance
   - Reference another page that's correct

3. Where exactly?
   - Which section?
   - Desktop or mobile?
   - Which browser?
```

---

## 🔍 SYSTEMATIC VISUAL DIAGNOSTIC

**Step 1: Get Specifics (30 seconds)**
- Ask clarifying questions
- Get exact location
- Understand expected vs actual

**Step 2: Check Live Site (1 minute)**
- Visit actual URL user provided
- Open browser DevTools
- Check Elements tab for layout
- Check Console for errors

**Step 3: Compare with Code (1 minute)**
- Read local file
- Compare with live site
- Identify differences

**Step 4: Identify Root Cause (2 minutes)**
- Layout issue? (CSS grid, flexbox, width)
- Image issue? (src, size, loading)
- Color issue? (wrong hex, missing CSS)
- Spacing issue? (padding, margin, gap)
- Alignment issue? (text-align, justify-content)

**Step 5: Fix with Proof (5 minutes)**
- Fix the actual issue
- Test locally
- Show before/after
- Verify on live site

---

## 🎯 COMMON VISUAL ISSUES & CHECKS

### Layout Broken
```
Check:
☐ CSS grid/flexbox properties
☐ Width/height values (50% vs 100%)
☐ Display property (block, flex, grid)
☐ Position property (relative, absolute)
☐ Overflow property
```

### Images Not Showing/Wrong Size
```
Check:
☐ Image src path correct
☐ Image width/height (50% vs 100%)
☐ Object-fit property
☐ Image file exists
☐ Loading attribute
```

### Colors Wrong
```
Check:
☐ Background color
☐ Text color
☐ Border color
☐ Gradient values
☐ CSS file loaded
```

### Spacing Issues
```
Check:
☐ Padding values
☐ Margin values
☐ Gap property (grid/flex)
☐ Line-height
☐ Letter-spacing
```

### Alignment Issues
```
Check:
☐ Text-align (left, center, right)
☐ Justify-content (flex)
☐ Align-items (flex)
☐ Grid alignment
☐ Float property
```

### Mobile View Broken
```
Check:
☐ Media queries
☐ Viewport meta tag
☐ Responsive units (%, vw, vh)
☐ Mobile-specific CSS
☐ Touch targets size
```

---

## 🚫 NEVER DO

❌ Assume what "bad look" means
❌ Fix without asking clarifying questions
❌ Change code without seeing actual problem
❌ Say "fixed" without verifying on live site
❌ Guess which CSS property is wrong

---

## ✅ ALWAYS DO

✅ Ask: "What exactly looks bad?"
✅ Check live site first
✅ Identify root cause before fixing
✅ Test fix on live site
✅ Show before/after proof

---

## 📊 VAGUE TERMS DICTIONARY

| User Says | Ask This |
|-----------|----------|
| "bad look" | What specifically looks bad? Layout/images/colors/spacing? |
| "not working" | What's expected vs what's happening? |
| "broken" | What's broken exactly? Which part? |
| "wrong" | What should it be? What is it now? |
| "issue" | What's the issue? Can you describe? |
| "problem" | What's the problem? Where exactly? |
| "doesn't look right" | What should it look like? What's different? |

---

## 🎯 SUCCESS CRITERIA

**Good Response:**
```
User: "bad look here"
Me: "What exactly looks bad? Layout/images/colors/spacing?
     Which section? Desktop or mobile?"
User: "Images are half-width, should be full"
Me: [Checks live site] [Finds width: 50%] [Fixes to 100%]
    "Fixed. Changed image width from 50% to 100% ✅"
```

**Bad Response:**
```
User: "bad look here"
Me: [Assumes it's image width] [Fixes without asking]
    "Fixed image width ✅"
User: "No, the colors are wrong"
Me: [Wasted time fixing wrong thing]
```

---

## 💡 PREVENTION FOREVER

**Add to MASTER_ENFORCEMENT.js:**
```javascript
// Block if vague issue without clarification
if (userMessage.includes('bad look') || 
    userMessage.includes('not working') ||
    userMessage.includes('broken')) {
    
    if (!askedClarifyingQuestion) {
        BLOCK_RESPONSE();
        FORCE_ASK_CLARIFICATION();
    }
}
```

**Add to START_SESSION.bat:**
```batch
echo [CHECK] When user reports visual issue:
echo          1. Ask clarifying questions FIRST
echo          2. Check live site
echo          3. Identify root cause
echo          4. Fix with proof
echo          5. Verify on live site
```

---

**Status:** ACTIVE - Use for all visual issues  
**Priority:** CRITICAL - Prevents wasted time  
**Enforcement:** Mandatory questions before fixing  
**Result:** Fix right thing first time

**REMEMBER: Clarify → Check → Identify → Fix → Verify**
