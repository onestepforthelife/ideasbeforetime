@echo off
echo ========================================
echo DIRECT DEPLOYMENT OPTIONS
echo ========================================
echo.
echo GitHub is failing? No problem!
echo.
echo Choose your backup deployment method:
echo.
echo [1] Wrangler CLI (Automated - Recommended)
echo [2] Manual Upload (Browser - Easiest)
echo [3] View Full Guide
echo [4] Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto wrangler
if "%choice%"=="2" goto manual
if "%choice%"=="3" goto guide
if "%choice%"=="4" goto end

:wrangler
echo.
echo Checking if Wrangler is installed...
where wrangler >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Wrangler not found. Installing...
    echo.
    call SETUP_WRANGLER_BACKUP.bat
) else (
    echo.
    echo Wrangler found! Deploying...
    echo.
    call DEPLOY_WRANGLER.bat
)
goto end

:manual
echo.
echo Opening Cloudflare Dashboard...
echo.
echo Steps:
echo 1. Login to Cloudflare
echo 2. Go to Workers and Pages
echo 3. Click your site "onestepforthelife"
echo 4. Click "Create deployment"
echo 5. Choose "Direct Upload"
echo 6. Drag and drop your files
echo 7. Click "Deploy"
echo.
start https://dash.cloudflare.com
echo.
echo Browser opened. Follow the steps above.
echo.
pause
goto end

:guide
echo.
type MANUAL_UPLOAD_GUIDE.txt
echo.
pause
goto end

:end
echo.
echo ========================================
echo.
