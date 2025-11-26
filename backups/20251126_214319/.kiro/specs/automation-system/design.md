# Design Document - Automation System

## Overview

The automation system transforms the Ideas Before Time website from a manually-maintained static site into a semi-automated content management system. It consists of four main components: GitHub Actions for deployment, a JSON-based content system, automated sitemap generation, and Kiro Hooks for reminders.

## Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Actions                             │
│  (Edit JSON file, Save, Commit to GitHub)                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  GitHub Repository                           │
│  - innovations.json (data file)                             │
│  - .github/workflows/deploy.yml (automation)                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              GitHub Actions Workflow                         │
│  1. Validate JSON                                           │
│  2. Generate sitemap.xml                                    │
│  3. Build innovations page                                  │
│  4. Deploy to Cloudflare Pages                              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              Cloudflare Pages                                │
│  - Live website with updated content                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Kiro Hook (Separate)                        │
│  - Checks last update date                                  │
│  - Sends reminder after 30 days                             │
│  - Provides quick links to edit                             │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Innovations Data File (innovations.json)

**Purpose:** Single source of truth for all innovation entries

**Structure:**
```json
{
  "innovations": [
    {
      "id": "silent-dj-2001",
      "year": 2001,
      "title": "Silent DJ",
      "shortDescription": "Wireless headphone parties",
      "fullDescription": "Detailed description...",
      "impact": "High",
      "category": "Entertainment",
      "image": "silent-dj-2001.jpg",
      "status": "published"
    }
  ],
  "metadata": {
    "lastUpdated": "2025-11-26",
    "totalInnovations": 9,
    "version": "1.0"
  }
}
```

**Validation Rules:**
- All fields required except fullDescription
- Year must be between 2000-2030
- ID must be unique and URL-safe
- Impact must be: Low, Medium, High, Revolutionary
- Category must be predefined list

### 2. GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

**Triggers:**
- Push to main branch
- Manual workflow dispatch

**Steps:**
1. Checkout code
2. Validate innovations.json
3. Run sitemap generator script
4. Run innovations page generator script
5. Deploy to Cloudflare Pages
6. Verify deployment
7. Log results

**Environment Variables:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `PROJECT_NAME`

### 3. Sitemap Generator Script

**File:** `scripts/generate-sitemap.js`

**Input:** innovations.json
**Output:** sitemap.xml

**Logic:**
```javascript
// Read innovations.json
// For each innovation:
//   - Add URL to sitemap
//   - Set priority based on year (newer = higher)
//   - Set changefreq to monthly
//   - Set lastmod to current date
// Add static pages (library, about, etc.)
// Validate XML structure
// Write sitemap.xml
```

### 4. Innovations Page Generator

**File:** `scripts/generate-innovations-page.js`

**Input:** innovations.json
**Output:** innovations-table.html

**Features:**
- Generates HTML with embedded data
- Includes search functionality
- Includes sort functionality
- Responsive design
- No external dependencies

### 5. Innovations Table Display

**File:** `innovations-table.html`

**Design Specifications:**

**Layout:**
- CSS Grid with auto-fit columns
- Minimum column width: 300px
- Gap: 24px
- Padding: 40px

**Card Design:**
- White background with subtle shadow
- Border-radius: 12px
- Hover effect: lift + shadow increase
- Transition: all 0.3s ease

**Typography:**
- Title: 24px, bold, purple gradient
- Year: 18px, semi-bold, gray
- Description: 16px, line-height 1.6
- Category badge: 12px, uppercase

**Search Bar:**
- Fixed at top
- Full width with max-width 600px
- Rounded corners
- Icon inside input
- Real-time filtering

**Sort Controls:**
- Buttons for: Year, Title, Impact
- Active state: purple background
- Inactive state: white with border

**Mobile Responsive:**
- < 768px: Single column
- 768px - 1024px: 2 columns
- > 1024px: 3 columns

### 6. Kiro Hook for Reminders

**File:** `.kiro/hooks/content-reminder.json`

**Configuration:**
```json
{
  "name": "Content Update Reminder",
  "trigger": "on_session_start",
  "condition": "days_since_last_update > 30",
  "action": {
    "type": "message",
    "content": "It's been 30 days since your last innovation update. Would you like to add new innovations to your site?"
  },
  "quickActions": [
    {
      "label": "Edit innovations.json",
      "action": "open_file",
      "file": "innovations.json"
    },
    {
      "label": "View current innovations",
      "action": "open_url",
      "url": "https://ideas-before-time.pages.dev/innovations-table.html"
    }
  ]
}
```

## Data Models

