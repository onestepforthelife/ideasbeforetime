@echo off
echo.
echo ⏳ Waiting 60 seconds for deployment...
timeout /t 60 /nobreak
echo.
echo 🔍 Testing live site...
node test-live-deployment-dec9.js
echo.
pause
