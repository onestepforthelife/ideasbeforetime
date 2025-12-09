@echo off
cls
echo ========================================
echo   COMPLETE DEPLOYMENT WORKFLOW
echo   GODA + MECER + WRANGLER
echo ========================================
echo.
echo This will run the complete workflow:
echo 1. GODA Test 1 (Find issues)
echo 2. Auto-Repair (Fix issues)
echo 3. GODA Test 2 (Verify fixes)
echo 4. Wrangler Deploy (Upload to Cloudflare)
echo 5. MECER Verification (Test live site)
echo.
pause
echo.
node complete-workflow.js
