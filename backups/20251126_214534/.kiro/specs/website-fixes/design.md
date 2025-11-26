# Website Fixes - Design

## Architecture Overview

### Component Structure
```
Common Navigation System
├── common-navigation.js (new)
│   ├── Header Component
│   │   ├── Logo/Title
│   │   ├── Navigation Menu
│   │   └── Mobile Menu Toggle
│   └── Footer Component
│       ├── Quick Links
│       ├── Contact Info
│       └── Copyright
├── preview-timer.js (existing)
└── Page Integration Layer
```

## Correctness Properties

### P1: Navigation Consistency [AC1, AC2]
**Property**: ∀ page ∈ Website → hasNavigation(page) ∧ hasFooter(page)

**Verification**:
- Check all HTML files in Cloudfare/ directory
- Verify common-navigation.js is loaded
- Confirm navigation renders on page load

**Implementation**:
- Create common-navigation.js with header/footer HTML
- Inject via JavaScript on DOMContentLoaded
- Use consistent styling matching existing theme

### P2: Link Integrity [AC1, AC3]
**Property**: ∀ link ∈ Navigation → isValid(link.href) ∧ targetExists(link.href)

**Verification**:
- All navigation links point to existing files
- No 404 errors when clicking navigation
- Relative paths work from any page location

**Implementation**:
- Use root-relative paths (e.g., /library.html)
- Test from subdirectories if any exist
- Validate all hrefs before deployment

### P3: Timestamp Accuracy [AC4]
**Property**: ∀ insight ∈ BusinessInsights → hasTimestamp(insight) ∧ hasSource(insight)

**Verification**:
- Each insight card displays formatted timestamp
- Source attribution is visible
- Page shows "Last Updated" at top

**Implementation**:
- Add data attributes to insight cards
- Format timestamps using JavaScript Date
- Display in IST timezone

### P4: Auto-Refresh Behavior [AC4]
**Property**: BusinessInsightsPage → refreshesEvery(4 * HOURS)

**Verification**:
- Page reloads after 4 hours
- User sees notification before refresh
- Refresh doesn't interrupt active reading

**Implementation**:
- setTimeout for 4 hours (14400000ms)
- Show 10-second countdown notification
- Use location.reload()

### P5: Preview Timer Integration [AC3, AC5]
**Property**: ∀ reportPage ∈ MarketReports → hasPreviewTimer(reportPage)

**Verification**:
- preview-timer.js loads on all report pages
- Timer displays correctly
- Content protection works

**Implementation**:
- Add <script src="/preview-timer.js"></script> to all report pages
- Verify timer initialization
- Test content blur/protection

## Component Specifications

### common-navigation.js

**Responsibilities**:
1. Inject navigation header into page
2. Inject footer into page
3. Highlight current page in navigation
4. Handle mobile menu toggle

**Interface**:
```javascript
// Auto-executes on DOMContentLoaded
// No external API needed

// Internal functions:
function createHeader() → HTMLElement
function createFooter() → HTMLElement
function getCurrentPage() → string
function highlightCurrentNav() → void
function initMobileMenu() → void
```

**Styling Requirements**:
- Match existing purple gradient theme
- Responsive design (mobile-friendly)
- Consistent with library.html navigation style
- Smooth transitions for mobile menu

### Business Insights Enhancement

**Data Structure**:
```javascript
{
  insight: {
    title: string,
    content: string,
    timestamp: Date,
    source: string,
    category: string
  }
}
```

**Display Format**:
```
[Category Badge]
Title
Content...
📅 Nov 24, 2025 5:30 PM IST | 📰 Source Name
```

## File Modifications Required

### New Files
1. `common-navigation.js` - Navigation system

### Modified Files
1. `cv-preview.html` - Add navigation
2. `silent-dj-2001.html` - Add navigation
3. `tv-storage-2002.html` - Add navigation
4. `music-ringtones-2003.html` - Add navigation
5. `dual-sim-2003.html` - Add navigation
6. `universal-health-id-2009.html` - Add navigation
7. `3d-imaging-2009.html` - Add navigation
8. `digital-money-2012.html` - Add navigation
9. `moveable-dividers-2012.html` - Add navigation
10. `dashboard-simplification-2017.html` - Add navigation
11. `specialty-chemicals-index.html` - Add navigation + preview timer
12. `specialty-chemicals-qa.html` - Add navigation + preview timer
13. `specialty-chemicals-value-chain.html` - Add navigation + preview timer
14. `business-insights-enhanced.html` - Add timestamps, sources, auto-refresh

### Unchanged Files
- `index.html` (login page - no navigation needed)
- `library.html` (already has navigation)
- `about.html` (verify navigation exists)
- `timeline.html` (verify navigation exists)

## Integration Points

### Navigation Injection
```html
<!-- Add to <head> of each page -->
<script src="/common-navigation.js"></script>

<!-- Add to <body> start -->
<div id="site-header"></div>

<!-- Add to <body> end -->
<div id="site-footer"></div>
```

### Preview Timer Integration
```html
<!-- Add to <head> of report pages -->
<script src="/preview-timer.js"></script>
```

## Error Handling

### Navigation Load Failure
- Fallback: Show basic text links
- Log error to console
- Don't break page functionality

### Auto-Refresh Failure
- Catch and log error
- Don't show error to user
- Retry on next interval

### Preview Timer Failure
- Content remains accessible
- Log error for debugging
- Don't block page load

## Testing Strategy

### Manual Testing Checklist
- [ ] Navigate to each page and verify header/footer appear
- [ ] Click all navigation links from different pages
- [ ] Verify current page is highlighted in navigation
- [ ] Test mobile menu toggle
- [ ] Check business insights timestamps display
- [ ] Verify auto-refresh countdown appears after 4 hours
- [ ] Test preview timer on all report pages
- [ ] Verify no console errors on any page

### Browser Testing
- Chrome (primary)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- common-navigation.js should be < 10KB
- Navigation injection should complete in < 100ms
- No layout shift when navigation loads
- Minimal impact on page load time

## Accessibility

- Navigation must be keyboard accessible
- ARIA labels for mobile menu
- Semantic HTML (nav, footer elements)
- Sufficient color contrast
- Focus indicators visible

## Security

- No inline JavaScript in navigation HTML
- Sanitize any dynamic content
- Maintain existing authentication on index.html
- Preview timer protection remains intact