### Innovation Entry
```typescript
interface Innovation {
  id: string;              // URL-safe identifier
  year: number;            // 2000-2030
  title: string;           // Max 100 chars
  shortDescription: string; // Max 200 chars
  fullDescription?: string; // Optional, markdown supported
  impact: 'Low' | 'Medium' | 'High' | 'Revolutionary';
  category: string;        // Predefined categories
  image: string;           // Filename in images/
  status: 'draft' | 'published';
}

interface InnovationsData {
  innovations: Innovation[];
  metadata: {
    lastUpdated: string;   // ISO date
    totalInnovations: number;
    version: string;
  };
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Deployment Automation
*For any* file change committed to GitHub, the system should automatically deploy to Cloudflare Pages within 2 minutes without manual intervention.
**Validates: Requirements 1.1, 1.4**

### Property 2: JSON Validation
*For any* innovations.json file, if it contains invalid data, the system should reject the deployment and provide specific error messages before any changes go live.
**Validates: Requirements 3.2, 3.3**

### Property 3: Sitemap Synchronization
*For any* innovation added to or removed from innovations.json, the sitemap.xml should automatically reflect that change with the correct URL and metadata.
**Validates: Requirements 5.1, 5.2**

### Property 4: Search Functionality
*For any* search query entered by a user, the innovations table should display only innovations whose title, year, or description contains the search term (case-insensitive).
**Validates: Requirements 4.2**

### Property 5: Sort Consistency
*For any* column used for sorting, clicking the sort button should reorder all innovations by that column's values in ascending order, and clicking again should reverse to descending order.
**Validates: Requirements 4.3**

### Property 6: Reminder Timing
*For any* 30-day period without updates, the Kiro Hook should trigger exactly once at the next session start and not trigger again until another 30 days pass.
**Validates: Requirements 2.1, 2.5**

### Property 7: Responsive Layout
*For any* screen width, the innovations table should display in an appropriate layout: 1 column for mobile (<768px), 2 columns for tablet (768-1024px), and 3 columns for desktop (>1024px).
**Validates: Requirements 4.4**

### Property 8: Data Preservation
*For any* sitemap generation failure, the system should preserve the previous valid sitemap.xml file and log the error without breaking the site.
**Validates: Requirements 5.5**

## Error Handling

### JSON Validation Errors
- **Error:** Invalid JSON syntax
- **Handling:** Display line number and character position, prevent deployment
- **Recovery:** User fixes JSON, commits again

### Deployment Failures
- **Error:** Cloudflare API error
- **Handling:** Retry up to 3 times with exponential backoff
- **Recovery:** If all retries fail, send notification and preserve previous deployment

### Sitemap Generation Errors
- **Error:** Invalid XML generated
- **Handling:** Keep previous sitemap, log error details
- **Recovery:** Fix data issue, regenerate

### Missing Images
- **Error:** Innovation references non-existent image
- **Handling:** Use placeholder image, log warning
- **Recovery:** Upload missing image, redeploy

## Testing Strategy

### Unit Tests
- JSON validation logic
- Sitemap generation with various inputs
- Search filter function
- Sort function
- Date calculation for reminders

### Integration Tests
- Full workflow: JSON update → sitemap generation → deployment
- GitHub Actions workflow execution
- Kiro Hook trigger conditions

### Manual Testing
- Add new innovation via JSON
- Verify it appears on innovations table
- Verify sitemap updated
- Test search and sort
- Test on mobile devices
- Verify reminder triggers after 30 days

## Performance Considerations

- **JSON File Size:** Keep under 100KB for fast loading
- **Image Optimization:** All images should be optimized and lazy-loaded
- **Search Performance:** Client-side search should handle up to 100 innovations without lag
- **Deployment Time:** Target under 2 minutes from commit to live

## Security Considerations

- **API Tokens:** Store in GitHub Secrets, never in code
- **JSON Validation:** Prevent XSS by sanitizing all user-provided content
- **Access Control:** Only authorized users can push to main branch
- **HTTPS:** All connections use HTTPS

## Documentation Requirements

### User Documentation
1. **AUTOMATION_GUIDE.md** - How to use the automation system
2. **ADDING_INNOVATIONS.md** - Step-by-step guide to add innovations
3. **TROUBLESHOOTING.md** - Common issues and solutions

### Technical Documentation
1. **ARCHITECTURE.md** - System architecture and design decisions
2. **API_REFERENCE.md** - GitHub Actions and script APIs
3. **DEPLOYMENT_LOG.md** - Automated log of all deployments

### Maintenance Documentation
1. **MONTHLY_CHECKLIST.md** - What to check each month
2. **BACKUP_PROCEDURES.md** - How to backup and restore
3. **UPGRADE_GUIDE.md** - How to upgrade automation system

## Future Enhancements

- Email notifications for deployment status
- Automated backups to cloud storage
- Analytics integration for innovation views
- A/B testing for different layouts
- Multi-language support
- RSS feed for new innovations
