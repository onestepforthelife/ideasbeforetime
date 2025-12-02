@echo off
echo ╔══════════════════════════════════════════════════════════════╗
echo ║          SPO LAUNCH AUTOMATION - OPENING EVERYTHING          ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Opening all sites you need to post on...
echo.

REM Open LinkedIn
echo [1/7] Opening LinkedIn...
start https://www.linkedin.com/feed/

REM Wait 2 seconds between opens
timeout /t 2 /nobreak >nul

REM Open Twitter
echo [2/7] Opening Twitter...
start https://twitter.com/compose/tweet

timeout /t 2 /nobreak >nul

REM Open Reddit - Jobs
echo [3/7] Opening Reddit r/jobs...
start https://www.reddit.com/r/jobs/submit

timeout /t 2 /nobreak >nul

REM Open Reddit - Career Guidance
echo [4/7] Opening Reddit r/careerguidance...
start https://www.reddit.com/r/careerguidance/submit

timeout /t 2 /nobreak >nul

REM Open WhatsApp Web
echo [5/7] Opening WhatsApp Web...
start https://web.whatsapp.com/

timeout /t 2 /nobreak >nul

REM Open Gmail (for email outreach)
echo [6/7] Opening Gmail...
start https://mail.google.com/mail/u/0/#inbox?compose=new

timeout /t 2 /nobreak >nul

REM Open marketing content file
echo [7/7] Opening marketing content...
start notepad.exe "SPO_MARKETING_CONTENT_READY.txt"

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    ALL SITES OPENED!                         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo NEXT STEPS:
echo 1. Copy content from the Notepad file that opened
echo 2. Paste into each site (LinkedIn, Twitter, Reddit, etc.)
echo 3. Post!
echo.
echo Goal: First customer within 24 hours! 🚀
echo.
pause
