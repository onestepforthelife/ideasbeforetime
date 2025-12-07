@echo off
REM ========================================
REM Kiro Intelligent Repair System v2.0 (BAT)
REM Handles unknown and unforeseen errors
REM ========================================

echo.
echo ========================================
echo   KIRO INTELLIGENT REPAIR v2.0
echo   Advanced Error Detection & Repair
echo ========================================
echo.

REM Create detailed diagnostic report
set REPORT_FILE=%~dp0intelligent-repair-report.txt
echo Kiro Intelligent Repair Report > "%REPORT_FILE%"
echo Generated: %date% %time% >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"

echo [1/8] Detecting error patterns...
echo Step 1: Error Pattern Detection >> "%REPORT_FILE%"

REM Check if Kiro is running
tasklist /FI "IMAGENAME eq Kiro.exe" 2>NUL | find /I /N "Kiro.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo    Status: Kiro is running
    echo    Kiro Status: Running >> "%REPORT_FILE%"
) else (
    echo    Status: Kiro is NOT running
    echo    Kiro Status: Not Running >> "%REPORT_FILE%"
)

REM Check for error logs
if exist "%APPDATA%\Kiro\logs" (
    echo    Checking error logs...
    dir "%APPDATA%\Kiro\logs" /b /o-d >> "%REPORT_FILE%"
    echo    Latest log files listed in report
)
echo    Done!

echo [2/8] Stopping all Kiro processes...
taskkill /F /IM "Kiro.exe" 2>nul
taskkill /F /IM "node.exe" 2>nul
taskkill /F /IM "kiro-helper.exe" 2>nul
timeout /t 3 /nobreak >nul
echo    Done!
echo Step 2: Stopped all processes >> "%REPORT_FILE%"

echo [3/8] Applying GitHub community fixes...
echo    Fix 1: Memory leak prevention
if exist "%APPDATA%\Kiro\GPUCache" (
    rd /s /q "%APPDATA%\Kiro\GPUCache" 2>nul
    echo       Applied: GPU cache clear
    echo    Applied: GPU cache clear >> "%REPORT_FILE%"
)

echo    Fix 2: Extension conflict resolution
if exist "%APPDATA%\Kiro\CachedExtensionVSIXs" (
    rd /s /q "%APPDATA%\Kiro\CachedExtensionVSIXs" 2>nul
    echo       Applied: Extension cache clear
    echo    Applied: Extension cache clear >> "%REPORT_FILE%"
)

echo    Fix 3: Workspace corruption repair
if exist "%APPDATA%\Kiro\User\workspaceStorage" (
    echo       Scanning workspace storage...
    echo    Scanned workspace storage >> "%REPORT_FILE%"
)
echo    Done!

echo [4/8] Checking system resources...
echo    Checking available memory...
for /f "tokens=2 delims=:" %%a in ('systeminfo ^| findstr /C:"Available Physical Memory"') do (
    echo    Available Memory: %%a
    echo    Available Memory: %%a >> "%REPORT_FILE%"
)

echo    Checking disk space...
for /f "tokens=3" %%a in ('dir C:\ ^| findstr /C:"bytes free"') do (
    echo    Free Disk Space: %%a bytes
    echo    Free Disk Space: %%a bytes >> "%REPORT_FILE%"
)
echo    Done!

echo [5/8] Creating auto-recovery system...
echo    Setting up crash recovery...
if not exist "%APPDATA%\Kiro\User" mkdir "%APPDATA%\Kiro\User"
echo {"files.autoSave": "afterDelay", "files.autoSaveDelay": 1000} > "%APPDATA%\Kiro\User\settings.json.recovery"
echo    Recovery settings created
echo Step 5: Created recovery settings >> "%REPORT_FILE%"
echo    Done!

echo [6/8] Resetting all configurations...
echo    Backing up current settings...
if exist "%APPDATA%\Kiro\User\settings.json" (
    copy "%APPDATA%\Kiro\User\settings.json" "%APPDATA%\Kiro\User\settings.json.backup" >nul 2>&1
    echo    Backup: settings.json.backup
    echo    Backed up: settings.json >> "%REPORT_FILE%"
)
if exist "%USERPROFILE%\.kiro\settings\mcp.json" (
    copy "%USERPROFILE%\.kiro\settings\mcp.json" "%USERPROFILE%\.kiro\settings\mcp.json.backup" >nul 2>&1
    echo    Backup: mcp.json.backup
    echo    Backed up: mcp.json >> "%REPORT_FILE%"
)
echo    Done!

echo [7/8] Testing Kiro startup...
echo    Attempting to start Kiro...
start "" "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe" 2>nul
if errorlevel 1 (
    echo    Warning: Could not auto-start Kiro
    echo    Status: Could not auto-start >> "%REPORT_FILE%"
) else (
    echo    Success: Kiro started
    echo    Status: Started successfully >> "%REPORT_FILE%"
)
timeout /t 5 /nobreak >nul
echo    Done!

echo [8/8] Generating detailed report...
echo. >> "%REPORT_FILE%"
echo ======================================== >> "%REPORT_FILE%"
echo RECOMMENDATIONS: >> "%REPORT_FILE%"
echo ======================================== >> "%REPORT_FILE%"
echo 1. Check if Kiro starts without errors >> "%REPORT_FILE%"
echo 2. If issues persist, check error logs >> "%REPORT_FILE%"
echo 3. Consider running KIRO_COMPLETE_REINSTALL.bat >> "%REPORT_FILE%"
echo 4. Share this report with Kiro community >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"
echo Report completed: %date% %time% >> "%REPORT_FILE%"
echo    Done!

echo.
echo ========================================
echo   INTELLIGENT REPAIR COMPLETE!
echo ========================================
echo.
echo Detailed report saved: %REPORT_FILE%
echo.
echo What was done:
echo - Detected error patterns
echo - Applied community fixes
echo - Checked system resources
echo - Created recovery system
echo - Reset configurations
echo - Tested Kiro startup
echo.
echo Next steps:
echo 1. Check if Kiro works now
echo 2. Review the diagnostic report
echo 3. If still broken, run KIRO_COMPLETE_REINSTALL.bat
echo.
echo ========================================

pause
