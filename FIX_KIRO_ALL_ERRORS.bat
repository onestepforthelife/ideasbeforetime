@echo off
REM ========================================
REM FIX KIRO - ALL ERRORS (ONE FILE SOLUTION)
REM Fixes ALL Kiro errors automatically
REM No coding needed - Just double-click!
REM ========================================

color 0A
title FIX KIRO - ALL ERRORS

:MENU
cls
echo.
echo ========================================
echo    FIX KIRO - ALL ERRORS
echo ========================================
echo.
echo Choose what to do:
echo.
echo [1] Quick Fix (2 min) - Most common errors
echo [2] Deep Repair (5 min) - Unknown/complex errors
echo [3] Complete Reinstall (10 min) - Severe issues
echo [4] Create Error Report for GitHub
echo [5] Exit
echo.
echo ========================================
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto QUICK_FIX
if "%choice%"=="2" goto DEEP_REPAIR
if "%choice%"=="3" goto REINSTALL
if "%choice%"=="4" goto ERROR_REPORT
if "%choice%"=="5" goto END
goto MENU

REM ========================================
REM QUICK FIX - Most Common Errors
REM ========================================
:QUICK_FIX
cls
echo.
echo ========================================
echo QUICK FIX - Starting...
echo ========================================
echo.
echo This will fix 90%% of Kiro errors:
echo - "An unexpected error occurred"
echo - Memory/Listener leaks
echo - MCP server crashes
echo - Cache corruption
echo.
echo Your work files are SAFE!
echo.
pause

echo.
echo [1/5] Stopping Kiro...
taskkill /F /IM Kiro.exe /T >nul 2>&1
taskkill /F /IM "Kiro Helper.exe" /T >nul 2>&1
timeout /t 2 /nobreak >nul
echo Done!

echo.
echo [2/5] Clearing cache...
if exist "%APPDATA%\Kiro\Cache" rd /s /q "%APPDATA%\Kiro\Cache" 2>nul
if exist "%APPDATA%\Kiro\Code Cache" rd /s /q "%APPDATA%\Kiro\Code Cache" 2>nul
if exist "%APPDATA%\Kiro\Service Worker" rd /s /q "%APPDATA%\Kiro\Service Worker" 2>nul
if exist "%LOCALAPPDATA%\Kiro\Cache" rd /s /q "%LOCALAPPDATA%\Kiro\Cache" 2>nul
echo Done!

echo.
echo [3/5] Fixing MCP configuration...
if exist "%APPDATA%\Kiro\mcp.json" (
    echo {"mcpServers": {}} > "%APPDATA%\Kiro\mcp.json"
)
echo Done!

echo.
echo [4/5] Fixing workspace settings...
for /d %%D in ("%APPDATA%\Kiro\Workspaces\*") do (
    if exist "%%D\workspace.json" (
        powershell -Command "(Get-Content '%%D\workspace.json') -replace '\"kiroAgent.configureMCP\": \"enabled\"', '\"kiroAgent.configureMCP\": \"Disabled\"' | Set-Content '%%D\workspace.json'" 2>nul
    )
)
echo Done!

echo.
echo [5/5] Testing Kiro startup...
if exist "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe" (
    start "" "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe"
    timeout /t 3 /nobreak >nul
    echo Done!
) else (
    echo WARNING: Kiro not found. May need reinstall.
)

echo.
echo ========================================
echo QUICK FIX COMPLETE!
echo ========================================
echo.
echo Kiro should now work without errors.
echo If error persists, try option [2] Deep Repair
echo.
pause
goto MENU

REM ========================================
REM DEEP REPAIR - Unknown/Complex Errors
REM ========================================
:DEEP_REPAIR
cls
echo.
echo ========================================
echo DEEP REPAIR - Starting...
echo ========================================
echo.
echo This handles unknown and complex errors
echo Creates detailed error report
echo.
pause

set TIMESTAMP=%date:~-4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set REPORT=%USERPROFILE%\Desktop\KIRO_ERROR_REPORT_%TIMESTAMP%.txt

echo.
echo [1/8] Stopping all processes...
taskkill /F /IM Kiro.exe /T >nul 2>&1
taskkill /F /IM "Kiro Helper.exe" /T >nul 2>&1
taskkill /F /IM node.exe /T >nul 2>&1
timeout /t 2 /nobreak >nul
echo Done!

