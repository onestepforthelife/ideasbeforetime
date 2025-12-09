@echo off
echo ========================================
echo DIRECT CLOUDFLARE PAGES UPLOAD
echo ========================================
echo.
echo This will upload your site directly to Cloudflare
echo Bypassing GitHub completely
echo.
echo Prerequisites:
echo 1. Install Wrangler: npm install -g wrangler
echo 2. Login: wrangler login
echo.
pause
echo.
echo Installing Wrangler (if not installed)...
npm install -g wrangler
echo.
echo Logging in to Cloudflare...
wrangler login
echo.
echo Deploying to Cloudflare Pages...
wrangler pages deploy . --project-name=ideasbeforetime
echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your site should be live in 30 seconds at:
echo https://onestepforthelife.com
echo.
pause
