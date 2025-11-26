# Automation System Guide

## Overview

The Ideas Before Time website now has a complete automation system that handles:
- ✅ Automatic sitemap generation
- ✅ Automatic innovations page updates
- ✅ Automatic deployment to Cloudflare Pages
- ✅ Monthly reminders to add new content

## How It Works

### 1. You Edit innovations.json

```json
{
  "innovations": [
    {
      "id": "new-innovation-2025",
      "year": 2025,
      "title": "Your New Innovation",
      "shortDescription": "Brief description...",
      "category": "Technology",
      "impact": "High",
      "image": "new-innovation-2025.jpg",
      "status": "published",
      "yearsAhead": "5 years"
    }
  ]
}
```

### 2. Commit and Push to GitHub

```bash
git add innovations.json
git commit -m "Added new innovation"
git push origin main
```

### 3. Automation Runs Automatically

GitHub Actions will:
1. Validate your JSON (catches errors)
2. Generate updated sitemap.xml
3. Update innovations-table.html with new data
4. Deploy everything to Cloudflare Pages

**Time: 2-3 minutes from push to live**

### 4. Kiro Reminds You

Every 30 days, Kiro will remind you to add new innovations when you open it.

## File Structure

```
Cloudfare/
├── innovations.json              # YOUR DATA FILE (edit this)
├── innovations-table.html        # Auto-generated from JSON
├── sitemap.xml                   # Auto-generated from JSON
├── scripts/
│   ├── generate-sitemap.js      # Sitemap generator
│   └── generate-innovations-page.js  # Page generator
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions workflow
└── .kiro/
    └── hooks/
        └── content-reminder.json # 30-day reminder
```

## Adding a New Innovation

### Step 1: Edit innovations.json

Add your new innovation to the `innovations` array:

```json
{
  "id": "unique-id-year",           // URL-safe, unique
  "year": 2025,                      // Year conceptualized
  "title": "Innovation Name",        // Short, clear title
  "shortDescription": "...",         // 1-2 sentences
  "category": "Technology",          // Category name
  "impact": "High",                  // Low, Medium, High, Revolutionary
  "image": "filename.jpg",           // Image filename
  "status": "published",             // published or draft
  "yearsAhead": "5 years"           // How far ahead
}
```

### Step 2: Update metadata

```json
"metadata": {
  "lastUpdated": "2025-11-26",     // Today's date
  "totalInnovations": 10,           // Increment count
  "version": "1.0"
}
```

### Step 3: Commit and push

```bash
git add innovations.json
git commit -m "Added [Innovation Name]"
git push
```

### Step 4: Wait 2-3 minutes

Your site will be live with:
- ✅ New innovation on innovations-table.html
- ✅ Updated sitemap.xml
- ✅ Searchable and sortable
- ✅ SEO optimized

## Manual Testing (Optional)

If you want to test locally before pushing:

```bash
# Validate JSON
node -e "JSON.parse(require('fs').readFileSync('innovations.json', 'utf8'))"

# Generate sitemap
node scripts/generate-sitemap.js

# Update innovations page
node scripts/generate-innovations-page.js
```

## Troubleshooting

### JSON Validation Fails

**Error:** `Unexpected token in JSON`

**Fix:** Check for:
- Missing commas between objects
- Extra commas after last item
- Unescaped quotes in strings
- Missing closing brackets

Use a JSON validator: https://jsonlint.com/

### Deployment Fails

**Error:** `CLOUDFLARE_API_TOKEN not found`

**Fix:** Add secrets to GitHub:
1. Go to GitHub repo → Settings → Secrets
2. Add `CLOUDFLARE_API_TOKEN`
3. Add `CLOUDFLARE_ACCOUNT_ID`

### Sitemap Not Updating

**Check:**
1. Did GitHub Actions run? (Check Actions tab)
2. Did it complete successfully?
3. Wait 5 minutes for Cloudflare cache to clear

### Kiro Hook Not Working

**Check:**
1. Is `.kiro/hooks/content-reminder.json` present?
2. Is Kiro updated to latest version?
3. Check Kiro settings for hook permissions

## Benefits

### Before Automation
- ❌ Manually edit sitemap.xml
- ❌ Manually update innovations-table.html
- ❌ Manually upload 3+ files
- ❌ Easy to forget updates
- ⏱️ 15-20 minutes per update

### After Automation
- ✅ Edit one JSON file
- ✅ Everything else automatic
- ✅ Can't forget (reminders)
- ✅ Consistent, error-free
- ⏱️ 2 minutes per update

## Future Enhancements

Possible additions:
- Email notifications on deployment
- Automated backups
- Analytics integration
- A/B testing
- Multi-language support

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Validate JSON syntax
3. Review this guide
4. Ask Kiro for help

---

**Created:** November 26, 2025  
**Version:** 1.0  
**Status:** Active
