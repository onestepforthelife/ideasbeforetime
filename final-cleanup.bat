@echo off
echo Final Cleanup: 679 to 570 target
echo.

REM Archive old dated files
for %%f in (*.txt *.md) do (
    echo %%f | findstr /R "DEC[0-9]" >nul
    if not errorlevel 1 (
        if not "%%f"=="3_WEEKS_COMPLETE_LEARNINGS.md" (
            if not "%%f"=="MASTER_RULES.md" (
                move "%%f" "_archive\old_docs\" >nul 2>&1
            )
        )
    )
)

REM Remove old test/diagnostic files
del /Q test-*.js 2>nul
del /Q check-*.js 2>nul
del /Q verify-*.js 2>nul
del /Q fix-*.js 2>nul
del /Q diagnostic-*.js 2>nul

REM Remove duplicate guides
for %%f in (*_GUIDE.txt *_INSTRUCTIONS.txt *_STEPS.txt *_CHECKLIST.txt) do (
    if exist "%%~nf_*.txt" del "%%f"
)

dir *.* /B | find /C /V ""
echo.
echo Cleanup complete
