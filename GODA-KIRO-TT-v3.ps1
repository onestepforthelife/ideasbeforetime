# ============================================
# GODA KIRO TT v3 - Kiro Troubleshooter
# Created: December 7, 2025
# Solves 80% of common Kiro IDE issues
# ============================================

Write-Host ""
Write-Host "========================================"
Write-Host "  GODA KIRO TT v3 - Troubleshooter"
Write-Host "  Created: December 7, 2025"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

function Show-Menu {
    Write-Host "Select your issue:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Command failed with exit code 1"
    Write-Host "2. Module not found"
    Write-Host "3. Permission denied"
    Write-Host "4. Port already in use"
    Write-Host "5. Syntax Error"
    Write-Host "6. Network Error"
    Write-Host "7. MCP Server Issues (Most Important!)" -ForegroundColor Green
    Write-Host "8. Missing Extensions"
    Write-Host "9. UV not installed" -ForegroundColor Green
    Write-Host "0. Exit"
    Write-Host ""
}

function Fix-ExitCode1 {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "FIX: Command failed with exit code 1"
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "This means a command failed. Check the error ABOVE the exit code." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Common fixes:"
    Write-Host "1. Missing dependencies: npm install"
    Write-Host "2. Syntax error: Check the file mentioned"
    Write-Host "3. Build error: Check build logs"
    Write-Host ""
    Write-Host "Read the full error message to find the real problem!" -ForegroundColor Green
    Write-Host ""
    Read-Host "Press Enter to continue"
}

function Fix-Module {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "FIX: Module not found"
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Install the missing module:" -ForegroundColor Yellow
    Write-Host "  npm install [module-name]" -ForegroundColor Green
    Write-Host ""
    Write-Host "Or install all dependencies:"
    Write-Host "  npm install" -ForegroundColor Green
    Write-Host ""
    Write-Host "Check if:"
    Write-Host "- package.json exists"
    Write-Host "- Module name is spelled correctly"
    Write-Host "- You're in the right directory"
    Write-Host ""
    Read-Host "Press Enter to continue"
}

function Fix-Permission {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "FIX: Permission denied"
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Run PowerShell as Administrator:" -ForegroundColor Yellow
    Write-Host "1. Right-click PowerShell"
    Write-Host "2. Select 'Run as administrator'"
    Write-Host "3. Run your command again"
    Write-Host ""
    Write-Host "Or check file permissions in Properties"
    Write-Host ""
    Read-Host "Press Enter to continue"
}

function Fix-Port {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "FIX: Port already in use"
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Find what's using the port:" -ForegroundColor Yellow
    Write-Host "  netstat -ano | findstr :[PORT]" -ForegroundColor Green
    Write-Host ""
    Write-Host "Kill the process:"
    Write-Host "  taskkill /PID [PID] /F" -ForegroundColor Green
    Write-Host ""
    Write-Host "Or use a different port in your config"
    Write-Host ""
    Read-Host "Press Enter to continue"
}

