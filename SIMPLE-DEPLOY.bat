@echo off
cls
echo ========================================
echo   SIMPLE CLOUDFLARE DEPLOY
echo ========================================
echo.
echo This uses Wrangler with manual auth
echo.
echo STEP 1: Get your API Token
echo ----------------------------------------
echo 1. Open: https://dash.cloudflare.com/profile/api-tokens
echo 2. Click: "Create Token"
echo 3. Use template: "Edit Cloudflare Workers"
echo 4. Click: "Continue to summary"
echo 5. Click: "Create Token"
echo 6. Copy the token
echo.
start "" "https://dash.cloudflare.com/profile/api-tokens"
echo.
set /p CF_API_TOKEN="Paste your API Token here: "
echo.
echo STEP 2: Get your Account ID
echo ----------------------------------------
echo 1. Go to: https://dash.cloudflare.com
echo 2. Click: Workers and Pages
echo 3. Click: ideasbeforetime
echo 4. Copy Account ID (right side)
echo.
set /p CF_ACCOUNT_ID="Paste your Account ID here: "
echo.
echo ========================================
echo   DEPLOYING...
echo ========================================
echo.
set CLOUDFLARE_API_TOKEN=%CF_API_TOKEN%
set CLOUDFLARE_ACCOUNT_ID=%CF_ACCOUNT_ID%
wrangler pages deploy . --project-name=ideasbeforetime
echo.
if %ERRORLEVEL% EQU 0 (
    echo ✅ SUCCESS! Site deployed!
    echo.
    echo Testing in 30 seconds...
    timeout /t 30 /nobreak
    node test-live-deployment-dec9.js
) else (
    echo ❌ FAILED! Check error above.
)
echo.
pause
