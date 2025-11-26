# Website Fixes - Requirements

## Overview
Fix critical issues in the Ideas Before Time website to ensure consistent navigation, proper accessibility, and complete functionality across all pages. Work with EXISTING files and improve them systematically.

## Problem Statement
The website currently has:
1. Missing navigation and footer on 13+ pages (innovation pages, CV, reports)
2. Broken links in innovation pages (href="../library.html" should be "library.html")
3. Inaccessible market report pages from main navigation
4. Business insights lacking timestamps and sources
5. Inconsistent user experience across different sections
6. common-navigation.js exists but NOT integrated into pages

## Acceptance Criteria

### AC1: Universal Navigation System
**Given** any page on the website
**When** a user loads the page
**Then** they should see a consistent navigation bar with links to:
- Home (index.html)
- Innovation Library (library.html)
- Business Insights (business-insights-enhanced.html)
- Market Reports (specialty-chemicals-index.html)
- CV Preview (cv-preview.html)
- About (about.html)

**And** a footer with:
- Quick links to main sections
- Contact information
- Copyright notice
- Last updated timestamp

### AC2: Navigation Integration
**Given** the following pages exist without navigation:
- cv-preview.html
- All 9 innovation pages (silent-dj-2001.html through dashboard-simplification-2017.html)
- specialty-chemicals-index.html
- specialty-chemicals-qa.html
- specialty-chemicals-value-chain.html

**When** navigation system is implemented
**Then** all these pages must include:
- `<script src="common-navigation.js"></script>` before closing `</body>` tag
- Proper body padding to accommodate fixed navbar
- No broken links or layout issues

### AC2b: Fix Broken Links
**Given** innovation pages have hardcoded `href="../library.html"`
**When** links are clicked
**Then** they should work correctly using `href="library.html"` or `href="/library.html"`

### AC3: Market Report Accessibility
**Given** market report pages exist
**When** a user navigates to Business Insights section
**Then** they should see clear links to:
- Specialty Chemicals Index
- Specialty Chemicals Q&A
- Specialty Chemicals Value Chain
- Final Acrylic Market Report (if exists)

**And** all report pages should have preview timer functionality

### AC4: Business Insights Enhancement
**Given** the business-insights-enhanced.html page
**When** a user views any insight
**Then** each insight must display:
- Timestamp in format "Nov 24, 2025 5:30 PM IST"
- Source attribution
- Last updated indicator at page top

**And** the page should auto-refresh every 4 hours

### AC5: Preview Timer Protection
**Given** any market report or premium content page
**When** a user accesses the page
**Then** preview-timer.js should be active
**And** content should be protected appropriately

## Success Metrics
- All pages have consistent navigation (100% coverage)
- Zero broken links in navigation
- All market reports accessible from main navigation
- Business insights show timestamps and sources
- User can navigate entire site without dead ends

## Out of Scope
- Design changes to existing pages
- New content creation
- Performance optimization
- SEO improvements
- Mobile responsiveness changes (already implemented)

## Dependencies
- common-navigation.js must be created
- preview-timer.js already exists
- All HTML pages must be accessible in Cloudfare/ directory

## Constraints
- Must maintain existing purple gradient theme (#667eea to #764ba2)
- Must preserve existing functionality
- Must not break password protection on index.html
- Must follow PROJECT_STANDARDS.txt guidelines
