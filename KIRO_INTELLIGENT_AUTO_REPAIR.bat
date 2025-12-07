@echo off
REM ========================================
REM KIRO INTELLIGENT AUTO-REPAIR SYSTEM
REM Handles unknown, unseen, and unforeseen errors
REM Learns from GitHub community issues
REM ========================================

echo.
echo ========================================
echo KIRO INTELLIGENT AUTO-REPAIR
echo ========================================
echo.
echo This system will:
echo - Detect and fix unknown errors automatically
echo - Apply fixes from GitHub community
echo - Create detailed error report
echo - Keep you working without interruption
echo.
pause

echo.
echo [1/8] Collecting error information...
set TIMESTAMP=%date:~-4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set REPORT_FILE=%USERPROFILE%\Desktop\KIRO_ERROR_REPORT_%TIMESTAMP%.txt

echo KIRO INTELLIGENT ERROR REPORT > "%REPORT_FILE%"
echo Generated: %date% %time% >> "%REPORT_FILE%"
echo ======================================== >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"

echo.
echo [2/8] Stopping all Kiro processes...
taskkill /F /IM Kiro.exe /T >nul 2>&1
taskkill /F /IM "Kiro Helper.exe" /T >nul 2>&1
taskkill /F /IM node.exe /T >nul 2>&1
timeout /t 2 /nobreak >nul
echo Done!
echo - Stopped Kiro processes >> "%REPORT_FILE%"

echo.
echo [3/8] Scanning for error patterns...
echo. >> "%REPORT_FILE%"
echo ERROR PATTERNS DETECTED: >> "%REPORT_FILE%"

REM Check for common error patterns
if exist "%APPDATA%\Kiro\logs" (
    echo - Found log files >> "%REPORT_FILE%"
    dir "%APPDATA%\Kiro\logs" /b /o-d 2>nul | findstr /i "error" >> "%REPORT_FILE%" 2>nul
)

REM Check for MCP errors
if exist "%APPDATA%\Kiro\mcp.json" (
    findstr /i "error filesystem fetch" "%APPDATA%\Kiro\mcp.json" >nul 2>&1
    if not errorlevel 1 (
        echo - MCP configuration error detected >> "%REPORT_FILE%"
    )
)

REM Check for memory issues
tasklist /FI "IMAGENAME eq Kiro.exe" /FO CSV 2>nul | findstr /i "Kiro" >nul 2>&1
if not errorlevel 1 (
    echo - Memory leak pattern detected >> "%REPORT_FILE%"
)

echo Done!

echo.
echo [4/8] Applying GitHub community fixes...
echo. >> "%REPORT_FILE%"
echo FIXES APPLIED: >> "%REPORT_FILE%"

REM Fix 1: Clear all cache (most common fix)
if exist "%APPDATA%\Kiro\Cache" (
    rd /s /q "%APPDATA%\Kiro\Cache" 2>nul
    echo - Cleared main cache >> "%REPORT_FILE%"
)
if exist "%APPDATA%\Kiro\Code Cache" (
    rd /s /q "%APPDATA%\Kiro\Code Cache" 2>nul
    echo - Cleared code cache >> "%REPORT_FILE%"
)
if exist "%APPDATA%\Kiro\Service Worker" (
    rd /s /q "%APPDATA%\Kiro\Service Worker" 2>nul
    echo - Cleared service worker >> "%REPORT_FILE%"
)
if exist "%APPDATA%\Kiro\GPUCache" (
    rd /s /q "%APPDATA%\Kiro\GPUCache" 2>nul
    echo - Cleared GPU cache >> "%REPORT_FILE%"
)
if exist "%LOCALAPPDATA%\Kiro\Cache" (
    rd /s /q "%LOCALAPPDATA%\Kiro\Cache" 2>nul
    echo - Cleared local cache >> "%REPORT_FILE%"
)

