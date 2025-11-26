# Kiro Spec Execution Prompt

## 🎯 Goal
Execute the website-fixes spec to add navigation to all pages, fix broken links, and enhance business insights.

## 📋 What to Do

### Phase 1: Review & Improve Navigation (TASK-1)
1. Read `Cloudfare/common-navigation.js`
2. Verify all links work (no broken hrefs)
3. Ensure body padding is properly injected
4. Test mobile menu functionality

### Phase 2: Add Navigation to Innovation Pages (TASK-2)
For each of these 9 files:
- `Cloudfare/silent-dj-2001.html`
- `Cloudfare/tv-storage-2002.html`
- `Cloudfare/music-ringtones-2003.html`
- `Cloudfare/dual-sim-2003.html`
- `Cloudfare/universal-health-id-2009.html`
- `Cloudfare/3d-imaging-2009.html`
- `Cloudfare/digital-money-2012.html`
- `Cloudfare/moveable-dividers-2012.html`
- `Cloudfare/dashboard-simplification-2017.html`

**Do this:**
1. Add `<script src="common-navigation.js"></script>` before `</body>` tag
2. Fix broken link: Change `href="../library.html"` to `href="library.html"`
3. Verify no layout breaks

### Phase 3: Add Navigation to CV & Reports (TASK-3, TASK-4)
**CV Page:**
- `Cloudfare/cv-preview.html` - Add navigation script

**Report Pages:**
- `Cloudfare/specialty-chemicals-index.html`
- `Cloudfare/specialty-chemicals-qa.html`
- `Cloudfare/specialty-chemicals-value-chain.html`

For each: Add `<script src="common-navigation.js"></script>` before `</body>`

### Phase 4: Enhance Business Insights (TASK-5, TASK-6)
1. Review `Cloudfare/business-insights-enhanced.html`
2. Ensure each insight has:
   - Timestamp: "📅 Nov 25, 2025 5:30 PM IST"
   - Source: "📰 Source Name"
3. Add "Last Updated" at top of page
4. Add auto-refresh script (4 hours = 14400000ms)

### Phase 5: Update Documentation (TASK-10)
1. Update `Cloudfare/DEPLOYMENT_LOG.txt` with completion entry
2. Mark `Cloudfare/FIXES_NEEDED.txt` as resolved

## ⚠️ Important Rules

### DO:
- ✅ Work with EXISTING files - don't recreate them
- ✅ Use `strReplace` for modifications (not fsWrite)
- ✅ Test each change before moving to next
- ✅ Follow purple gradient theme (#667eea to #764ba2)
- ✅ Maintain existing functionality
- ✅ Keep watermarks: "AV © Onestepforthelife"

### DON'T:
- ❌ Break existing navigation on library.html or about.html
- ❌ Remove password protection from index.html
- ❌ Change design/styling of pages
- ❌ Create new files unless absolutely necessary
- ❌ Use absolute paths - use relative paths

## 🔍 Verification Checklist

After completion, verify:
- [ ] All 13+ pages have navigation header/footer
- [ ] All navigation links work (no 404s)
- [ ] Innovation page back buttons work
- [ ] Mobile menu toggles properly
- [ ] Business insights show timestamps & sources
- [ ] No console errors on any page
- [ ] No layout breaks or overlaps
- [ ] Watermarks still visible

## 📝 Expected Output

When done, you should have:
- 13 HTML files modified with navigation
- 1 business insights file enhanced
- 2 documentation files updated
- 0 broken links
- 100% navigation coverage (except index.html)

## 🚀 How to Execute

Simply tell Kiro:
```
Execute the website-fixes spec following EXECUTION_PROMPT.md
Work through tasks 1-10 systematically
Test each page after modification
Update documentation when complete
```

## 📊 Progress Tracking

Track completion:
- [ ] TASK-1: Navigation improved
- [ ] TASK-2: 9 innovation pages done
- [ ] TASK-3: CV preview done
- [ ] TASK-4: 3 report pages done
- [ ] TASK-5: Business insights enhanced
- [ ] TASK-6: Auto-refresh added
- [ ] TASK-7: Existing pages verified
- [ ] TASK-8: Reports hub created
- [ ] TASK-9: Final testing done
- [ ] TASK-10: Documentation updated

## 🎯 Success Criteria

Spec is complete when:
1. Every page (except index.html) has consistent navigation
2. All links work without errors
3. Business insights show timestamps and sources
4. Documentation is updated
5. No broken functionality
6. Mobile responsive on all pages

---

**Estimated Total Time**: 3-4 hours
**Priority**: HIGH
**Deadline**: Complete before next deployment
