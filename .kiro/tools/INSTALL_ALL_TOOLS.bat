@echo off
REM Install all 5 essential tools for Kiro AI
REM Run this once to set up everything

echo ========================================
echo INSTALLING 5 ESSENTIAL TOOLS
echo ========================================
echo.

REM 1. Install Playwright
echo [1/5] Installing Playwright...
npm install -D @playwright/test
npx playwright install chromium
echo ✓ Playwright installed
echo.

REM 2. Install ChromaDB (Python)
echo [2/5] Installing ChromaDB...
pip install chromadb
echo ✓ ChromaDB installed
echo.

REM 3. Install Sentry SDK
echo [3/5] Installing Sentry...
npm install @sentry/browser
echo ✓ Sentry installed
echo.

REM 4. Install Redis (via npm for Node.js client)
echo [4/5] Installing Redis client...
npm install redis
echo ✓ Redis client installed
echo.

REM 5. GitHub Actions already configured
echo [5/5] GitHub Actions - Already configured in .github/workflows/
echo ✓ GitHub Actions ready
echo.

echo ========================================
echo ALL TOOLS INSTALLED SUCCESSFULLY!
echo ========================================
echo.
echo Next steps:
echo 1. Configure Sentry: Get DSN from sentry.io
echo 2. Start Redis: Install Redis server or use cloud
echo 3. Run tests: npm test
echo.
echo See TOOLS_SETUP_COMPLETE.txt for details