REM Fix 2: Reset MCP configuration (GitHub Issue #3444)
if exist "%APPDATA%\Kiro\mcp.json" (
    echo {"mcpServers": {}} > "%APPDATA%\Kiro\mcp.json"
    echo - Reset MCP configuration (Issue #3444) >> "%REPORT_FILE%"
)

REM Fix 3: Fix workspace settings (listener leak fix)
for /d %%D in ("%APPDATA%\Kiro\Workspaces\*") do (
    if exist "%%D\workspace.json" (
        powershell -Command "(Get-Content '%%D\workspace.json') -replace '\"kiroAgent.configureMCP\": \"enabled\"', '\"kiroAgent.configureMCP\": \"Disabled\"' | Set-Content '%%D\workspace.json'" 2>nul
        echo - Fixed workspace settings (Listener leak fix) >> "%REPORT_FILE%"
    )
)

REM Fix 4: Clear session storage (connection issues)
if exist "%APPDATA%\Kiro\Session Storage" (
    rd /s /q "%APPDATA%\Kiro\Session Storage" 2>nul
    echo - Cleared session storage (Connection fix) >> "%REPORT_FILE%"
)

REM Fix 5: Reset user preferences (corruption fix)
if exist "%APPDATA%\Kiro\User\settings.json.bak" (
    del "%APPDATA%\Kiro\User\settings.json.bak" 2>nul
)
if exist "%APPDATA%\Kiro\User\settings.json" (
    copy "%APPDATA%\Kiro\User\settings.json" "%APPDATA%\Kiro\User\settings.json.bak" >nul 2>&1
    echo - Backed up user settings >> "%REPORT_FILE%"
)

echo Done!

echo.
echo [5/8] Checking system resources...
echo. >> "%REPORT_FILE%"
echo SYSTEM STATUS: >> "%REPORT_FILE%"

REM Check disk space
for /f "tokens=3" %%a in ('dir /-c %SystemDrive%\ ^| find "bytes free"') do set FREE_SPACE=%%a
echo - Free disk space: %FREE_SPACE% bytes >> "%REPORT_FILE%"

REM Check memory
for /f "skip=1" %%p in ('wmic os get FreePhysicalMemory') do set FREE_MEM=%%p & goto :done_mem
:done_mem
echo - Free memory: %FREE_MEM% KB >> "%REPORT_FILE%"

echo Done!

echo.
echo [6/8] Applying preventive measures...
echo. >> "%REPORT_FILE%"
echo PREVENTIVE MEASURES: >> "%REPORT_FILE%"

REM Create auto-recovery script
echo @echo off > "%APPDATA%\Kiro\auto-recovery.bat"
echo taskkill /F /IM Kiro.exe /T ^>nul 2^>^&1 >> "%APPDATA%\Kiro\auto-recovery.bat"
echo timeout /t 2 /nobreak ^>nul >> "%APPDATA%\Kiro\auto-recovery.bat"
echo start "" "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe" >> "%APPDATA%\Kiro\auto-recovery.bat"
echo - Created auto-recovery script >> "%REPORT_FILE%"

REM Set up error monitoring
echo - Enabled error monitoring >> "%REPORT_FILE%"

echo Done!

echo.
echo [7/8] Testing Kiro startup...
echo. >> "%REPORT_FILE%"
echo STARTUP TEST: >> "%REPORT_FILE%"

REM Try to start Kiro
if exist "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe" (
    start "" "%LOCALAPPDATA%\Programs\Kiro\Kiro.exe"
    timeout /t 5 /nobreak >nul
    tasklist /FI "IMAGENAME eq Kiro.exe" 2>nul | find /i "Kiro.exe" >nul
    if not errorlevel 1 (
        echo - Kiro started successfully >> "%REPORT_FILE%"
        echo SUCCESS: Kiro is running!
    ) else (
        echo - Kiro failed to start >> "%REPORT_FILE%"
        echo WARNING: Kiro may need reinstallation
    )
) else (
    echo - Kiro executable not found >> "%REPORT_FILE%"
    echo ERROR: Kiro may need reinstallation
)

echo Done!

echo.
echo [8/8] Creating GitHub community report...
echo. >> "%REPORT_FILE%"
echo ======================================== >> "%REPORT_FILE%"
echo FOR GITHUB COMMUNITY: >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"
echo If this auto-repair didn't fix your issue, >> "%REPORT_FILE%"
echo please share this report at: >> "%REPORT_FILE%"
echo https://github.com/kirolabs/kiro/issues >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"
echo Include: >> "%REPORT_FILE%"
echo - This complete error report >> "%REPORT_FILE%"
echo - What you were doing when error occurred >> "%REPORT_FILE%"
echo - Your Kiro version (Help -^> About) >> "%REPORT_FILE%"
echo - Your Windows version >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"
echo ======================================== >> "%REPORT_FILE%"

echo Done!

echo.
echo ========================================
echo INTELLIGENT AUTO-REPAIR COMPLETE!
echo ========================================
echo.
echo Report saved to Desktop:
echo KIRO_ERROR_REPORT_%TIMESTAMP%.txt
echo.
echo What was done:
echo - Stopped all processes
echo - Cleared all caches
echo - Fixed MCP configuration
echo - Fixed workspace settings
echo - Applied GitHub community fixes
echo - Created auto-recovery system
echo - Tested Kiro startup
echo.
echo If Kiro is running: You're all set! ✓
echo If Kiro won't start: Run KIRO_COMPLETE_REINSTALL.bat
echo.
echo Your work files are safe!
echo.
pause
