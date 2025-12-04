# 📊 REPORT BLUR & PREVIEW SYSTEM RULES

**Created:** December 4, 2025  
**Purpose:** Rules for implementing 30% preview + blur system on market reports

---

## 🎯 THE SYSTEM

**What it does:**
- Shows first 30% of report content (unblurred)
- Blurs remaining 70% with visual effect
- "Request Full Access" button to get full report via email
- Professional, conversion-focused design

---

## 📋 IMPLEMENTATION RULES

### Rule 1: Which Reports Get Blur System
✅ **Apply to:** All market research reports (Acrylic, Poloxamer, Paper Pulp, Nickel ESG, etc.)
✅ **Don't apply to:** Blog posts, about page, CV, tools, SPO

### Rule 2: 30% Preview Calculation
- Count total sections in report
- Show first 30% of sections (rounded up)
- Example: 10 sections → show 3 sections unblurred

### Rule 3: Blur Effect Styling
```css
.blurred-content {
    filter: blur(8px);
    pointer-events: none;
    user-select: none;
    position: relative;
}

.blur-overlay {
    background: linear-gradient(to bottom, 
        rgba(255,255,255,0) 0%, 
        rgba(255,255,255,0.95) 50%, 
        rgba(255,255,255,1) 100%);
}
```

### Rule 4: Request Access Button
- Positioned at blur transition point
- Clear call-to-action: "Request Full Access"
- Opens email form (pre-filled with report name)
- Professional styling matching site theme

### Rule 5: Email Collection
- Form asks for: Name, Email, Company (optional)
- Validates email format
- Sends to: onestepforthelife@gmail.com
- Auto-reply to user confirming request

### Rule 6: Security
- No way to "unblur" via browser tools
- Content is in HTML but visually hidden
- For full security: use Cloudflare Access (separate system)

---

## 🔧 TECHNICAL IMPLEMENTATION

### Step 1: Add Blur CSS
```html
<style>
.preview-section { /* First 30% */ }
.blurred-section { 
    filter: blur(8px);
    pointer-events: none;
}
.access-cta {
    position: sticky;
    bottom: 20px;
    text-align: center;
    z-index: 100;
}
</style>
```

### Step 2: Mark Sections
```html
<!-- First 30% -->
<section class="preview-section">...</section>

<!-- Remaining 70% -->
<section class="blurred-section">...</section>
```

### Step 3: Add CTA Button
```html
<div class="access-cta">
    <button onclick="requestAccess()">
        🔓 Request Full Access - Free
    </button>
</div>
```

### Step 4: Email Form
```javascript
function requestAccess() {
    const reportName = document.title;
    // Show modal with form
    // Collect: name, email, company
    // Send email to Amit
}
```

---

## ✅ QUALITY CHECKLIST

Before marking report as "blur-ready":
```
☐ First 30% clearly visible (no blur)
☐ Remaining 70% properly blurred
☐ Smooth transition between preview/blur
☐ CTA button visible and clickable
☐ Email form works
☐ Mobile responsive
☐ Professional appearance
☐ No console errors
```

---

## 🎨 DESIGN PRINCIPLES

1. **Professional** - Looks like premium content
2. **Clear Value** - User sees enough to want more
3. **Easy Access** - One-click to request full report
4. **No Friction** - Simple form, fast response
5. **Trust Building** - Free access, just need email

---

## 📊 CONVERSION OPTIMIZATION

### Good Preview (30%):
- Executive Summary ✅
- Key Findings ✅
- Market Overview ✅
- First few data points ✅

### Blurred Content (70%):
- Detailed Analysis
- Full Data Tables
- Competitive Landscape
- Future Projections
- Recommendations

**Why this works:** User gets value from preview, wants full insights.

---

## 🚫 COMMON MISTAKES TO AVOID

1. ❌ Blurring too much (>70%) - User sees no value
2. ❌ Blurring too little (<70%) - User doesn't need full report
3. ❌ Ugly blur effect - Looks unprofessional
4. ❌ Broken CTA button - Lost conversions
5. ❌ Complex form - User abandons
6. ❌ No mobile optimization - 50% of traffic lost

---

## 🔄 MAINTENANCE

### When Adding New Report:
1. Create report HTML
2. Identify sections (count total)
3. Calculate 30% (round up)
4. Add blur classes to remaining sections
5. Add CTA button
6. Test on desktop + mobile
7. Verify email form works

### When Updating Existing Report:
1. Check if section count changed
2. Recalculate 30% if needed
3. Adjust blur boundaries
4. Test everything still works

---

## 📈 METRICS TO TRACK

- Views per report
- Request access clicks
- Email submissions
- Conversion rate (views → emails)
- Time on page (preview vs full access)

**Target:** 10-20% conversion rate (views → email requests)

---

## 🎯 GOLDEN RULE

**The 30/70 split is about VALUE, not just numbers:**
- 30% should make user think "This is valuable!"
- 70% should make user think "I need the rest!"
- Balance between giving value and creating desire

---

**Last Updated:** December 4, 2025  
**Status:** ACTIVE - Use for all market reports  
**Priority:** HIGH - Affects lead generation
