@echo off
echo ========================================
echo  Cloudflare Wrangler Setup
echo  (Official Cloudflare CLI Tool)
echo ========================================
echo.
echo This will install Wrangler CLI for automated deployments.
echo You'll login ONCE using your browser (secure OAuth).
echo After that, deployments are fully automated!
echo.
pause

echo Installing Wrangler...
npm install -g wrangler

echo.
echo Wrangler installed! Now login (opens browser):
wrangler login

echo.
echo Setup complete! Now you can deploy with one command:
echo   wrangler pages deploy ghar-ghar --project-name=ghar-ghar-game
echo.
pause
