@echo off
REM ========================================
REM KIRO COMPLETE REINSTALL SYSTEM
REM For severe errors that auto-debug can't fix
REM ========================================

echo.
echo ========================================
echo KIRO COMPLETE REINSTALL
echo ========================================
echo.
echo WARNING: This will completely remove Kiro
echo and all its settings, then guide you to reinstall.
echo.
echo Your work files will NOT be affected.
echo.
echo Press Ctrl+C to cancel, or
pause

echo.
echo [1/6] Stopping all Kiro processes...
taskkill /F /IM Kiro.exe /T 2>nul
taskkill /F /IM "Kiro Helper.exe" /T 2>nul
timeout /t 3 /nobreak >nul
echo Done!

echo.
echo [2/6] Uninstalling Kiro...
echo Please uninstall Kiro manually:
echo 1. Press Windows key
echo 2. Type "Add or remove programs"
echo 3. Find "Kiro" in the list
echo 4. Click Uninstall
echo.
echo After uninstalling, press any key to continue...
pause >nul

echo.
echo [3/6] Removing all Kiro data...
if exist "%APPDATA%\Kiro" (
    rd /s /q "%APPDATA%\Kiro" 2>nul
    echo - Removed AppData\Roaming\Kiro
)
if exist "%LOCALAPPDATA%\Kiro" (
    rd /s /q "%LOCALAPPDATA%\Kiro" 2>nul
    echo - Removed AppData\Local\Kiro
)
echo Done!

echo.
echo [4/6] Cleaning registry (optional)...
reg delete "HKCU\Software\Kiro" /f 2>nul
echo Done!

echo.
echo [5/6] Creating reinstall guide...
echo KIRO REINSTALL GUIDE > "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo. >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo Step 1: Download latest Kiro >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo Go to: https://kiro.dev (or your official download source) >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo. >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo Step 2: Install Kiro >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo Run the installer you downloaded >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo. >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo Step 3: First Launch >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo Open Kiro and start a new session >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo. >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo Your work files are safe in: >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo - C:\Users\%USERNAME%\Documents\Cloudfare >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo - C:\Users\%USERNAME%\OneDrive >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo. >> "%USERPROFILE%\Desktop\KIRO_REINSTALL_GUIDE.txt"
echo Guide saved to Desktop!

echo.
echo [6/6] Opening download page...
start https://kiro.dev
echo Done!

echo.
echo ========================================
echo KIRO COMPLETE REINSTALL READY
echo ========================================
echo.
echo Next steps:
echo 1. Download latest Kiro from the opened webpage
echo 2. Install Kiro
echo 3. Check Desktop for KIRO_REINSTALL_GUIDE.txt
echo.
echo Your work files are safe!
echo.
pause
