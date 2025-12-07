@echo off
echo.
echo ========================================
echo   PRE-PUSH VALIDATION CHECK
echo ========================================
echo.
echo Running local validation...
echo.

node pre-commit-check.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ✅ SAFE TO PUSH
    echo ========================================
    echo.
    echo All checks passed! You can now:
    echo 1. Open GitHub Desktop
    echo 2. Review changes
    echo 3. Commit with message
    echo 4. Push to GitHub
    echo.
) else (
    echo.
    echo ========================================
    echo   ❌ PUSH BLOCKED
    echo ========================================
    echo.
    echo Fix errors before pushing!
    echo Run the suggested fix commands above.
    echo.
)
