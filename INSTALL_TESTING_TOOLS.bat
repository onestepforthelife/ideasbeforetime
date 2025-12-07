@echo off
echo ========================================
echo INSTALLING TESTING TOOLS FOR KIRO
echo ========================================
echo.

echo This will install 4 powerful testing tools:
echo 1. Playwright - Visual testing
echo 2. Lighthouse - Performance testing
echo 3. Pa11y - Accessibility testing
echo 4. HTMLHint - HTML validation
echo.

pause

echo.
echo Step 1: Installing Playwright...
echo ========================================
call npm install -g playwright
if %errorlevel% neq 0 (
    echo ERROR: Playwright installation failed
    pause
    exit /b 1
)
echo ✅ Playwright installed successfully
echo.

echo Step 2: Installing Playwright browsers...
echo ========================================
call playwright install
if %errorlevel% neq 0 (
    echo ERROR: Playwright browsers installation failed
    pause
    exit /b 1
)
echo ✅ Playwright browsers installed successfully
echo.

echo Step 3: Installing Lighthouse...
echo ========================================
call npm install -g lighthouse
if %errorlevel% neq 0 (
    echo ERROR: Lighthouse installation failed
    pause
    exit /b 1
)
echo ✅ Lighthouse installed successfully
echo.

echo Step 4: Installing Pa11y...
echo ========================================
call npm install -g pa11y
if %errorlevel% neq 0 (
    echo ERROR: Pa11y installation failed
    pause
    exit /b 1
)
echo ✅ Pa11y installed successfully
echo.

echo Step 5: Installing HTMLHint...
echo ========================================
call npm install -g htmlhint
if %errorlevel% neq 0 (
    echo ERROR: HTMLHint installation failed
    pause
    exit /b 1
)
echo ✅ HTMLHint installed successfully
echo.

echo ========================================
echo ✅ ALL TOOLS INSTALLED SUCCESSFULLY!
echo ========================================
echo.
echo You can now use:
echo - playwright test (visual testing)
echo - lighthouse https://ideasbeforetime.pages.dev (performance)
echo - pa11y https://ideasbeforetime.pages.dev (accessibility)
echo - htmlhint *.html (HTML validation)
echo.
echo Next: Run test-all-tools.bat to verify installation
echo ========================================

pause
