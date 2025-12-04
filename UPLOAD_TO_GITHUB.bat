@echo off
echo ========================================
echo UPLOAD TO GITHUB - Ideas Before Time
echo ========================================
echo.

cd /d "C:\Users\araag\Documents\Cloudfare"

REM Use GitHub Desktop's git
set GIT="C:\Users\araag\AppData\Local\GitHubDesktop\app-3.5.4\resources\app\git\cmd\git.exe"

echo Step 1: Initialize Git (if not done)
%GIT% init

echo.
echo Step 2: Add all files
%GIT% add .

echo.
echo Step 3: Commit changes with timestamp
%GIT% commit -m "New domain migration + all pending updates Dec 5"

echo.
echo Step 4: Connect to GitHub (if not done)
%GIT% remote remove origin 2>nul
%GIT% remote add origin https://github.com/onestepforthelife/ideasbeforetime.git

echo.
echo Step 5: Push to GitHub
%GIT% branch -M main
%GIT% push -u origin main --force

echo.
echo ========================================
echo DONE! Changes uploaded to GitHub
echo Cloudflare Pages will auto-deploy
echo ========================================
