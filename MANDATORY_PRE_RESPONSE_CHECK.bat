@echo off
REM MANDATORY PRE-RESPONSE CHECK
REM Run this BEFORE every response about issues/fixes/status

echo ========================================
echo MANDATORY PRE-RESPONSE CHECK
echo ========================================
echo.

echo [1/7] Checking Configuration Files...
node check-config-files.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ CONFIG ISSUES FOUND!
    echo.
)

echo.
echo [2/7] Checking _redirects File...
node check-redirects-file.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ REDIRECT ISSUES FOUND!
    echo.
)

echo.
echo [3/7] Running Critical Diagnostic...
node CRITICAL_DIAGNOSTIC_DEC6.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ CRITICAL ISSUES FOUND!
    echo ❌ DO NOT say "ready" or "fixed" until these are resolved!
    echo.
    pause
    exit /b 1
)

echo.
echo [4/7] Checking Live Site...
node COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ LIVE SITE HAS ISSUES!
    echo ❌ DO NOT say "working" until live site passes!
    echo.
    pause
    exit /b 1
)

echo.
echo [5/7] Running Proactive Checker...
node KIRO_PROACTIVE_CHECKER.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ⚠️  PROACTIVE CHECK FOUND ISSUES!
    echo ⚠️  Review and fix before responding!
    echo.
)

echo.
echo [6/7] Checking Site Beauty & Quality...
node check-site-beauty-quality.js

echo.
echo [7/7] Verifying Before Push...
node verify-before-push.js

echo.
echo ========================================
echo ✅ ALL CHECKS COMPLETE
echo ========================================
echo.
echo Review results above before responding!
echo.
pause
