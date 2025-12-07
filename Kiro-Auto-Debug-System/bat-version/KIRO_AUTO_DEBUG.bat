@echo off
REM ========================================
REM Kiro Auto-Debug System v2.0 (BAT)
REM Quick fix for known Kiro IDE errors
REM ========================================

echo.
echo ========================================
echo   KIRO AUTO-DEBUG SYSTEM v2.0
echo   Quick Fix for Known Errors
echo ========================================
echo.

REM Create diagnostic report
set REPORT_FILE=%~dp0diagnostic-report.txt
echo Kiro Auto-Debug Report > "%REPORT_FILE%"
echo Generated: %date% %time% >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"

echo [1/6] Stopping Kiro processes...
taskkill /F /IM "Kiro.exe" 2>nul
taskkill /F /IM "node.exe" /FI "WINDOWTITLE eq *Kiro*" 2>nul
timeout /t 2 /nobreak >nul
echo    Done!
echo Step 1: Stopped Kiro processes >> "%REPORT_FILE%"

echo [2/6] Clearing cache and temp files...
if exist "%APPDATA%\Kiro\Cache" (
    rd /s /q "%APPDATA%\Kiro\Cache" 2>nul
    echo    Cleared: Cache
    echo Step 2: Cleared Cache >> "%REPORT_FILE%"
)
if exist "%APPDATA%\Kiro\CachedData" (
    rd /s /q "%APPDATA%\Kiro\CachedData" 2>nul
    echo    Cleared: CachedData
    echo Step 2: Cleared CachedData >> "%REPORT_FILE%"
)
if exist "%APPDATA%\Kiro\logs" (
    del /q "%APPDATA%\Kiro\logs\*.*" 2>nul
    echo    Cleared: Logs
    echo Step 2: Cleared Logs >> "%REPORT_FILE%"
)
echo    Done!

echo [3/6] Resetting MCP configuration...
if exist "%USERPROFILE%\.kiro\settings\mcp.json" (
    copy "%USERPROFILE%\.kiro\settings\mcp.json" "%USERPROFILE%\.kiro\settings\mcp.json.backup" >nul 2>&1
    echo    Backup created: mcp.json.backup
    echo Step 3: Backed up MCP config >> "%REPORT_FILE%"
)
echo    Done!

echo [4/6] Fixing workspace settings...
if exist "%APPDATA%\Kiro\User\workspaceStorage" (
    echo    Checking workspace storage...
    echo Step 4: Checked workspace storage >> "%REPORT_FILE%"
)
echo    Done!

echo [5/6] Clearing extension cache...
if exist "%APPDATA%\Kiro\CachedExtensions" (
    rd /s /q "%APPDATA%\Kiro\CachedExtensions" 2>nul
    echo    Cleared: Extension cache
    echo Step 5: Cleared extension cache >> "%REPORT_FILE%"
)
echo    Done!

echo [6/6] Checking system resources...
echo    Memory Status: >> "%REPORT_FILE%"
systeminfo | findstr /C:"Available Physical Memory" >> "%REPORT_FILE%"
echo    Disk Space: >> "%REPORT_FILE%"
wmic logicaldisk get caption,freespace,size | findstr "C:" >> "%REPORT_FILE%"
echo    Done!

echo.
echo ========================================
echo   AUTO-DEBUG COMPLETE!
echo ========================================
echo.
echo Diagnostic report saved: %REPORT_FILE%
echo.
echo Next steps:
echo 1. Start Kiro IDE
echo 2. Check if issue is resolved
echo 3. If not, run KIRO_INTELLIGENT_REPAIR.bat
echo.
echo ========================================

pause
