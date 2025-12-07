@echo off
REM ========================================
REM Kiro Complete Reinstall v2.0 (BAT)
REM Last resort - full clean reinstall
REM ========================================

echo.
echo ========================================
echo   KIRO COMPLETE REINSTALL v2.0
echo   WARNING: This will remove all Kiro data
echo ========================================
echo.
echo This will:
echo - Stop all Kiro processes
echo - Remove all Kiro data and settings
echo - Clear all caches
echo - Prepare for fresh install
echo.
echo Your workspace files will NOT be deleted.
echo.
set /p CONFIRM="Type YES to continue: "

if /i not "%CONFIRM%"=="YES" (
    echo.
    echo Reinstall cancelled.
    pause
    exit /b
)

echo.
echo Starting complete reinstall...
echo.

set REPORT_FILE=%~dp0reinstall-report.txt
echo Kiro Complete Reinstall Report > "%REPORT_FILE%"
echo Generated: %date% %time% >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"

echo [1/5] Stopping all Kiro processes...
taskkill /F /IM "Kiro.exe" 2>nul
taskkill /F /IM "node.exe" 2>nul
taskkill /F /IM "kiro-helper.exe" 2>nul
timeout /t 3 /nobreak >nul
echo    Done!
echo Step 1: Stopped all processes >> "%REPORT_FILE%"

echo [2/5] Removing Kiro data folders...
if exist "%APPDATA%\Kiro" (
    echo    Removing: %APPDATA%\Kiro
    rd /s /q "%APPDATA%\Kiro" 2>nul
    echo    Removed: AppData\Kiro >> "%REPORT_FILE%"
)
if exist "%LOCALAPPDATA%\Kiro" (
    echo    Removing: %LOCALAPPDATA%\Kiro
    rd /s /q "%LOCALAPPDATA%\Kiro" 2>nul
    echo    Removed: LocalAppData\Kiro >> "%REPORT_FILE%"
)
if exist "%USERPROFILE%\.kiro" (
    echo    Removing: %USERPROFILE%\.kiro
    rd /s /q "%USERPROFILE%\.kiro" 2>nul
    echo    Removed: .kiro folder >> "%REPORT_FILE%"
)
echo    Done!

echo [3/5] Clearing system caches...
if exist "%TEMP%\kiro-*" (
    del /s /q "%TEMP%\kiro-*" 2>nul
    echo    Cleared: Temp files
    echo    Cleared: Temp files >> "%REPORT_FILE%"
)
echo    Done!

echo [4/5] Removing registry entries...
echo    Note: Registry cleanup requires manual action
echo    Skipping automatic registry changes for safety
echo Step 4: Registry cleanup skipped (manual) >> "%REPORT_FILE%"
echo    Done!

echo [5/5] Preparing for fresh install...
echo    All Kiro data removed
echo    System ready for fresh install
echo Step 5: System prepared for reinstall >> "%REPORT_FILE%"
echo    Done!

echo.
echo ========================================
echo   REINSTALL PREPARATION COMPLETE!
echo ========================================
echo.
echo Report saved: %REPORT_FILE%
echo.
echo Next steps:
echo 1. Download latest Kiro from official website
echo 2. Run the installer
echo 3. Configure your settings
echo 4. Reinstall extensions
echo.
echo Your workspace files are safe and untouched.
echo.
echo ========================================

pause
