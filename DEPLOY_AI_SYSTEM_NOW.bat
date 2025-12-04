@echo off
echo ========================================
echo DEPLOYING SECURE AI SYSTEM
echo ========================================
echo.

echo Step 1: Checking files...
if exist ai-config.js (
    echo [OK] ai-config.js exists
) else (
    echo [ERROR] ai-config.js not found!
    echo Please create it first.
    pause
    exit /b 1
)

if exist .gitignore (
    echo [OK] .gitignore exists
) else (
    echo [ERROR] .gitignore not found!
    pause
    exit /b 1
)

echo.
echo Step 2: Adding files to git...
git add .gitignore
git add AI_MULTI_PROVIDER_FAILOVER.js
git add AI_SECURITY_COMPLETE_GUIDE.md
git add workers/
git add DEPLOY_AI_SYSTEM_NOW.bat

echo.
echo Step 3: Committing...
git commit -m "Secure multi-provider AI system - keys in config file"

echo.
echo Step 4: Pushing to GitHub...
git push

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo IMPORTANT: ai-config.js was NOT pushed (it's in .gitignore)
echo.
echo Next steps:
echo 1. Go to Cloudflare Pages dashboard
echo 2. Upload ai-config.js manually as static asset
echo 3. Test on live site
echo.
echo OR use Cloudflare Workers for production security:
echo 1. npm install -g wrangler
echo 2. cd workers
echo 3. wrangler login
echo 4. wrangler secret put GROQ_API_KEY
echo 5. wrangler secret put GEMINI_API_KEY
echo 6. wrangler secret put HUGGINGFACE_TOKEN
echo 7. wrangler secret put COHERE_API_KEY
echo 8. wrangler deploy
echo.
echo See AI_SECURITY_COMPLETE_GUIDE.md for details
echo ========================================
