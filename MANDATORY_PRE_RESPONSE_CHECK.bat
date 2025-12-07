@echo off
echo.
echo ========================================
echo MANDATORY PRE-RESPONSE CHECK
echo ========================================
echo.

REM Step 1: Check my own work
echo [1/2] Checking for mistakes in my work...
node verify-my-work.js
if errorlevel 1 (
    echo.
    echo ❌ BLOCKED: Found mistakes in my work!
    echo Fix these before responding.
    exit /b 1
)

REM Step 2: Check site quality
echo.
echo [2/2] Checking site quality...
node check-site-beauty-quality.js
if errorlevel 1 (
    echo.
    echo ❌ BLOCKED: Site quality issues found!
    echo Fix these before saying "ready".
    exit /b 1
)

echo.
echo ✅ ALL CHECKS PASSED
echo Safe to respond.
echo.
exit /b 0
