@echo off
echo ========================================
echo  PUSHING TO GITHUB
echo ========================================
echo.

cd /d "%~dp0"

echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "Added chemical reports inventory and footer CSS fixes"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo  DONE! Site will deploy in 2-3 minutes
echo ========================================
echo.
echo Check: https://ideasbeforetime.pages.dev
echo.
pause
