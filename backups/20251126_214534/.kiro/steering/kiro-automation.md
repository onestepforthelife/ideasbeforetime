---
inclusion: always
---

# Kiro Automation for This Project

## System Configuration

**Environment:** Windows 11, Python 3.14.0, No Node.js/Git
**Deployment:** Manual upload to Cloudflare Pages dashboard
**Automation:** Python scripts + Kiro hooks

## Available Automation Scripts

### 1. Validate Innovations
```powershell
python scripts/validate_innovations.py
```
Checks innovations.json for errors before deployment.

### 2. Generate Sitemap
```powershell
python scripts/generate_sitemap.py
```
Creates sitemap.xml from innovations.json data.

### 3. Run All Automation
```powershell
python scripts/kiro_automation.py
```
Runs validation + sitemap generation in sequence.

## Kiro Hooks Active

1. **Auto-validate on save** - Validates innovations.json when saved
2. **Content reminder** - Reminds to update content every 30 days
3. **Manual automation trigger** - Run full automation on demand

## Workflow for Updates

1. Edit `innovations.json` (Kiro validates on save)
2. Run `python scripts/kiro_automation.py` (or use Kiro hook)
3. Review generated `sitemap.xml`
4. Upload changed files to Cloudflare Pages dashboard

## Important Notes

- Use `python -m pip` for package management (pip not in PATH)
- PowerShell scripts need `-ExecutionPolicy Bypass`
- No Git automation (manual file management)
- No Node.js scripts (use Python equivalents)

## When Helping User

- Prefer Python scripts over JavaScript
- Don't suggest npm/node commands
- Don't suggest git commands
- Provide PowerShell commands for Windows
- Use Kiro hooks for automation triggers
