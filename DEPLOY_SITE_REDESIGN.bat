@echo off
echo ========================================
echo SITE REDESIGN DEPLOYMENT
echo ========================================
echo.

echo Step 1: Adding new files to Git...
git add learn.html tools.html insights.html
git add sitemap-new.xml
git add SITE_REDESIGN_IMPLEMENTATION_COMPLETE.txt
git add UNIFIED_SITE_REDESIGN_PLAN.txt
git add SITE_STREAMLINE_PREVIEW.txt

echo.
echo Step 2: Committing changes...
git commit -m "Site redesign: 4-hub structure with professional navigation"

echo.
echo Step 3: Pushing to GitHub...
git push

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo NEXT STEPS (MANDATORY):
echo.
echo 1. Wait 2-5 minutes for Cloudflare deployment
echo.
echo 2. PURGE CLOUDFLARE CACHE:
echo    - Go to: https://dash.cloudflare.com
echo    - Select: onestepforthelife.pages.dev
echo    - Click: Caching -^> Purge Everything
echo    - Wait: 30 seconds
echo.
echo 3. TEST LIVE SITE:
echo    - Visit: https://onestepforthelife.com/learn.html
echo    - Visit: https://onestepforthelife.com/tools.html
echo    - Visit: https://onestepforthelife.com/insights.html
echo    - Test navigation dropdowns
echo    - Test mobile view
echo.
echo 4. ACTIVATE NEW SITEMAP (after testing):
echo    - Backup: ren sitemap.xml sitemap-old.xml
echo    - Activate: ren sitemap-new.xml sitemap.xml
echo    - Push again
echo    - Submit to Google Search Console
echo.
echo ========================================
