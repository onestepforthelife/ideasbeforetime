@echo off
echo ========================================
echo BACKUP WORKSPACE SETTINGS
echo ========================================
echo.

REM Create backup folder with timestamp
set timestamp=%date:~-4%%date:~-7,2%%date:~-10,2%_%time:~0,2%%time:~3,2%
set timestamp=%timestamp: =0%
set backup_folder=C:\Users\araag\Documents\Kiro_Workspace_Backup_%timestamp%

echo Creating backup folder: %backup_folder%
mkdir "%backup_folder%"

echo.
echo Copying workspace settings...
xcopy "Cloudfare\.kiro" "%backup_folder%\.kiro\" /E /I /H /Y

echo.
echo Copying important files...
xcopy "Cloudfare\*.md" "%backup_folder%\" /Y
xcopy "Cloudfare\*.txt" "%backup_folder%\" /Y
xcopy "Cloudfare\*.bat" "%backup_folder%\" /Y

echo.
echo ========================================
echo BACKUP COMPLETE!
echo ========================================
echo.
echo Location: %backup_folder%
echo.
echo What was backed up:
echo - All steering files (.kiro/steering/)
echo - All settings (.kiro/settings/)
echo - All documentation (.md, .txt)
echo - All scripts (.bat)
echo.
echo You can now copy this folder to OneDrive or Google Drive!
echo.
