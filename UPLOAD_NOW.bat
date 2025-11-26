@echo off
cd /d "C:\Users\araag\Documents\Cloudfare"

REM Use GitHub Desktop's git
set GIT="C:\Users\araag\AppData\Local\GitHubDesktop\app-3.5.4\resources\app\git\cmd\git.exe"

echo Initializing Git...
%GIT% init

echo Adding files...
%GIT% add .

echo Committing...
%GIT% commit -m "Watermark fix and site updates"

echo Setting remote...
%GIT% remote remove origin 2>nul
%GIT% remote add origin https://github.com/onestepforthelife/ideas-before-time.git

echo Pushing to GitHub...
%GIT% branch -M main
%GIT% push -u origin main --force

echo Done!
