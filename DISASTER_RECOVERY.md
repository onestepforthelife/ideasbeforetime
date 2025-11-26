# Disaster Recovery Guide

## 🚨 Emergency Backup & Recovery System

This guide covers what to do when things go wrong: internet outages, software failures, corrupted files, or system crashes.

---

## Quick Recovery Options

### Option 1: Python Backup System (Recommended)
```powershell
# Create backup
python scripts/backup_system.py

# List all backups
python scripts/backup_system.py list

# Restore latest backup
python scripts/backup_system.py restore

# Restore specific backup
python scripts/backup_system.py restore 20251126_143022
```

### Option 2: Manual Batch File (No Python needed)
```cmd
# Double-click or run:
scripts\manual_backup.bat
```
Works even if Python is broken!

### Option 3: Offline Mode (No Internet needed)
```powershell
# Generate sitemap offline
python scripts/offline_fallback.py

# Validate JSON offline
python scripts/offline_fallback.py validate
```

---

## Backup Locations

### Automatic Backups
- **Location:** `Cloudfare/backups/`
- **Format:** `YYYYMMDD_HHMMSS/`
- **Retention:** Last 10 backups kept automatically
- **Contents:** All critical files + scripts + config

### Manual Backups
- **Location:** `Cloudfare/backups/manual_*/`
- **Created by:** `manual_backup.bat`
- **Never auto-deleted:** Keep forever

### OneDrive Backup (Your System)
- **Location:** `C:\Users\araag\OneDrive\amit Pics personal\`
- **Sync:** Automatic via OneDrive
- **Cloud backup:** Microsoft cloud storage

---

## Disaster Scenarios & Solutions

### 🔥 Scenario 1: Corrupted innovations.json

**Symptoms:** JSON validation fails, site won't update

**Solution:**
```powershell
# Restore from latest backup
python scripts/backup_system.py restore

# Or manually copy from backup
copy backups\[LATEST]\innovations.json .
```

**Prevention:** Always backup before editing!

---

### 🔥 Scenario 2: Internet Down

**Symptoms:** Can't access online tools, APIs fail

**Solution:**
```powershell
# Use offline mode
python scripts/offline_fallback.py

# This generates sitemap without internet
```

**Works:** All Python scripts work offline!

---

### 🔥 Scenario 3: Python Broken

**Symptoms:** Python commands fail, scripts won't run

**Solution:**
```cmd
# Use batch file backup
scripts\manual_backup.bat

# Then reinstall Python or use backup files manually
```

**Alternative:** Copy files manually from `backups/` folder

---

### 🔥 Scenario 4: Entire Project Corrupted

**Symptoms:** Multiple files broken, site not working

**Solution:**
```powershell
# Restore complete backup
python scripts/backup_system.py restore

