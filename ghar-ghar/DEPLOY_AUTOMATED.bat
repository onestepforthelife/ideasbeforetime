@echo off
echo ========================================
echo  Ghar Ghar Game - Automated Deployment
echo ========================================
echo.
echo This will automatically deploy your game to Cloudflare!
echo (You must run SETUP_WRANGLER.bat first)
echo.
pause

cd "C:\Users\araag\OneDrive\amit Pics personal\Cloudfare\ghar-ghar"

echo Deploying to Cloudflare Pages...
wrangler pages deploy . --project-name=ghar-ghar-game

echo.
echo ========================================
echo  Deployment Complete!
echo ========================================
echo.
echo Your game is live at:
echo https://ghar-ghar-game.pages.dev/ghar-ghar-game.html
echo.
pause
