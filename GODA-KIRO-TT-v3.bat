@echo off
REM ============================================
REM GODA KIRO TT v3 - Kiro Troubleshooter
REM Created: December 7, 2025
REM Solves 80% of common Kiro IDE issues
REM ============================================

echo.
echo ========================================
echo   GODA KIRO TT v3 - Troubleshooter
echo   Created: December 7, 2025
echo ========================================
echo.

:MENU
echo Select your issue:
echo.
echo 1. Command failed with exit code 1
echo 2. Module not found
echo 3. Permission denied
echo 4. Port already in use
echo 5. Syntax Error
echo 6. Network Error
echo 7. MCP Server Issues (Most Important!)
echo 8. Missing Extensions
echo 9. UV not installed
echo 0. Exit
echo.

set /p choice="Enter number (0-9): "

if "%choice%"=="1" goto EXIT1
if "%choice%"=="2" goto MODULE
if "%choice%"=="3" goto PERMISSION
if "%choice%"=="4" goto PORT
if "%choice%"=="5" goto SYNTAX
if "%choice%"=="6" goto NETWORK
if "%choice%"=="7" goto MCP
if "%choice%"=="8" goto EXTENSIONS
if "%choice%"=="9" goto UV
if "%choice%"=="0" goto END
goto MENU

:EXIT1
echo.
echo ========================================
echo FIX: Command failed with exit code 1
echo ========================================
echo.
echo This means a command failed. Check the error ABOVE the exit code.
echo.
echo Common fixes:
echo 1. Missing dependencies: npm install
echo 2. Syntax error: Check the file mentioned
echo 3. Build error: Check build logs
echo.
echo Read the full error message to find the real problem!
echo.
pause
goto MENU

:MODULE
echo.
echo ========================================
echo FIX: Module not found
echo ========================================
echo.
echo Install the missing module:
echo   npm install [module-name]
echo.
echo Or install all dependencies:
echo   npm install
echo.
echo Check if:
echo - package.json exists
echo - Module name is spelled correctly
echo - You're in the right directory
echo.
pause
goto MENU

:PERMISSION
echo.
echo ========================================
echo FIX: Permission denied
echo ========================================
echo.
echo Run as Administrator:
echo 1. Right-click Command Prompt
echo 2. Select "Run as administrator"
echo 3. Run your command again
echo.
echo Or check file permissions in Properties
echo.
pause
goto MENU

:PORT
echo.
echo ========================================
echo FIX: Port already in use
echo ========================================
echo.
echo Find what's using the port:
echo   netstat -ano ^| findstr :[PORT]
echo.
echo Kill the process:
echo   taskkill /PID [PID] /F
echo.
echo Or use a different port in your config
echo.
pause
goto MENU

:SYNTAX
echo.
echo ========================================
echo FIX: Syntax Error
echo ========================================
echo.
echo Check the line number in the error message
echo.
echo Look for:
echo - Missing brackets: ( ) { } [ ]
echo - Missing semicolons: ;
echo - Missing quotes: " " ' '
echo - Wrong indentation
echo.
echo Use Kiro's error highlighting to find the issue
echo.
pause
goto MENU

:NETWORK
echo.
echo ========================================
echo FIX: Network Error
echo ========================================
echo.
echo 1. Check internet connection
echo 2. Check if URL is correct
echo 3. Check firewall settings
echo 4. Try again after few seconds
echo.
echo If persists:
echo - Restart router
echo - Disable VPN temporarily
echo - Check DNS settings
echo.
pause
goto MENU

:MCP
echo.
echo ========================================
echo FIX: MCP Server Issues (KIRO-SPECIFIC!)
echo ========================================
echo.
echo MCP servers provide special tools in Kiro
echo.
echo Quick Fix:
echo 1. Open Command Palette (Ctrl+Shift+P)
echo 2. Type: "MCP: Restart Server"
echo 3. Select the failing server
echo.
echo Enable/Disable MCP:
echo 1. Open: .kiro/settings/mcp.json
echo 2. Find your server
echo 3. Set: "disabled": false (to enable)
echo 4. Or: "disabled": true (to disable)
echo 5. Save file - server auto-restarts
echo.
echo Common MCP Issues:
echo - Server not responding: Restart server
echo - Tools not showing: Check "disabled" setting
echo - Connection failed: Check command/args in config
echo - Python errors: Check UV installed (see option 9)
echo.
pause
goto MENU

:EXTENSIONS
echo.
echo ========================================
echo FIX: Missing Extensions
echo ========================================
echo.
echo Install these extensions (Priority order):
echo.
echo 1. Python (Microsoft) - For Python debugging
echo 2. ESLint - Catch JavaScript errors
echo 3. Live Server - Preview HTML instantly
echo 4. GitHub Pull Requests - Better Git integration
echo 5. GitLens - Enhanced Git features
echo.
echo How to install:
echo 1. Click Extensions icon (Ctrl+Shift+X)
echo 2. Search for extension name
echo 3. Click "Install"
echo 4. Reload Kiro if needed
echo.
pause
goto MENU

:UV
echo.
echo ========================================
echo FIX: UV not installed (CRITICAL FOR MCP!)
echo ========================================
echo.
echo UV is required for MCP servers to work
echo.
echo Install UV:
echo   powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
echo.
echo After installation:
echo 1. Restart Kiro
echo 2. MCP servers will auto-install when first used
echo.
echo What UV enables:
echo - Fetch web pages automatically
echo - Read PDFs from workspace
echo - Process thousands of documents
echo.
echo Test UV:
echo   uv --version
echo.
pause
goto MENU

:END
echo.
echo ========================================
echo Thank you for using GODA KIRO TT v3!
echo ========================================
echo.
echo For more help, visit:
echo https://onestepforthelife.com/kiro
echo.
echo Created by: Ideas Before Time
echo Version: 3.0
echo Date: December 7, 2025
echo.
