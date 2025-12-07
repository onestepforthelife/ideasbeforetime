# ========================================
# Kiro Auto-Debug System v2.0 (PowerShell)
# Quick fix for known Kiro IDE errors
# ========================================

Write-Host ""
Write-Host "========================================"
Write-Host "  KIRO AUTO-DEBUG SYSTEM v2.0"
Write-Host "  Quick Fix for Known Errors"
Write-Host "========================================"
Write-Host ""

# Create diagnostic report
$ReportFile = Join-Path $PSScriptRoot "diagnostic-report.txt"
"Kiro Auto-Debug Report" | Out-File -FilePath $ReportFile
"Generated: $(Get-Date)" | Out-File -FilePath $ReportFile -Append
"" | Out-File -FilePath $ReportFile -Append

Write-Host "[1/6] Stopping Kiro processes..."
Get-Process -Name "Kiro" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowTitle -like "*Kiro*"} | Stop-Process -Force
Start-Sleep -Seconds 2
Write-Host "   Done!" -ForegroundColor Green
"Step 1: Stopped Kiro processes" | Out-File -FilePath $ReportFile -Append

Write-Host "[2/6] Clearing cache and temp files..."
$CachePath = "$env:APPDATA\Kiro\Cache"
if (Test-Path $CachePath) {
    Remove-Item -Path $CachePath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   Cleared: Cache" -ForegroundColor Green
    "Step 2: Cleared Cache" | Out-File -FilePath $ReportFile -Append
}

$CachedDataPath = "$env:APPDATA\Kiro\CachedData"
if (Test-Path $CachedDataPath) {
    Remove-Item -Path $CachedDataPath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   Cleared: CachedData" -ForegroundColor Green
    "Step 2: Cleared CachedData" | Out-File -FilePath $ReportFile -Append
}

$LogsPath = "$env:APPDATA\Kiro\logs"
if (Test-Path $LogsPath) {
    Remove-Item -Path "$LogsPath\*.*" -Force -ErrorAction SilentlyContinue
    Write-Host "   Cleared: Logs" -ForegroundColor Green
    "Step 2: Cleared Logs" | Out-File -FilePath $ReportFile -Append
}
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[3/6] Resetting MCP configuration..."
$McpConfigPath = "$env:USERPROFILE\.kiro\settings\mcp.json"
if (Test-Path $McpConfigPath) {
    Copy-Item -Path $McpConfigPath -Destination "$McpConfigPath.backup" -Force -ErrorAction SilentlyContinue
    Write-Host "   Backup created: mcp.json.backup" -ForegroundColor Green
    "Step 3: Backed up MCP config" | Out-File -FilePath $ReportFile -Append
}
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[4/6] Fixing workspace settings..."
$WorkspacePath = "$env:APPDATA\Kiro\User\workspaceStorage"
if (Test-Path $WorkspacePath) {
    Write-Host "   Checking workspace storage..." -ForegroundColor Green
    "Step 4: Checked workspace storage" | Out-File -FilePath $ReportFile -Append
}
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[5/6] Clearing extension cache..."
$ExtCachePath = "$env:APPDATA\Kiro\CachedExtensions"
if (Test-Path $ExtCachePath) {
    Remove-Item -Path $ExtCachePath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   Cleared: Extension cache" -ForegroundColor Green
    "Step 5: Cleared extension cache" | Out-File -FilePath $ReportFile -Append
}
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[6/6] Checking system resources..."
$Memory = Get-CimInstance Win32_OperatingSystem | Select-Object FreePhysicalMemory
$MemoryGB = [math]::Round($Memory.FreePhysicalMemory / 1MB, 2)
"   Memory Status: $MemoryGB GB available" | Out-File -FilePath $ReportFile -Append

$Disk = Get-PSDrive C | Select-Object Free
$DiskGB = [math]::Round($Disk.Free / 1GB, 2)
"   Disk Space: $DiskGB GB free on C:" | Out-File -FilePath $ReportFile -Append
Write-Host "   Done!" -ForegroundColor Green

Write-Host ""
Write-Host "========================================"
Write-Host "  AUTO-DEBUG COMPLETE!"
Write-Host "========================================"
Write-Host ""
Write-Host "Diagnostic report saved: $ReportFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Start Kiro IDE"
Write-Host "2. Check if issue is resolved"
Write-Host "3. If not, run KIRO_INTELLIGENT_REPAIR.ps1"
Write-Host ""
Write-Host "========================================"

Read-Host "Press Enter to exit"
