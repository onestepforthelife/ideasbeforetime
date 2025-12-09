@echo off
cls
echo ========================================
echo   COMPLETE DEPLOYMENT WORKFLOW
echo   GODA + CORRECTIONS + WRANGLER + MECER
echo ========================================
echo.
echo This runs the complete workflow:
echo.
echo Step 1: GODA Test 1
echo Step 2: GODA Test 2
echo Step 3: Corrections (if needed)
echo Step 4: Upload by Wrangler
echo Step 5: MECER (Reality Test)
echo Step 6: Repeat all 5 steps (run again)
echo.
echo This takes about 3-5 minutes...
echo.
pause
echo.
node deploy-clean.js
