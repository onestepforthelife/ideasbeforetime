@echo off
echo ========================================
echo KIRO SESSION START - AUTO CHECKS
echo ========================================
echo.

REM 1. Check file count
for /f %%i in ('dir /B *.* ^| find /C /V ""') do set COUNT=%%i
echo Files: %COUNT% (target: ^<570)
if %COUNT% GTR 570 (
    echo WARNING: Too many files - run cleanup
    node cleanup-workspace.js
)

REM 2. Run enforcement
node MASTER_ENFORCEMENT.js
if errorlevel 1 (
    echo.
    echo BLOCKED - Fix violations first
    exit /b 1
)

REM 3. Quick test
node verify-my-work.js

echo.
echo ========================================
echo READY - Follow MASTER_RULES.md ONLY
echo ========================================
echo.
echo 3 RULES:
echo 1. EXECUTE FIRST (no plans)
echo 2. VERIFY BEFORE "DONE" (test it)
echo 3. COMPLETE WORKFLOW (all steps)
echo.
