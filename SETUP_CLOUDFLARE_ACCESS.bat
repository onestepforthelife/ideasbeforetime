@echo off
echo ╔══════════════════════════════════════════════════════════════╗
echo ║       CLOUDFLARE ACCESS SETUP - OPENING DASHBOARD            ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Opening Cloudflare Zero Trust dashboard...
echo.

REM Open Cloudflare Zero Trust
start https://one.dash.cloudflare.com/

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                  DASHBOARD OPENED!                           ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo NEXT STEPS (15 minutes):
echo.
echo 1. Login to Cloudflare
echo 2. Go to: Access ^> Applications
echo 3. Click: Add an Application
echo 4. Choose: Self-hosted
echo.
echo FOR SPO:
echo   - Name: Social Profile Optimizer
echo   - Domain: ideas-before-time.pages.dev
echo   - Path: /social-optimizer-*
echo   - Session: 24 hours
echo   - Auth: Email OTP
echo.
echo FOR CV ^& REPORTS:
echo   - Name: CV and Reports
echo   - Domain: ideas-before-time.pages.dev
echo   - Paths: /cv.html, /cv-preview.html, /market-reports.html
echo   - Session: 3 minutes (reports), 24 hours (CV)
echo   - Auth: Email OTP
echo.
echo DETAILED GUIDE: Open SPO_CLOUDFLARE_ACCESS_SETUP.txt
echo.
pause

REM Open the detailed guide
start notepad.exe "SPO_CLOUDFLARE_ACCESS_SETUP.txt"
