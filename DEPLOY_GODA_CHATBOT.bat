@echo off
echo ========================================
echo GODA AI CHATBOT - DEPLOYMENT
echo ========================================
echo.

echo Step 1: Checking files...
if not exist "goda-chatbot.js" (
    echo ERROR: goda-chatbot.js not found!
    pause
    exit /b 1
)

if not exist "workers\goda-ai-api.js" (
    echo ERROR: workers\goda-ai-api.js not found!
    pause
    exit /b 1
)

echo ✅ All files present
echo.

echo Step 2: What to do next...
echo.
echo BEFORE DEPLOYING TO GITHUB:
echo ========================================
echo.
echo 1. Setup Cloudflare Worker (5 min)
echo    - Go to: https://dash.cloudflare.com
echo    - Create Worker named: goda-ai-api
echo    - Copy code from: workers/goda-ai-api.js
echo    - Add API key as environment variable
echo.
echo 2. Update chatbot code (1 min)
echo    - Open: goda-chatbot.js
echo    - Find: YOUR-SUBDOMAIN
echo    - Replace with your actual subdomain
echo.
echo 3. Add to pages (1 min)
echo    - Add to index.html: ^<script src="goda-chatbot.js"^>^</script^>
echo    - Or add to common-footer.js for all pages
echo.
echo 4. Test locally (2 min)
echo    - Open index.html in browser
echo    - Click GODA AI button
echo    - Send test message
echo    - Verify AI responds
echo.
echo ========================================
echo.

echo Ready to deploy to GitHub?
echo.
echo This will:
echo - Add goda-chatbot.js to your site
echo - Add workers/goda-ai-api.js (for reference)
echo - Push to GitHub
echo - Deploy to Cloudflare Pages
echo.

set /p confirm="Continue? (y/n): "
if /i not "%confirm%"=="y" (
    echo Deployment cancelled.
    pause
    exit /b 0
)

echo.
echo ========================================
echo DEPLOYING TO GITHUB
echo ========================================
echo.

git add goda-chatbot.js
git add workers/goda-ai-api.js
git add GODA_AI_SECURE_SETUP_GUIDE.txt
git add DEPLOY_GODA_CHATBOT.bat

git commit -m "Add GODA AI Chatbot - Secure Production Version"

echo.
echo Pushing to GitHub...
git push

echo.
echo ========================================
echo ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Wait 2-5 minutes for Cloudflare deployment
echo.
echo 2. ⚠️  MANDATORY: Purge Cloudflare cache
echo    - Go to: https://dash.cloudflare.com
echo    - Select: onestepforthelife.pages.dev
echo    - Click: Caching → Purge Everything
echo    - Wait: 30 seconds
echo.
echo 3. Test on live site:
echo    - Visit: https://onestepforthelife.com
echo    - Click: GODA AI button (bottom-right)
echo    - Send: "What tools do you have?"
echo    - Verify: AI responds correctly
echo.
echo 4. If chatbot not showing:
echo    - Check: Did you add ^<script src="goda-chatbot.js"^>^</script^> to pages?
echo    - Check: Browser console for errors (F12)
echo    - Clear: Browser cache (Ctrl+Shift+R)
echo.
echo 5. If "Connection error":
echo    - Check: Worker URL in goda-chatbot.js is correct
echo    - Check: Worker is deployed in Cloudflare
echo    - Check: API key is added to Worker settings
echo.
echo ========================================
echo.
echo 📖 Full setup guide: GODA_AI_SECURE_SETUP_GUIDE.txt
echo.
pause
