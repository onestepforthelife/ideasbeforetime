@echo off
echo ========================================
echo PUSHING 100 LINKEDIN BLOG POSTS
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Add all files
"C:\Program Files\GitHub Desktop\resources\app\git\cmd\git.exe" add .

echo.
echo Step 2: Commit with message
"C:\Program Files\GitHub Desktop\resources\app\git\cmd\git.exe" commit -m "Add 100 LinkedIn blog posts organized by category - Leadership, Technology, Industry Insights, Career Advice, Business Strategy"

echo.
echo Step 3: Push to GitHub
"C:\Program Files\GitHub Desktop\resources\app\git\cmd\git.exe" push origin main

echo.
echo ========================================
echo DONE! Blog posts pushed to GitHub
echo Cloudflare will auto-deploy in 2-3 min
echo ========================================
echo.
echo Visit: https://ideasbeforetime.pages.dev/blog.html
