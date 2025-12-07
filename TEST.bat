@echo off
echo ========================================
echo COMPREHENSIVE SITE TESTING
echo ========================================
echo.

echo Running all tests...
echo.

echo [1/3] Code Quality Check...
node check-site-beauty-quality.js

echo.
echo [2/3] File Diagnostic...
node CRITICAL_DIAGNOSTIC_DEC6.js

echo.
echo [3/3] Live Site Check...
node COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js

echo.
echo ========================================
echo TESTING COMPLETE!
echo ========================================
echo.
echo Check the reports generated for details.
echo.
pause
