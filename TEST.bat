@echo off
echo.
echo ========================================
echo COMPLETE TESTING SUITE
echo ========================================
echo.

echo [1/3] Checking my work for mistakes...
node verify-my-work.js
echo.

echo [2/3] Checking site quality...
node check-site-beauty-quality.js
echo.

echo [3/3] Checking live site...
node COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js
echo.

echo ========================================
echo TESTING COMPLETE
echo ========================================