# Or restore from OneDrive
# Navigate to: C:\Users\araag\OneDrive\amit Pics personal\Cloudfare
# Copy entire folder back
```

**Nuclear option:** Re-download from Cloudflare Pages

---

### 🔥 Scenario 5: Cloudflare Pages Down

**Symptoms:** Site not accessible, deployment fails

**Solution:**
1. Wait for Cloudflare to recover (check status.cloudflare.com)
2. Your files are safe locally
3. Backups are in `backups/` folder
4. OneDrive has cloud copy

**Alternative hosting:**
- Upload to Netlify (drag & drop)
- Upload to GitHub Pages
- Use any static hosting service

---

### 🔥 Scenario 6: Lost All Local Files

**Symptoms:** Hard drive failure, accidental deletion

**Recovery sources:**
1. **OneDrive:** `C:\Users\araag\OneDrive\amit Pics personal\Cloudfare`
2. **Cloudflare Pages:** Download from live site
3. **GitHub:** If you pushed there (you don't use Git currently)

**Steps:**
```powershell
# Restore from OneDrive
cd "C:\Users\araag\OneDrive\amit Pics personal"
xcopy /E /I Cloudfare "C:\Users\araag\Documents\Cloudfare"
```

---

## Backup Schedule Recommendations

### Daily (Automated)
- Run before any major changes
- Use: `python scripts/backup_system.py`

### Weekly (Manual)
- Run: `scripts\manual_backup.bat`
- Keep these backups forever

### Monthly (Cloud)
- Verify OneDrive sync is working
- Check Cloudflare Pages has latest version

---

## Alternative Tools (If Primary Fails)

### If Python Fails
1. **Batch files** - Use `.bat` scripts
2. **PowerShell** - Use `.ps1` scripts
3. **Manual copy** - Copy files by hand

### If Automation Fails
1. **Manual sitemap** - Edit `sitemap.xml` by hand
2. **Static backup** - Use last known good version
3. **Template** - Recreate from template

### If Cloudflare Fails
1. **Netlify** - Drag & drop deployment
2. **Vercel** - Free static hosting
3. **GitHub Pages** - Free hosting
4. **Firebase Hosting** - Free tier available

---

## File Priority (What to Save First)

### Critical (Must backup)
1. `innovations.json` - Your data
2. `sitemap.xml` - SEO critical
3. `index.html` - Entry point
4. `library.html` - Main navigation

### Important (Should backup)
5. All innovation HTML files
6. `scripts/` directory
7. `.kiro/` configuration
8. CSS/JS files

### Nice to have (Can regenerate)
9. Documentation files
10. Temporary files
11. Logs

---

## Testing Your Backups

### Monthly Test
```powershell
# 1. Create backup
python scripts/backup_system.py

# 2. List backups
python scripts/backup_system.py list

# 3. Verify backup exists
dir backups

# 4. Check OneDrive sync
# Open: C:\Users\araag\OneDrive\amit Pics personal\Cloudfare
```

### Quarterly Test
```powershell
# Full restore test (use test folder)
mkdir test_restore
cd test_restore
python ..\scripts\backup_system.py restore
# Verify all files present
```

---

## Emergency Contacts & Resources

### Cloudflare Status
- https://www.cloudflarestatus.com/

### Python Issues
- Reinstall: https://www.python.org/downloads/
- Check version: `python --version`

### OneDrive Issues
- Check sync status in system tray
- OneDrive settings: Right-click OneDrive icon

### Kiro Issues
- Check Kiro documentation
- Restart Kiro IDE

---

## Recovery Checklist

When disaster strikes, follow this order:

- [ ] Don't panic - backups exist!
- [ ] Identify what's broken
- [ ] Check backup availability
- [ ] Choose recovery method
- [ ] Restore from backup
- [ ] Verify restoration worked
- [ ] Test critical functionality
- [ ] Create new backup
- [ ] Document what happened

---

## Prevention Best Practices

1. **Backup before editing** - Always!
2. **Test backups monthly** - Verify they work
3. **Keep OneDrive syncing** - Cloud safety net
4. **Multiple backup methods** - Don't rely on one
5. **Document changes** - Know what you changed
6. **Validate before deploy** - Catch errors early

---

## Backup Automation Integration

### Auto-backup on changes
Add to your workflow:
```powershell
# Before editing
python scripts/backup_system.py

# Edit files
# ...

# After editing
python scripts/kiro_automation.py
```

### Kiro Hook (Future)
Create hook to auto-backup on file save:
- Trigger: On save of innovations.json
- Action: Run backup_system.py
- Result: Always have recent backup

---

## Recovery Time Estimates

| Scenario | Recovery Time | Method |
|----------|--------------|--------|
| Single file corrupt | 1 minute | Restore from backup |
| Multiple files corrupt | 5 minutes | Full restore |
| Python broken | 10 minutes | Use batch files |
| Internet down | 0 minutes | Offline mode works |
| Complete system failure | 30 minutes | Restore from OneDrive |
| Cloudflare down | 0 minutes | Wait (files safe) |

---

## Support & Help

If all else fails:
1. Check this guide again
2. Look in `backups/` folder
3. Check OneDrive folder
4. Ask Kiro for help
5. Manually copy files from any backup

**Remember:** Your data is backed up in multiple places. You can always recover!

---

**Last Updated:** November 26, 2025  
**Version:** 1.0  
**Status:** Active
