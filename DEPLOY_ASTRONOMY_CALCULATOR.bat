@echo off
echo ========================================
echo ASTRONOMY CALCULATOR DEPLOYMENT
echo ========================================
echo.

echo Files to deploy:
echo   1. astronomy-calculator.html
echo   2. astronomy-api-integration.js
echo   3. ASTRONOMY_API_SETUP_GUIDE.md
echo.

echo Choose deployment method:
echo [1] GitHub (if working)
echo [2] Wrangler CLI (direct to Cloudflare)
echo [3] Manual upload guide
echo.
set /p choice="Enter choice (1-3): "

if "%choice%"=="1" goto github
if "%choice%"=="2" goto wrangler
if "%choice%"=="3" goto manual

:github
echo.
echo Opening GitHub Desktop...
echo.
echo Steps:
echo 1. Review changes in GitHub Desktop
echo 2. Commit with message: "Add astronomy calculator with 4 API methods"
echo 3. Push to GitHub
echo 4. Wait 2-3 minutes for Cloudflare deployment
echo.
start github
pause
goto end

:wrangler
echo.
echo Deploying via Wrangler...
echo.
call wrangler pages deploy . --project-name=onestepforthelife
echo.
echo Deployment complete!
echo.
pause
goto end

:manual
echo.
echo MANUAL UPLOAD STEPS:
echo.
echo 1. Go to: https://dash.cloudflare.com
echo 2. Click "Workers and Pages"
echo 3. Select "onestepforthelife"
echo 4. Click "Create deployment"
echo 5. Upload these files:
echo    - astronomy-calculator.html
echo    - astronomy-api-integration.js
echo    - ASTRONOMY_API_SETUP_GUIDE.md
echo 6. Click "Deploy"
echo.
echo Opening Cloudflare Dashboard...
start https://dash.cloudflare.com
echo.
pause
goto end

:end
echo.
echo ========================================
echo.
echo Your astronomy calculator will be live at:
echo https://onestepforthelife.com/astronomy-calculator.html
echo.
echo Features:
echo - 4 calculation methods (Swiss, Drik, AstroAPI, NASA)
echo - Divine examples (Rama, Krishna, Buddha, Mahavira)
echo - Multi-language support (8 Indian languages)
echo - Side-by-side comparison
echo - Today's positions + any date
echo.
echo Next steps:
echo 1. Test the calculator
echo 2. Set up API keys (see ASTRONOMY_API_SETUP_GUIDE.md)
echo 3. Add link to main navigation
echo.
pause
