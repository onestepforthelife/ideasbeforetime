@echo off
REM ============================================
REM START SESSION - Run this at session start
REM ============================================

echo.
echo ============================================
echo KIRO SESSION STARTING...
echo ============================================
echo.

REM Check all pages
echo [1/2] Checking all pages...
node AUTO_CHECK_BEFORE_RESPONSE.js

REM If check failed (exit code 1), fix automatically
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [2/2] Issues found - Fixing automatically...
    node fix-all-pages-comprehensive.js
    echo.
    echo ✅ All issues fixed!
) else (
    echo.
    echo ✅ All pages perfect!
)

echo.
echo ============================================
echo SESSION READY
echo ============================================
echo.
