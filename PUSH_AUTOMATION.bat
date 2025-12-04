@echo off
echo ========================================
echo PUSH LINKEDIN AUTO-SYNC AUTOMATION
echo ========================================
echo.

cd /d "C:\Users\araag\Documents\Cloudfare"

REM Use GitHub Desktop's git
set GIT="C:\Users\araag\AppData\Local\GitHubDesktop\app-3.5.4\resources\app\git\cmd\git.exe"

echo Files to push:
echo - .github/workflows/sync-linkedin.yml
echo - .github/workflows/sync-linkedin-profile.yml
echo - sync-linkedin-public-profile.js
echo - LINKEDIN_AUTO_SYNC_COMPLETE.txt
echo - ALL_AUTOMATION_COMPLETE_DEC6.txt
echo - PUSH_AUTOMATION_NOW.txt
echo.

echo Step 1: Add automation files
%GIT% add .github/workflows/sync-linkedin.yml
%GIT% add .github/workflows/sync-linkedin-profile.yml
%GIT% add sync-linkedin-public-profile.js
%GIT% add LINKEDIN_AUTO_SYNC_COMPLETE.txt
%GIT% add ALL_AUTOMATION_COMPLETE_DEC6.txt
%GIT% add PUSH_AUTOMATION_NOW.txt
%GIT% add PUSH_AUTOMATION.bat

echo.
echo Step 2: Commit changes
%GIT% commit -m "🤖 Add LinkedIn auto-sync automation - zero manual work forever!"

echo.
echo Step 3: Push to GitHub
%GIT% push origin main

echo.
echo ========================================
echo ✅ AUTOMATION PUSHED TO GITHUB!
echo ========================================
echo.
echo GitHub Actions will activate in 30 seconds
echo Daily sync scheduled for 7 AM IST
echo.
echo NEXT TIME YOU POST ON LINKEDIN:
echo 1. Add to linkedin-posts.txt
echo 2. Run UPLOAD_TO_GITHUB.bat
echo 3. Wait 2 minutes
echo 4. Post is LIVE on blog!
echo.
echo ========================================
