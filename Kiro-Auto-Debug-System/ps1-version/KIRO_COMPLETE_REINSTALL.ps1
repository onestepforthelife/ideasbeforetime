# ========================================
# Kiro Complete Reinstall v2.0 (PowerShell)
# Last resort - full clean reinstall
# ========================================

Write-Host ""
Write-Host "========================================"
Write-Host "  KIRO COMPLETE REINSTALL v2.0"
Write-Host "  WARNING: This will remove all Kiro data"
Write-Host "========================================"
Write-Host ""
Write-Host "This will:"
Write-Host "- Stop all Kiro processes"
Write-Host "- Remove all Kiro data and settings"
Write-Host "- Clear all caches"
Write-Host "- Prepare for fresh install"
Write-Host ""
Write-Host "Your workspace files will NOT be deleted."
Write-Host ""

$Confirm = Read-Host "Type YES to continue"

if ($Confirm -ne "YES") {
    Write-Host ""
    Write-Host "Reinstall cancelled." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit
}

Write-Host ""
Write-Host "Starting complete reinstall..." -ForegroundColor Red
Write-Host ""

$ReportFile = Join-Path $PSScriptRoot "reinstall-report.txt"
"Kiro Complete Reinstall Report" | Out-File -FilePath $ReportFile
"Generated: $(Get-Date)" | Out-File -FilePath $ReportFile -Append
"" | Out-File -FilePath $ReportFile -Append

Write-Host "[1/5] Stopping all Kiro processes..."
Get-Process -Name "Kiro" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "kiro-helper" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 3
Write-Host "   Done!" -ForegroundColor Green
"Step 1: Stopped all processes" | Out-File -FilePath $ReportFile -Append

Write-Host "[2/5] Removing Kiro data folders..."
$AppDataKiro = "$env:APPDATA\Kiro"
if (Test-Path $AppDataKiro) {
    Write-Host "   Removing: $AppDataKiro" -ForegroundColor Yellow
    Remove-Item -Path $AppDataKiro -Recurse -Force -ErrorAction SilentlyContinue
    "   Removed: AppData\Kiro" | Out-File -FilePath $ReportFile -Append
}

$LocalAppDataKiro = "$env:LOCALAPPDATA\Kiro"
if (Test-Path $LocalAppDataKiro) {
    Write-Host "   Removing: $LocalAppDataKiro" -ForegroundColor Yellow
    Remove-Item -Path $LocalAppDataKiro -Recurse -Force -ErrorAction SilentlyContinue
    "   Removed: LocalAppData\Kiro" | Out-File -FilePath $ReportFile -Append
}

$UserKiro = "$env:USERPROFILE\.kiro"
if (Test-Path $UserKiro) {
    Write-Host "   Removing: $UserKiro" -ForegroundColor Yellow
    Remove-Item -Path $UserKiro -Recurse -Force -ErrorAction SilentlyContinue
    "   Removed: .kiro folder" | Out-File -FilePath $ReportFile -Append
}
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[3/5] Clearing system caches..."
$TempKiro = "$env:TEMP\kiro-*"
if (Test-Path $TempKiro) {
    Remove-Item -Path $TempKiro -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   Cleared: Temp files" -ForegroundColor Green
    "   Cleared: Temp files" | Out-File -FilePath $ReportFile -Append
}
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[4/5] Removing registry entries..."
Write-Host "   Note: Registry cleanup requires manual action" -ForegroundColor Yellow
Write-Host "   Skipping automatic registry changes for safety" -ForegroundColor Yellow
"Step 4: Registry cleanup skipped (manual)" | Out-File -FilePath $ReportFile -Append
Write-Host "   Done!" -ForegroundColor Green

Write-Host "[5/5] Preparing for fresh install..."
Write-Host "   All Kiro data removed" -ForegroundColor Green
Write-Host "   System ready for fresh install" -ForegroundColor Green
"Step 5: System prepared for reinstall" | Out-File -FilePath $ReportFile -Append
Write-Host "   Done!" -ForegroundColor Green

Write-Host ""
Write-Host "========================================"
Write-Host "  REINSTALL PREPARATION COMPLETE!"
Write-Host "========================================"
Write-Host ""
Write-Host "Report saved: $ReportFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Download latest Kiro from official website"
Write-Host "2. Run the installer"
Write-Host "3. Configure your settings"
Write-Host "4. Reinstall extensions"
Write-Host ""
Write-Host "Your workspace files are safe and untouched." -ForegroundColor Green
Write-Host ""
Write-Host "========================================"

Read-Host "Press Enter to exit"