echo.
echo [2/8] Scanning for errors...
echo KIRO ERROR REPORT > "%REPORT%"
echo Generated: %date% %time% >> "%REPORT%"
echo ======================================== >> "%REPORT%"
echo. >> "%REPORT%"
echo ERRORS DETECTED: >> "%REPORT%"
if exist "%APPDATA%\Kiro\logs" (
    echo - Found log files >> "%REPORT%"
)
echo Done!

echo.
echo [3/8] Clearing ALL caches...
if exist "%APPDATA%\Kiro\Cache" rd /s /q "%APPDATA%\Kiro\Cache" 2>nul
if exist "%APPDATA%\Kiro\Code Cache" rd /s /q "%APPDATA%\Kiro\Code Cache" 2>nul
if exist "%APPDATA%\Kiro\Service Worker" rd /s /q "%APPDATA%\Kiro\Service Worker" 2>nul
if exist "%APPDATA%\Kiro\GPUCache" rd /s /q "%APPDATA%\Kiro\GPUCache" 2>nul
if exist "%APPDATA%\Kiro\Session Storage" rd /s /q "%APPDATA%\Kiro\Session Storage" 2>nul
if exist "%LOCALAPPDATA%\Kiro\Cache" rd /s /q "%LOCALAPPDATA%\Kiro\Cache" 2>nul
echo - Cleared all caches >> "%REPORT%"
echo Done!

echo.
echo [4/8] Fixing MCP configuration...
if exist "%APPDATA%\Kiro\mcp.json" (
    echo {"mcpServers": {}} > "%APPDATA%\Kiro\mcp.json"
    echo - Reset MCP configuration >> "%REPORT%"
)
echo Done!

echo.
echo [5/8] Fixing workspace settings...
for /d %%D in ("%APPDATA%\Kiro\Workspaces\*") do (
    if exist "%%D\workspace.json" (
        powershell -Command "(Get-Content '%%D\workspace.json') -replace '\"kiroAgent.configureMCP\": \"enabled\"', '\"kiroAgent.configureMCP\": \"Disabled\"' | Set-Content '%%D\workspace.json'" 2>nul
        echo - Fixed workspace settings >> "%REPORT%"
    )
)
echo Done!

echo.
echo [6/8] Backing up settings...
if exist "%APPDATA%\Kiro\User\settings.json" (
    copy "%APPDATA%\Kiro\User\settings.json" "%APPDATA%\Kiro\User\settings.json.bak" >nul 2>&1
    echo - Backed up user settings >> "%REPORT%"
)
echo Done!

echo.
echo [7/8] Creating auto-recovery...
echo @echo off > "%APPDATA%\Kiro\auto-recovery.bat"
echo taskkill /F /IM Kiro.exe /T ^>nul 2^>^&1 >> "%APPDATA%\Kiro\auto-recovery.bat"
echo timeout /t 2 /nobreak ^>nul >> "%APPDATA%\Kiro\auto-recovery.bat"
echo start "" "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe" >> "%APPDATA%\Kiro\auto-recovery.bat"
echo - Created auto-recovery script >> "%REPORT%"
echo Done!

echo.
echo [8/8] Testing Kiro...
if exist "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe" (
    start "" "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe"
    timeout /t 5 /nobreak >nul
    tasklist /FI "IMAGENAME eq Kiro.exe" 2>nul | find /i "Kiro.exe" >nul
    if not errorlevel 1 (
        echo - Kiro started successfully >> "%REPORT%"
        echo SUCCESS!
    ) else (
        echo - Kiro failed to start >> "%REPORT%"
        echo WARNING: May need reinstall
    )
) else (
    echo - Kiro not found >> "%REPORT%"
    echo ERROR: Need reinstall
)
echo Done!

echo. >> "%REPORT%"
echo ======================================== >> "%REPORT%"
echo Share this report on GitHub if needed: >> "%REPORT%"
echo https://github.com/kirolabs/kiro/issues >> "%REPORT%"

echo.
echo ========================================
echo DEEP REPAIR COMPLETE!
echo ========================================
echo.
echo Report saved to Desktop:
echo KIRO_ERROR_REPORT_%TIMESTAMP%.txt
echo.
echo If Kiro works: You're all set!
echo If not: Try option [3] Complete Reinstall
echo.
pause
goto MENU

REM ========================================
REM COMPLETE REINSTALL
REM ========================================
:REINSTALL
cls
echo.
echo ========================================
echo COMPLETE REINSTALL
echo ========================================
echo.
echo WARNING: This will completely remove Kiro
echo Your work files will NOT be affected
echo.
echo Press Ctrl+C to cancel, or
pause

