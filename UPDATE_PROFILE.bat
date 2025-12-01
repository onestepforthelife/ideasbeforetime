@echo off
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     📝 UPDATE YOUR PROFILE FOR AI AGENT 📝                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Your profile folder: amit profile for Kiro
echo.
echo What do you want to update?
echo.
echo 1. Add/Update CV (PDF)
echo 2. Update Keywords
echo 3. Update Sample Emails
echo 4. Update Profile Summary
echo 5. Open Profile Folder
echo 6. Exit
echo.
set /p choice="Enter choice (1-6): "

if "%choice%"=="1" goto update_cv
if "%choice%"=="2" goto update_keywords
if "%choice%"=="3" goto update_samples
if "%choice%"=="4" goto update_profile
if "%choice%"=="5" goto open_folder
if "%choice%"=="6" goto end

:update_cv
echo.
echo Drop your CV PDF into: amit profile for Kiro\cv.pdf
echo Press any key when done...
pause >nul
goto end

:update_keywords
notepad "amit profile for Kiro\keywords.txt"
echo.
echo ✅ Keywords updated!
goto end

:update_samples
notepad "amit profile for Kiro\sample_emails.txt"
echo.
echo ✅ Sample emails updated!
goto end

:update_profile
notepad "amit profile for Kiro\profile_summary.txt"
echo.
echo ✅ Profile summary updated!
goto end

:open_folder
explorer "amit profile for Kiro"
goto end

:end
echo.
echo ✅ Done! Agent will use updated profile on next run.
echo.
pause
