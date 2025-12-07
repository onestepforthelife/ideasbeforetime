# Kiro Auto-Debug System v2.0

**Automated error detection and repair for Kiro IDE**

## 📦 What's Included

### BAT Version (Windows CMD)
- `KIRO_AUTO_DEBUG.bat` - Quick fix for known errors
- `KIRO_INTELLIGENT_REPAIR.bat` - Handles unknown errors
- `KIRO_COMPLETE_REINSTALL.bat` - Full reinstall if needed

### PS1 Version (PowerShell)
- `KIRO_AUTO_DEBUG.ps1` - Quick fix for known errors
- `KIRO_INTELLIGENT_REPAIR.ps1` - Handles unknown errors
- `KIRO_COMPLETE_REINSTALL.ps1` - Full reinstall if needed

### Documentation
- `USER_GUIDE.txt` - How to use the system
- `TROUBLESHOOTING.txt` - Common issues and solutions
- `CHANGELOG.txt` - Version history

## 🚀 Quick Start

### For BAT Version (Recommended for most users):
1. Navigate to `bat-version` folder
2. Double-click `KIRO_AUTO_DEBUG.bat` for quick fixes
3. Or run `KIRO_INTELLIGENT_REPAIR.bat` for unknown errors

### For PS1 Version (Advanced users):
1. Navigate to `ps1-version` folder
2. Right-click `KIRO_AUTO_DEBUG.ps1` → Run with PowerShell
3. Or run `KIRO_INTELLIGENT_REPAIR.ps1` for unknown errors

## 📋 When to Use What

| Problem | Solution |
|---------|----------|
| Kiro won't start | `KIRO_AUTO_DEBUG` |
| MCP server crashes | `KIRO_AUTO_DEBUG` |
| Memory leaks | `KIRO_AUTO_DEBUG` |
| Unknown errors | `KIRO_INTELLIGENT_REPAIR` |
| Nothing works | `KIRO_COMPLETE_REINSTALL` |

## ✅ What Gets Fixed

- Memory leaks and cache corruption
- MCP server crashes
- Workspace settings corruption
- Extension conflicts
- Process hangs
- Configuration errors

## 🔒 Safety

- Only touches Kiro folders
- Never modifies your work files
- Creates backups before changes
- Generates diagnostic reports
- Open source - inspect the code

## 📊 System Requirements

- Windows 10/11
- Kiro IDE installed
- Administrator rights (for some operations)

## 🆘 Support

If scripts don't fix your issue:
1. Check `diagnostic-report.txt` in script folder
2. Share report with Kiro community
3. Try `KIRO_COMPLETE_REINSTALL` as last resort

## 📝 Version

**Current Version:** 2.0  
**Release Date:** December 2025  
**Compatibility:** Kiro IDE all versions

## 🤝 Contributing

Found a bug? Have a fix? Submit to GitHub!

## 📄 License

Open Source - Free to use and modify
