@echo off
echo ========================================
echo PUSHING GODA AI CHATBOT TO GITHUB
echo ========================================
echo.

echo Adding files...
git add goda-chatbot.js
git add workers/goda-ai-api.js

echo.
echo Committing...
git commit -m "Connect GODA AI chatbot to Cloudflare Worker with Gemini API"

echo.
echo Pushing to GitHub...
git push

echo.
echo ========================================
echo DONE! Wait 2-3 minutes for deployment
echo Then test at: https://onestepforthelife.com
echo ========================================
echo.
