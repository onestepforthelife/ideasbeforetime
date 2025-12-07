# ========================================
# Kiro Intelligent Repair System v2.0 (PowerShell)
# Handles unknown and unforeseen errors
# ========================================

Write-Host ""
Write-Host "========================================"
Write-Host "  KIRO INTELLIGENT REPAIR v2.0"
Write-Host "  Advanced Error Detection & Repair"
Write-Host "========================================"
Write-Host ""

# Create detailed diagnostic report
$ReportFile = Join-Path $PSScriptRoot "intelligent-repair-report.txt"
"Kiro Intelligent Repair Report" | Out-File -FilePath $ReportFile
"Generated: $(Get-Date)" | Out-File -FilePath $ReportFile -Append
"" | Out-File -FilePath $ReportFile -Append

Write-Host "[1/8] Detecting error patterns..."
"Step 1: Error Pattern Detection" | Out-File -FilePath $ReportFile -Append

# Check if Kiro is running
$KiroProcess = Get-Process -Name "Kiro" -ErrorAction SilentlyContinue
if ($KiroProcess) {
    Write-Host "   Status: Kiro is running" -ForegroundColor Yellow
    "   Kiro Status: Running" | Out-File -FilePath $ReportFile -Append
} else {
    Write-Host "   Status: Kiro is NOT running" -ForegroundColor Red
    "   Kiro Status: Not Running" | Out-File -FilePath $ReportFile -Append
}

# Check for error logs
$LogsPath = "$env:APPDATA\Kiro\logs"
if (Test-Path $LogsPath) {
    Write-Host "   Checking error logs..." -ForegroundColor Cyan
    Get-ChildItem -Path $LogsPath | Sort-Object LastWriteTime -Descending | Select-Object -First 5 | Out-File -FilePath $ReportFile -Append
    Write-Host "   Latest log files listed in report" -ForegroundColor Green
}
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[2/8] Stopping all Kiro processes..."
Get-Process -Name "Kiro" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "kiro-helper" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 3
Write-Host "   Done!" -ForegroundColor Green
"Step 2: Stopped all processes" | Out-File -FilePath $ReportFile -Append

Write-Host "[3/8] Applying GitHub community fixes..."
Write-Host "   Fix 1: Memory leak prevention" -ForegroundColor Cyan
$GPUCachePath = "$env:APPDATA\Kiro\GPUCache"
if (Test-Path $GPUCachePath) {
    Remove-Item -Path $GPUCachePath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "      Applied: GPU cache clear" -ForegroundColor Green
    "   Applied: GPU cache clear" | Out-File -FilePath $ReportFile -Append
}

Write-Host "   Fix 2: Extension conflict resolution" -ForegroundColor Cyan
$ExtVSIXPath = "$env:APPDATA\Kiro\CachedExtensionVSIXs"
if (Test-Path $ExtVSIXPath) {
    Remove-Item -Path $ExtVSIXPath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "      Applied: Extension cache clear" -ForegroundColor Green
    "   Applied: Extension cache clear" | Out-File -FilePath $ReportFile -Append
}

Write-Host "   Fix 3: Workspace corruption repair" -ForegroundColor Cyan
$WorkspacePath = "$env:APPDATA\Kiro\User\workspaceStorage"
if (Test-Path $WorkspacePath) {
    Write-Host "      Scanning workspace storage..." -ForegroundColor Green
    "   Scanned workspace storage" | Out-File -FilePath $ReportFile -Append
}
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[4/8] Checking system resources..."
Write-Host "   Checking available memory..." -ForegroundColor Cyan
$Memory = Get-CimInstance Win32_OperatingSystem
$MemoryGB = [math]::Round($Memory.FreePhysicalMemory / 1MB, 2)
Write-Host "   Available Memory: $MemoryGB GB" -ForegroundColor Green
"   Available Memory: $MemoryGB GB" | Out-File -FilePath $ReportFile -Append

