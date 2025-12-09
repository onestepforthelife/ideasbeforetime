@echo off
cls
echo ========================================
echo   CLOUDFLARE DIRECT DEPLOY
echo ========================================
echo.
echo This will deploy your site directly to Cloudflare
echo No Git required!
echo.
echo Step 1: Login to Cloudflare (browser will open)
echo Step 2: Click "Allow" in browser
echo Step 3: Come back here and press any key
echo.
pause
echo.
echo Opening Cloudflare login...
start "" "https://dash.cloudflare.com"
echo.
echo Please:
echo 1. Login to Cloudflare in the browser
echo 2. Go to: Workers and Pages
echo 3. Click: ideasbeforetime
echo 4. Copy your Account ID (top right)
echo.
set /p ACCOUNT_ID="Paste your Account ID here: "
echo.
echo Deploying to Cloudflare...
echo.
wrangler pages deploy . --project-name=ideasbeforetime --account-id=%ACCOUNT_ID%
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo   ✅ DEPLOYMENT SUCCESSFUL!
    echo ========================================
    echo.
    echo Your site is live at:
    echo https://onestepforthelife.com
    echo.
    echo Testing in 30 seconds...
    timeout /t 30 /nobreak
    node test-live-deployment-dec9.js
) else (
    echo ========================================
    echo   ❌ DEPLOYMENT FAILED
    echo ========================================
    echo.
    echo Try manual upload instead:
    echo See: MANUAL_UPLOAD_GUIDE.txt
)
echo.
pause
