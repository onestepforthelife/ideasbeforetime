# System Information Script for Kiro
# Run this to help Kiro understand your development environment

Write-Host "=== SYSTEM INFORMATION ===" -ForegroundColor Cyan
Write-Host ""

# Operating System
Write-Host "Operating System:" -ForegroundColor Yellow
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture | Format-List

# PowerShell Version
Write-Host "PowerShell Version:" -ForegroundColor Yellow
$PSVersionTable.PSVersion | Format-List

# Installed Development Tools
Write-Host "Installed Development Tools:" -ForegroundColor Yellow

# Check Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "  Python: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "  Python: Not installed" -ForegroundColor Red
}

# Check Node.js
try {
    $nodeVersion = node --version 2>&1
    Write-Host "  Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  Node.js: Not installed" -ForegroundColor Red
}

# Check npm
try {
    $npmVersion = npm --version 2>&1
    Write-Host "  npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  npm: Not installed" -ForegroundColor Red
}

# Check Git
try {
    $gitVersion = git --version 2>&1
    Write-Host "  Git: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "  Git: Not installed" -ForegroundColor Red
}

# Check wrangler (Cloudflare)
try {
    $wranglerVersion = wrangler --version 2>&1
    Write-Host "  Wrangler: $wranglerVersion" -ForegroundColor Green
} catch {
    Write-Host "  Wrangler: Not installed" -ForegroundColor Red
}

Write-Host ""

# System Resources
Write-Host "System Resources:" -ForegroundColor Yellow
$computerSystem = Get-CimInstance Win32_ComputerSystem
$totalRAM = [math]::Round($computerSystem.TotalPhysicalMemory / 1GB, 2)
Write-Host "  Total RAM: $totalRAM GB"

$processor = Get-CimInstance Win32_Processor
Write-Host "  Processor: $($processor.Name)"
Write-Host "  Cores: $($processor.NumberOfCores)"
Write-Host "  Logical Processors: $($processor.NumberOfLogicalProcessors)"

Write-Host ""

# Disk Space
Write-Host "Disk Space:" -ForegroundColor Yellow
Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Used -gt 0 } | ForEach-Object {
    $usedGB = [math]::Round($_.Used / 1GB, 2)
    $freeGB = [math]::Round($_.Free / 1GB, 2)
    $totalGB = $usedGB + $freeGB
    $percentUsed = [math]::Round(($usedGB / $totalGB) * 100, 1)
    Write-Host "  Drive $($_.Name): $usedGB GB used / $freeGB GB free ($percentUsed% used)"
}

Write-Host ""

# Network Status
Write-Host "Network Status:" -ForegroundColor Yellow
$networkAdapters = Get-NetAdapter | Where-Object { $_.Status -eq "Up" }
foreach ($adapter in $networkAdapters) {
    Write-Host "  $($adapter.Name): Connected ($($adapter.LinkSpeed))"
}

Write-Host ""

# Python Packages (if Python is installed)
Write-Host "Python Packages:" -ForegroundColor Yellow
try {
    $pipList = pip list 2>&1
    if ($pipList -match "python-docx") {
        Write-Host "  python-docx: Installed" -ForegroundColor Green
    } else {
        Write-Host "  python-docx: Not installed" -ForegroundColor Red
    }
} catch {
    Write-Host "  Cannot check Python packages (pip not available)" -ForegroundColor Red
}

Write-Host ""

# Current Directory
Write-Host "Current Directory:" -ForegroundColor Yellow
Write-Host "  $(Get-Location)"

Write-Host ""

# Environment Variables (relevant ones)
Write-Host "Key Environment Variables:" -ForegroundColor Yellow
Write-Host "  PATH entries:" 
$env:PATH -split ';' | Select-Object -First 10 | ForEach-Object { Write-Host "    $_" }

Write-Host ""
Write-Host "=== END OF SYSTEM INFORMATION ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Copy this output and share it with Kiro for better assistance!" -ForegroundColor Green
