@echo off
echo ========================================
echo KIRO ENVIRONMENT SETUP
echo ========================================
echo.

echo Checking installed tools...
echo.

REM Check Node.js
echo [1/3] Node.js:
node --version 2>nul
if %errorlevel% equ 0 (
    echo    ✓ Node.js installed
) else (
    echo    ✗ Node.js NOT found
    echo    Download: https://nodejs.org/
)
echo.

REM Check Python
echo [2/3] Python:
python --version 2>nul
if %errorlevel% equ 0 (
    echo    ✓ Python installed
) else (
    echo    ✗ Python NOT found
    echo    Download: https://www.python.org/downloads/
)
echo.

REM Check Git
echo [3/3] Git:
git --version 2>nul
if %errorlevel% equ 0 (
    echo    ✓ Git installed and in PATH
) else (
    echo    ✗ Git NOT in PATH
    echo.
    echo    FIXING: Adding Git to PATH...
    
    REM Check if GitHub Desktop's git exists
    if exist "C:\Users\%USERNAME%\AppData\Local\GitHubDesktop\app-3.4.9\resources\app\git\cmd" (
        echo    Found GitHub Desktop Git
        echo    Adding to PATH for this session...
        set "PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\GitHubDesktop\app-3.4.9\resources\app\git\cmd"
        
        REM Test again
        git --version 2>nul
        if %errorlevel% equ 0 (
            echo    ✓ Git now working!
            echo.
            echo    To make permanent, run as Administrator:
            echo    setx PATH "%PATH%;C:\Users\%USERNAME%\AppData\Local\GitHubDesktop\app-3.4.9\resources\app\git\cmd" /M
        )
    ) else (
        echo    GitHub Desktop Git not found
        echo    Download Git: https://git-scm.com/download/win
    )
)
echo.

echo ========================================
echo SETUP COMPLETE
echo ========================================
echo.
echo Next steps:
echo 1. If Git not in PATH, run this as Administrator
echo 2. Or download Git for Windows
echo 3. Restart PowerShell/CMD after installing
echo.
