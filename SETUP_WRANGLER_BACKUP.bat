@echo off
echo ========================================
echo WRANGLER BACKUP DEPLOYMENT SETUP
echo ========================================
echo.

echo Step 1: Installing Wrangler CLI...
echo.
call npm install -g wrangler
echo.

echo Step 2: Login to Cloudflare...
echo (Browser will open - login with your Cloudflare account)
echo.
call wrangler login
echo.

echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo To deploy in future, just run:
echo   DEPLOY_WRANGLER.bat
echo.
pause
