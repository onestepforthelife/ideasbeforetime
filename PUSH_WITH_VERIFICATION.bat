@echo off
echo ========================================
echo VERIFIED PUSH - LIFETIME SYSTEM
echo ========================================
echo.

echo Step 1: Running pre-push verification...
node verify-before-push.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo PUSH BLOCKED - Fix errors first!
    echo ========================================
    pause
    exit /b 1
)

echo.
echo Step 2: All checks passed, pushing to GitHub...
echo.

git add .
git commit -m "Verified push - all systems checked"
git push origin main

echo.
echo ========================================
echo DONE! Verified and pushed safely
echo ========================================
pause
