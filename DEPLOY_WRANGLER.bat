@echo off
echo ========================================
echo DEPLOYING TO CLOUDFLARE (BYPASS GITHUB)
echo ========================================
echo.

echo Deploying your site directly to Cloudflare...
echo This will take 30-60 seconds...
echo.

call wrangler pages deploy . --project-name=onestepforthelife

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your site is now live at:
echo https://onestepforthelife.com
echo.
echo No GitHub needed!
echo.
pause
