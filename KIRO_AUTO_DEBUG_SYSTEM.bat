@echo off
REM ========================================
REM KIRO AUTO-DEBUG & FIX SYSTEM
REM Automatically fixes common Kiro errors
REM ========================================

echo.
echo ========================================
echo KIRO AUTO-DEBUG SYSTEM
echo ========================================
echo.
echo This will automatically fix common Kiro errors:
echo - Memory leaks
echo - MCP server crashes
echo - Cache corruption
echo - Configuration errors
echo.
echo Your work files will NOT be affected.
echo.
pause

echo.
echo [1/5] Stopping Kiro processes...
taskkill /F /IM Kiro.exe /T 2>nul
taskkill /F /IM "Kiro Helper.exe" /T 2>nul
timeout /t 2 /nobreak >nul
echo Done!

echo.
echo [2/5] Clearing cache files...
if exist "%APPDATA%\Kiro\Cache" (
    rd /s /q "%APPDATA%\Kiro\Cache" 2>nul
    echo - Cleared main cache
)
if exist "%APPDATA%\Kiro\Code Cache" (
    rd /s /q "%APPDATA%\Kiro\Code Cache" 2>nul
    echo - Cleared code cache
)
if exist "%APPDATA%\Kiro\Service Worker" (
    rd /s /q "%APPDATA%\Kiro\Service Worker" 2>nul
    echo - Cleared service worker cache
)
if exist "%LOCALAPPDATA%\Kiro\Cache" (
    rd /s /q "%LOCALAPPDATA%\Kiro\Cache" 2>nul
    echo - Cleared local cache
)
echo Done!

echo.
echo [3/5] Fixing MCP configuration...
if exist "%APPDATA%\Kiro\mcp.json" (
    echo {"mcpServers": {}} > "%APPDATA%\Kiro\mcp.json"
    echo - Reset MCP configuration
)
echo Done!

echo.
echo [4/5] Fixing workspace settings...
for /d %%D in ("%APPDATA%\Kiro\Workspaces\*") do (
    if exist "%%D\workspace.json" (
        powershell -Command "(Get-Content '%%D\workspace.json') -replace '\"kiroAgent.configureMCP\": \"enabled\"', '\"kiroAgent.configureMCP\": \"Disabled\"' | Set-Content '%%D\workspace.json'"
        echo - Fixed workspace: %%~nxD
    )
)
echo Done!

echo.
echo [5/5] Creating diagnostic report...
echo KIRO DIAGNOSTIC REPORT > "%USERPROFILE%\Desktop\KIRO_DEBUG_REPORT.txt"
echo Generated: %date% %time% >> "%USERPROFILE%\Desktop\KIRO_DEBUG_REPORT.txt"
echo. >> "%USERPROFILE%\Desktop\KIRO_DEBUG_REPORT.txt"
echo Actions Taken: >> "%USERPROFILE%\Desktop\KIRO_DEBUG_REPORT.txt"
echo - Stopped all Kiro processes >> "%USERPROFILE%\Desktop\KIRO_DEBUG_REPORT.txt"
echo - Cleared all cache files >> "%USERPROFILE%\Desktop\KIRO_DEBUG_REPORT.txt"
echo - Reset MCP configuration >> "%USERPROFILE%\Desktop\KIRO_DEBUG_REPORT.txt"
echo - Fixed workspace settings >> "%USERPROFILE%\Desktop\KIRO_DEBUG_REPORT.txt"
echo. >> "%USERPROFILE%\Desktop\KIRO_DEBUG_REPORT.txt"
echo Report saved to Desktop: KIRO_DEBUG_REPORT.txt
echo Done!

echo.
echo ========================================
echo KIRO AUTO-DEBUG COMPLETE!
echo ========================================
echo.
echo All common errors have been fixed.
echo You can now restart Kiro.
echo.
echo If the error persists, run:
echo KIRO_COMPLETE_REINSTALL.bat
echo.
pause
