@echo off
REM Run this BEFORE every Kiro session
echo Checking workspace health...
node MASTER_ENFORCEMENT.js
if errorlevel 1 (
    echo.
    echo Fix violations before starting work
    pause
    exit /b 1
)
echo.
echo Ready to work
