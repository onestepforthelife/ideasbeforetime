@echo off
echo ========================================
echo PUSHING NEW DOMAIN MIGRATION
echo ========================================
echo.
echo Old: ideasbeforetime.pages.dev
echo New: onestepforthelife.com
echo.
echo Files to push:
echo - _redirects (domain redirect)
echo - 15 updated files with new domain
echo - Migration scripts and docs
echo.

cd /d "%~dp0"

echo Adding all changes...
git add .

echo.
echo Committing changes...
git commit -m "Migrate to new domain onestepforthelife.com - Auto redirect old domain"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo PUSH COMPLETE!
echo ========================================
echo.
echo Wait 2-3 minutes for Cloudflare Pages to build
echo Then test: https://onestepforthelife.com/
echo.
echo Old domain will auto-redirect to new domain
echo ========================================