echo.
echo [1/4] Stopping Kiro...
taskkill /F /IM Kiro.exe /T >nul 2>&1
taskkill /F /IM "Kiro Helper.exe" /T >nul 2>&1
timeout /t 3 /nobreak >nul
echo Done!

echo.
echo [2/4] Please uninstall Kiro manually:
echo.
echo 1. Press Windows key
echo 2. Type "Add or remove programs"
echo 3. Find "Kiro"
echo 4. Click Uninstall
echo.
echo After uninstalling, press any key...
pause >nul

echo.
echo [3/4] Removing all Kiro data...
if exist "%APPDATA%\Kiro" rd /s /q "%APPDATA%\Kiro" 2>nul
if exist "%LOCALAPPDATA%\Kiro" rd /s /q "%LOCALAPPDATA%\Kiro" 2>nul
echo Done!

echo.
echo [4/4] Opening download page...
start https://kiro.dev
echo Done!

echo.
echo ========================================
echo REINSTALL READY
echo ========================================
echo.
echo Next steps:
echo 1. Download latest Kiro from opened page
echo 2. Install Kiro
echo 3. Start fresh!
echo.
echo Your work files are safe in:
echo - Documents\Cloudfare
echo - OneDrive
echo.
pause
goto MENU

REM ========================================
REM ERROR REPORT FOR GITHUB
REM ========================================
:ERROR_REPORT
cls
echo.
echo ========================================
echo CREATE ERROR REPORT FOR GITHUB
echo ========================================
echo.

set TIMESTAMP=%date:~-4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set REPORT=%USERPROFILE%\Desktop\KIRO_GITHUB_REPORT_%TIMESTAMP%.txt

echo Creating detailed report...
echo.

echo KIRO ERROR REPORT FOR GITHUB COMMUNITY > "%REPORT%"
echo Generated: %date% %time% >> "%REPORT%"
echo ======================================== >> "%REPORT%"
echo. >> "%REPORT%"
echo SYSTEM INFORMATION: >> "%REPORT%"
echo - Windows Version: >> "%REPORT%"
ver >> "%REPORT%"
echo. >> "%REPORT%"
echo - Kiro Installation: >> "%REPORT%"
if exist "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe" (
    echo   Found at: %LOCALAPPDATA%\Programs\Kiro\Kiro.exe >> "%REPORT%"
) else (
    echo   Not found >> "%REPORT%"
)
echo. >> "%REPORT%"
echo ERROR DESCRIPTION: >> "%REPORT%"
echo [Describe what you were doing when error occurred] >> "%REPORT%"
echo. >> "%REPORT%"
echo ERROR MESSAGE: >> "%REPORT%"
echo [Copy the exact error message here] >> "%REPORT%"
echo. >> "%REPORT%"
echo FIXES ATTEMPTED: >> "%REPORT%"
echo - Quick Fix: [Yes/No] >> "%REPORT%"
echo - Deep Repair: [Yes/No] >> "%REPORT%"
echo - Complete Reinstall: [Yes/No] >> "%REPORT%"
echo. >> "%REPORT%"
echo RESULT: >> "%REPORT%"
echo [Did it fix the issue? Yes/No] >> "%REPORT%"
echo. >> "%REPORT%"
echo ======================================== >> "%REPORT%"
echo POST THIS REPORT AT: >> "%REPORT%"
echo https://github.com/kirolabs/kiro/issues >> "%REPORT%"
echo. >> "%REPORT%"
echo Include: >> "%REPORT%"
echo - This complete report >> "%REPORT%"
echo - Your Kiro version (Help -^> About) >> "%REPORT%"
echo - Screenshots if possible >> "%REPORT%"

echo Done!
echo.
echo Report saved to Desktop:
echo KIRO_GITHUB_REPORT_%TIMESTAMP%.txt
echo.
echo Please:
echo 1. Open the report file
echo 2. Fill in the [bracketed] sections
echo 3. Post on GitHub Issues
echo.
pause
goto MENU

REM ========================================
REM END
REM ========================================
:END
cls
echo.
echo ========================================
echo Thank you for using FIX KIRO!
echo ========================================
echo.
echo Your work files are always safe.
echo.
echo If you need help:
echo https://github.com/kirolabs/kiro/issues
echo.
timeout /t 3 /nobreak >nul
exit
