@echo off
echo ========================================
echo   UPLOAD TO CLOUDFLARE PAGES
echo   Google AdSense Added to 58 Pages!
echo ========================================
echo.
echo Publisher ID: ca-pub-3181510462001437
echo.
echo OPTION 1: GitHub (Automatic)
echo ----------------------------
echo.
git add .
git commit -m "Added Google AdSense to all pages - Publisher ID: ca-pub-3181510462001437"
git push origin main
echo.
echo ✅ Pushed to GitHub!
echo ✅ Cloudflare Pages will auto-deploy in 2-3 minutes
echo.
echo Check deployment: https://dash.cloudflare.com/
echo.
pause
