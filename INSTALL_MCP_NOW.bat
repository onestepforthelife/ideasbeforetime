@echo off
echo ========================================
echo MCP AUTOMATIC INSTALLER
echo ========================================
echo.

echo Step 1: Installing UV (Python package manager)...
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

echo.
echo Step 2: Refreshing environment...
call refreshenv

echo.
echo Step 3: Testing UV installation...
uvx --version

echo.
echo Step 4: Installing MCP servers...
echo Installing fetch server...
uvx mcp-server-fetch --version

echo Installing filesystem server...
uvx mcp-server-filesystem --version

echo.
echo ========================================
echo INSTALLATION COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Close this window
echo 2. RESTART KIRO (File → Exit, then reopen)
echo 3. Come back to chat
echo 4. Say "test MCP"
echo.
echo MCP servers will auto-start when Kiro restarts!
echo.
pause