function Fix-Syntax {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "FIX: Syntax Error"
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Check the line number in the error message" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Look for:"
    Write-Host "- Missing brackets: ( ) { } [ ]"
    Write-Host "- Missing semicolons: ;"
    Write-Host "- Missing quotes: `" `" ' '"
    Write-Host "- Wrong indentation"
    Write-Host ""
    Write-Host "Use Kiro's error highlighting to find the issue" -ForegroundColor Green
    Write-Host ""
    Read-Host "Press Enter to continue"
}

function Fix-Network {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "FIX: Network Error"
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Check internet connection"
    Write-Host "2. Check if URL is correct"
    Write-Host "3. Check firewall settings"
    Write-Host "4. Try again after few seconds"
    Write-Host ""
    Write-Host "If persists:" -ForegroundColor Yellow
    Write-Host "- Restart router"
    Write-Host "- Disable VPN temporarily"
    Write-Host "- Check DNS settings"
    Write-Host ""
    Read-Host "Press Enter to continue"
}

function Fix-MCP {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "FIX: MCP Server Issues (KIRO-SPECIFIC!)"
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "MCP servers provide special tools in Kiro" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quick Fix:" -ForegroundColor Green
    Write-Host "1. Open Command Palette (Ctrl+Shift+P)"
    Write-Host "2. Type: 'MCP: Restart Server'"
    Write-Host "3. Select the failing server"
    Write-Host ""
    Write-Host "Enable/Disable MCP:" -ForegroundColor Green
    Write-Host "1. Open: .kiro/settings/mcp.json"
    Write-Host "2. Find your server"
    Write-Host "3. Set: `"disabled`": false (to enable)"
    Write-Host "4. Or: `"disabled`": true (to disable)"
    Write-Host "5. Save file - server auto-restarts"
    Write-Host ""
    Write-Host "Common MCP Issues:" -ForegroundColor Yellow
    Write-Host "- Server not responding: Restart server"
    Write-Host "- Tools not showing: Check 'disabled' setting"
    Write-Host "- Connection failed: Check command/args in config"
    Write-Host "- Python errors: Check UV installed (see option 9)"
    Write-Host ""
    Read-Host "Press Enter to continue"
}

function Fix-Extensions {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "FIX: Missing Extensions"
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Install these extensions (Priority order):" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Python (Microsoft) - For Python debugging"
    Write-Host "2. ESLint - Catch JavaScript errors"
    Write-Host "3. Live Server - Preview HTML instantly"
    Write-Host "4. GitHub Pull Requests - Better Git integration"
    Write-Host "5. GitLens - Enhanced Git features"
    Write-Host ""
    Write-Host "How to install:" -ForegroundColor Green
    Write-Host "1. Click Extensions icon (Ctrl+Shift+X)"
    Write-Host "2. Search for extension name"
    Write-Host "3. Click 'Install'"
    Write-Host "4. Reload Kiro if needed"
    Write-Host ""
    Read-Host "Press Enter to continue"
}

function Fix-UV {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "FIX: UV not installed (CRITICAL FOR MCP!)"
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "UV is required for MCP servers to work" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Install UV:" -ForegroundColor Green
    Write-Host '  powershell -c "irm https://astral.sh/uv/install.ps1 | iex"'
    Write-Host ""
    Write-Host "After installation:"
    Write-Host "1. Restart Kiro"
    Write-Host "2. MCP servers will auto-install when first used"
    Write-Host ""
    Write-Host "What UV enables:" -ForegroundColor Yellow
    Write-Host "- Fetch web pages automatically"
    Write-Host "- Read PDFs from workspace"
    Write-Host "- Process thousands of documents"
    Write-Host ""
    Write-Host "Test UV:"
    Write-Host "  uv --version" -ForegroundColor Green
    Write-Host ""
    Read-Host "Press Enter to continue"
}

# Main loop
do {
    Show-Menu
    $choice = Read-Host "Enter number (0-9)"
    
    switch ($choice) {
        "1" { Fix-ExitCode1 }
        "2" { Fix-Module }
        "3" { Fix-Permission }
        "4" { Fix-Port }
        "5" { Fix-Syntax }
        "6" { Fix-Network }
        "7" { Fix-MCP }
        "8" { Fix-Extensions }
        "9" { Fix-UV }
        "0" { 
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host "Thank you for using GODA KIRO TT v3!"
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "For more help, visit:" -ForegroundColor Yellow
            Write-Host "https://onestepforthelife.com/kiro" -ForegroundColor Green
            Write-Host ""
            Write-Host "Created by: Ideas Before Time"
            Write-Host "Version: 3.0"
            Write-Host "Date: December 7, 2025"
            Write-Host ""
            break
        }
        default {
            Write-Host "Invalid choice. Please enter 0-9" -ForegroundColor Red
            Start-Sleep -Seconds 1
        }
    }
} while ($choice -ne "0")
