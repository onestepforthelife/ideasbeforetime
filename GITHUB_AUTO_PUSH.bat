@echo off
echo ========================================
echo AUTO PUSH TO GITHUB
echo ========================================
echo.

REM Change to your repository directory
cd /d "C:\Users\araag\Documents\Cloudfare"

echo Adding all changes...
git add .

echo.
echo Committing changes...
git commit -m "Auto-commit: %date% %time%"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo DONE! Changes pushed to GitHub
echo ========================================
echo.
echo Check: https://github.com/your-username/your-repo
echo.