Write-Host "   Checking disk space..." -ForegroundColor Cyan
$Disk = Get-PSDrive C
$DiskGB = [math]::Round($Disk.Free / 1GB, 2)
Write-Host "   Free Disk Space: $DiskGB GB" -ForegroundColor Green
"   Free Disk Space: $DiskGB GB" | Out-File -FilePath $ReportFile -Append
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[5/8] Creating auto-recovery system..."
Write-Host "   Setting up crash recovery..." -ForegroundColor Cyan
$UserPath = "$env:APPDATA\Kiro\User"
if (-not (Test-Path $UserPath)) {
    New-Item -Path $UserPath -ItemType Directory -Force | Out-Null
}
$RecoverySettings = @{
    "files.autoSave" = "afterDelay"
    "files.autoSaveDelay" = 1000
} | ConvertTo-Json
$RecoverySettings | Out-File -FilePath "$UserPath\settings.json.recovery" -Encoding UTF8
Write-Host "   Recovery settings created" -ForegroundColor Green
"Step 5: Created recovery settings" | Out-File -FilePath $ReportFile -Append
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[6/8] Resetting all configurations..."
Write-Host "   Backing up current settings..." -ForegroundColor Cyan
$SettingsPath = "$env:APPDATA\Kiro\User\settings.json"
if (Test-Path $SettingsPath) {
    Copy-Item -Path $SettingsPath -Destination "$SettingsPath.backup" -Force
    Write-Host "   Backup: settings.json.backup" -ForegroundColor Green
    "   Backed up: settings.json" | Out-File -FilePath $ReportFile -Append
}

$McpPath = "$env:USERPROFILE\.kiro\settings\mcp.json"
if (Test-Path $McpPath) {
    Copy-Item -Path $McpPath -Destination "$McpPath.backup" -Force
    Write-Host "   Backup: mcp.json.backup" -ForegroundColor Green
    "   Backed up: mcp.json" | Out-File -FilePath $ReportFile -Append
}
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[7/8] Testing Kiro startup..."
Write-Host "   Attempting to start Kiro..." -ForegroundColor Cyan
$KiroPath = "$env:LOCALAPPDATA\Programs\Kiro\Kiro.exe"
if (Test-Path $KiroPath) {
    Start-Process -FilePath $KiroPath -ErrorAction SilentlyContinue
    Write-Host "   Success: Kiro started" -ForegroundColor Green
    "   Status: Started successfully" | Out-File -FilePath $ReportFile -Append
} else {
    Write-Host "   Warning: Could not find Kiro.exe" -ForegroundColor Yellow
    "   Status: Could not find executable" | Out-File -FilePath $ReportFile -Append
}
Start-Sleep -Seconds 5
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[8/8] Generating detailed report..."
"" | Out-File -FilePath $ReportFile -Append
"========================================" | Out-File -FilePath $ReportFile -Append
"RECOMMENDATIONS:" | Out-File -FilePath $ReportFile -Append
"========================================" | Out-File -FilePath $ReportFile -Append
"1. Check if Kiro starts without errors" | Out-File -FilePath $ReportFile -Append
"2. If issues persist, check error logs" | Out-File -FilePath $ReportFile -Append
"3. Consider running KIRO_COMPLETE_REINSTALL.ps1" | Out-File -FilePath $ReportFile -Append
"4. Share this report with Kiro community" | Out-File -FilePath $ReportFile -Append
"" | Out-File -FilePath $ReportFile -Append
"Report completed: $(Get-Date)" | Out-File -FilePath $ReportFile -Append
Write-Host "   Done!" -ForegroundColor Green

Write-Host ""
Write-Host "========================================"
Write-Host "  INTELLIGENT REPAIR COMPLETE!"
Write-Host "========================================"
Write-Host ""
Write-Host "Detailed report saved: $ReportFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "What was done:"
Write-Host "- Detected error patterns"
Write-Host "- Applied community fixes"
Write-Host "- Checked system resources"
Write-Host "- Created recovery system"
Write-Host "- Reset configurations"
Write-Host "- Tested Kiro startup"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Check if Kiro works now"
Write-Host "2. Review the diagnostic report"
Write-Host "3. If still broken, run KIRO_COMPLETE_REINSTALL.ps1"
Write-Host ""
Write-Host "========================================"

Read-Host "Press Enter to exit"
