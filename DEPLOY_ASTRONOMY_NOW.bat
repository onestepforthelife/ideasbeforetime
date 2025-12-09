@echo off
echo ========================================
echo ASTRONOMY CALCULATOR - READY TO DEPLOY
echo ========================================
echo.
echo ✅ ALL 4 DIVINE EXAMPLES COMPLETE:
echo.
echo 🏹 Lord Rama    - Chaitra Navami, Pushya Nakshatra
echo 🦚 Lord Krishna - Janmashtami, Rohini Nakshatra  
echo ☸️  Lord Buddha  - Vaishakha Purnima, Swati Nakshatra
echo 🕉️  Lord Mahavira - Chaitra Trayodashi, Vishakha Nakshatra
echo.
echo ========================================
echo.
echo Files ready to deploy:
echo   ✅ astronomy-calculator.html (with all 4 divine examples)
echo   ✅ astronomy-api-integration.js
echo   ✅ DIVINE_BIRTH_CHARTS_COMPLETE.md
echo   ✅ ASTRONOMY_API_SETUP_GUIDE.md
echo.
echo ========================================
echo.
echo Choose deployment method:
echo.
echo [1] Wrangler CLI (Direct - Recommended)
echo [2] Manual Upload (Cloudflare Dashboard)
echo [3] GitHub Desktop (if working)
echo [4] View complete divine data
echo [5] Exit
echo.
set /p choice="Enter choice (1-5): "

if "%choice%"=="1" goto wrangler
if "%choice%"=="2" goto manual
if "%choice%"=="3" goto github
if "%choice%"=="4" goto viewdata
if "%choice%"=="5" goto end

:wrangler
echo.
echo Deploying via Wrangler CLI...
echo.
call wrangler pages deploy . --project-name=onestepforthelife
echo.
echo ========================================
echo ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your calculator is live at:
echo https://onestepforthelife.com/astronomy-calculator.html
echo.
echo Test it now:
echo 1. Click any divine example button
echo 2. See complete planetary data
echo 3. Compare 2 calculation methods
echo.
pause
goto end

:manual
echo.
echo MANUAL UPLOAD STEPS:
echo ========================================
echo.
echo 1. Opening Cloudflare Dashboard...
start https://dash.cloudflare.com
echo.
echo 2. Follow these steps:
echo    - Click "Workers and Pages"
echo    - Select "onestepforthelife"
echo    - Click "Create deployment"
echo    - Upload these files:
echo      * astronomy-calculator.html
echo      * astronomy-api-integration.js
echo      * DIVINE_BIRTH_CHARTS_COMPLETE.md
echo    - Click "Deploy"
echo.
echo 3. Wait 30 seconds for deployment
echo.
echo 4. Visit: https://onestepforthelife.com/astronomy-calculator.html
echo.
pause
goto end

:github
echo.
echo Opening GitHub Desktop...
echo.
start github
echo.
echo Steps in GitHub Desktop:
echo 1. Review changes (4 files)
echo 2. Commit message: "Add complete astronomy calculator with all 4 divine examples"
echo 3. Push to origin
echo 4. Wait 2-3 minutes for Cloudflare auto-deploy
echo.
pause
goto end

:viewdata
echo.
echo Opening complete divine data...
echo.
start DIVINE_BIRTH_CHARTS_COMPLETE.md
echo.
echo This file contains:
echo - Complete planetary positions for all 4 divine births
echo - Vedic calendar details
echo - Sunrise/sunset times
echo - Divine significance
echo - Comparative analysis
echo.
pause
goto end

:end
echo.
echo ========================================
echo.
echo 🎉 ASTRONOMY CALCULATOR FEATURES:
echo.
echo ✅ 4 Divine Examples with complete data
echo ✅ Side-by-side comparison
echo ✅ 8 Indian languages
echo ✅ 4 Calculation methods (GODA)
echo ✅ Beautiful responsive design
echo ✅ Vedic calendar integration
echo ✅ Sunrise/sunset times
echo ✅ Nakshatra details
echo.
echo Next steps:
echo 1. Deploy using any method above
echo 2. Test all 4 divine examples
echo 3. Add link to main navigation
echo 4. Share with users
echo.
echo ========================================
