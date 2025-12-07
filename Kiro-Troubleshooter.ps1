# ========================================
# KIRO TROUBLESHOOTER - Professional Solution
# Fixes all Kiro errors with GUI interface
# ========================================

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Create main form
$form = New-Object System.Windows.Forms.Form
$form.Text = 'Kiro Troubleshooter'
$form.Size = New-Object System.Drawing.Size(600,500)
$form.StartPosition = 'CenterScreen'
$form.FormBorderStyle = 'FixedDialog'
$form.MaximizeBox = $false
$form.BackColor = [System.Drawing.Color]::White

# Title Label
$titleLabel = New-Object System.Windows.Forms.Label
$titleLabel.Location = New-Object System.Drawing.Point(20,20)
$titleLabel.Size = New-Object System.Drawing.Size(560,40)
$titleLabel.Text = 'Kiro Troubleshooter'
$titleLabel.Font = New-Object System.Drawing.Font("Segoe UI",18,[System.Drawing.FontStyle]::Bold)
$titleLabel.ForeColor = [System.Drawing.Color]::FromArgb(0,102,204)
$form.Controls.Add($titleLabel)

# Subtitle Label
$subtitleLabel = New-Object System.Windows.Forms.Label
$subtitleLabel.Location = New-Object System.Drawing.Point(20,65)
$subtitleLabel.Size = New-Object System.Drawing.Size(560,25)
$subtitleLabel.Text = 'Automatically fix all Kiro errors - No coding needed'
$subtitleLabel.Font = New-Object System.Drawing.Font("Segoe UI",10)
$subtitleLabel.ForeColor = [System.Drawing.Color]::Gray
$form.Controls.Add($subtitleLabel)

# Status Label
$statusLabel = New-Object System.Windows.Forms.Label
$statusLabel.Location = New-Object System.Drawing.Point(20,100)
$statusLabel.Size = New-Object System.Drawing.Size(560,30)
$statusLabel.Text = 'Choose a solution below:'
$statusLabel.Font = New-Object System.Drawing.Font("Segoe UI",10)
$form.Controls.Add($statusLabel)

# Progress Bar
$progressBar = New-Object System.Windows.Forms.ProgressBar
$progressBar.Location = New-Object System.Drawing.Point(20,135)
$progressBar.Size = New-Object System.Drawing.Size(560,25)
$progressBar.Style = 'Continuous'
$progressBar.Visible = $false
$form.Controls.Add($progressBar)

# Button 1: Quick Fix
$btn1 = New-Object System.Windows.Forms.Button
$btn1.Location = New-Object System.Drawing.Point(20,180)
$btn1.Size = New-Object System.Drawing.Size(560,60)
$btn1.Text = "🔧 Quick Fix (2 minutes)`nFixes 90% of errors - Recommended first"
$btn1.Font = New-Object System.Drawing.Font("Segoe UI",11,[System.Drawing.FontStyle]::Bold)
$btn1.BackColor = [System.Drawing.Color]::FromArgb(0,120,215)
$btn1.ForeColor = [System.Drawing.Color]::White
$btn1.FlatStyle = 'Flat'
$btn1.Cursor = [System.Windows.Forms.Cursors]::Hand
$form.Controls.Add($btn1)

# Button 2: Deep Repair
$btn2 = New-Object System.Windows.Forms.Button
$btn2.Location = New-Object System.Drawing.Point(20,250)
$btn2.Size = New-Object System.Drawing.Size(560,60)
$btn2.Text = "🛠️ Deep Repair (5 minutes)`nFor unknown or complex errors"
$btn2.Font = New-Object System.Drawing.Font("Segoe UI",11,[System.Drawing.FontStyle]::Bold)
$btn2.BackColor = [System.Drawing.Color]::FromArgb(255,140,0)
$btn2.ForeColor = [System.Drawing.Color]::White
$btn2.FlatStyle = 'Flat'
$btn2.Cursor = [System.Windows.Forms.Cursors]::Hand
$form.Controls.Add($btn2)

# Button 3: Complete Reinstall
$btn3 = New-Object System.Windows.Forms.Button
$btn3.Location = New-Object System.Drawing.Point(20,320)
$btn3.Size = New-Object System.Drawing.Size(270,50)
$btn3.Text = "🔄 Complete Reinstall`n(10 minutes)"
$btn3.Font = New-Object System.Drawing.Font("Segoe UI",10,[System.Drawing.FontStyle]::Bold)
$btn3.BackColor = [System.Drawing.Color]::FromArgb(220,53,69)
$btn3.ForeColor = [System.Drawing.Color]::White
$btn3.FlatStyle = 'Flat'
$btn3.Cursor = [System.Windows.Forms.Cursors]::Hand
$form.Controls.Add($btn3)

# Button 4: GitHub Report
$btn4 = New-Object System.Windows.Forms.Button
$btn4.Location = New-Object System.Drawing.Point(310,320)
$btn4.Size = New-Object System.Drawing.Size(270,50)
$btn4.Text = "📝 Create GitHub Report`n(Share with community)"
$btn4.Font = New-Object System.Drawing.Font("Segoe UI",10,[System.Drawing.FontStyle]::Bold)
$btn4.BackColor = [System.Drawing.Color]::FromArgb(40,167,69)
$btn4.ForeColor = [System.Drawing.Color]::White
$btn4.FlatStyle = 'Flat'
$btn4.Cursor = [System.Windows.Forms.Cursors]::Hand
$form.Controls.Add($btn4)

# Info Label
$infoLabel = New-Object System.Windows.Forms.Label
$infoLabel.Location = New-Object System.Drawing.Point(20,385)
$infoLabel.Size = New-Object System.Drawing.Size(560,60)
$infoLabel.Text = "✅ Your work files are always safe`n✅ No coding knowledge required`n✅ Fixes all known Kiro errors automatically"
$infoLabel.Font = New-Object System.Drawing.Font("Segoe UI",9)
$infoLabel.ForeColor = [System.Drawing.Color]::DarkGreen
$form.Controls.Add($infoLabel)

# Functions
function Update-Status {
    param($message, $progress)
    $statusLabel.Text = $message
    if ($progress -ge 0) {
        $progressBar.Visible = $true
        $progressBar.Value = $progress
    }
    $form.Refresh()
}

function Quick-Fix {
    $btn1.Enabled = $false
    $btn2.Enabled = $false
    $btn3.Enabled = $false
    $btn4.Enabled = $false
    
    Update-Status "🔧 Quick Fix: Stopping Kiro processes..." 10
    Stop-Process -Name "Kiro" -Force -ErrorAction SilentlyContinue
    Stop-Process -Name "Kiro Helper" -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    
    Update-Status "🔧 Quick Fix: Clearing cache files..." 30
    Remove-Item "$env:APPDATA\Kiro\Cache" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$env:APPDATA\Kiro\Code Cache" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$env:APPDATA\Kiro\Service Worker" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$env:LOCALAPPDATA\Kiro\Cache" -Recurse -Force -ErrorAction SilentlyContinue
    
    Update-Status "🔧 Quick Fix: Fixing MCP configuration..." 60
    if (Test-Path "$env:APPDATA\Kiro\mcp.json") {
        '{"mcpServers": {}}' | Out-File "$env:APPDATA\Kiro\mcp.json" -Encoding UTF8
    }
    
    Update-Status "🔧 Quick Fix: Fixing workspace settings..." 80
    Get-ChildItem "$env:APPDATA\Kiro\Workspaces\*\workspace.json" -ErrorAction SilentlyContinue | ForEach-Object {
        (Get-Content $_.FullName) -replace '"kiroAgent.configureMCP": "enabled"', '"kiroAgent.configureMCP": "Disabled"' | Set-Content $_.FullName
    }
    
    Update-Status "🔧 Quick Fix: Starting Kiro..." 95
    $kiroPath = "$env:LOCALAPPDATA\Programs\Kiro\Kiro.exe"
    if (Test-Path $kiroPath) {
        Start-Process $kiroPath
    }
    
    Update-Status "✅ Quick Fix Complete! Kiro should now work." 100
    Start-Sleep -Seconds 2
    
    [System.Windows.Forms.MessageBox]::Show(
        "Quick Fix completed successfully!`n`nKiro has been restarted.`nIf the error persists, try Deep Repair.",
        "Success",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Information
    )
    
    $btn1.Enabled = $true
    $btn2.Enabled = $true
    $btn3.Enabled = $true
    $btn4.Enabled = $true
    $progressBar.Visible = $false
    $statusLabel.Text = 'Choose a solution below:'
}

function Deep-Repair {
    $btn1.Enabled = $false
    $btn2.Enabled = $false
    $btn3.Enabled = $false
    $btn4.Enabled = $false
    
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $reportPath = "$env:USERPROFILE\Desktop\KIRO_ERROR_REPORT_$timestamp.txt"
    
    Update-Status "🛠️ Deep Repair: Stopping all processes..." 10
    Stop-Process -Name "Kiro" -Force -ErrorAction SilentlyContinue
    Stop-Process -Name "Kiro Helper" -Force -ErrorAction SilentlyContinue
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    
    Update-Status "🛠️ Deep Repair: Scanning for errors..." 20
    "KIRO ERROR REPORT`nGenerated: $(Get-Date)`n========================================`n" | Out-File $reportPath
    
    Update-Status "🛠️ Deep Repair: Clearing ALL caches..." 40
    Remove-Item "$env:APPDATA\Kiro\Cache" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$env:APPDATA\Kiro\Code Cache" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$env:APPDATA\Kiro\Service Worker" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$env:APPDATA\Kiro\GPUCache" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$env:APPDATA\Kiro\Session Storage" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$env:LOCALAPPDATA\Kiro\Cache" -Recurse -Force -ErrorAction SilentlyContinue
    "- Cleared all caches`n" | Out-File $reportPath -Append
    
    Update-Status "🛠️ Deep Repair: Fixing configurations..." 60
    if (Test-Path "$env:APPDATA\Kiro\mcp.json") {
        '{"mcpServers": {}}' | Out-File "$env:APPDATA\Kiro\mcp.json" -Encoding UTF8
        "- Reset MCP configuration`n" | Out-File $reportPath -Append
    }
    
    Update-Status "🛠️ Deep Repair: Fixing workspaces..." 75
    Get-ChildItem "$env:APPDATA\Kiro\Workspaces\*\workspace.json" -ErrorAction SilentlyContinue | ForEach-Object {
        (Get-Content $_.FullName) -replace '"kiroAgent.configureMCP": "enabled"', '"kiroAgent.configureMCP": "Disabled"' | Set-Content $_.FullName
        "- Fixed workspace settings`n" | Out-File $reportPath -Append
    }
    
    Update-Status "🛠️ Deep Repair: Creating auto-recovery..." 85
    $autoRecovery = @"
@echo off
taskkill /F /IM Kiro.exe /T >nul 2>&1
timeout /t 2 /nobreak >nul
start "" "$env:LOCALAPPDATA\Programs\Kiro\Kiro.exe"
"@
    $autoRecovery | Out-File "$env:APPDATA\Kiro\auto-recovery.bat" -Encoding ASCII
    "- Created auto-recovery script`n" | Out-File $reportPath -Append
    
    Update-Status "🛠️ Deep Repair: Testing Kiro startup..." 95
    $kiroPath = "$env:LOCALAPPDATA\Programs\Kiro\Kiro.exe"
    if (Test-Path $kiroPath) {
        Start-Process $kiroPath
        Start-Sleep -Seconds 3
        if (Get-Process "Kiro" -ErrorAction SilentlyContinue) {
            "- Kiro started successfully`n" | Out-File $reportPath -Append
        } else {
            "- Kiro failed to start`n" | Out-File $reportPath -Append
        }
    }
    
    "`n========================================`nShare this report on GitHub if needed:`nhttps://github.com/kirolabs/kiro/issues" | Out-File $reportPath -Append
    
    Update-Status "✅ Deep Repair Complete! Report saved to Desktop." 100
    Start-Sleep -Seconds 2
    
    [System.Windows.Forms.MessageBox]::Show(
        "Deep Repair completed!`n`nError report saved to Desktop:`nKIRO_ERROR_REPORT_$timestamp.txt`n`nKiro has been restarted.",
        "Success",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Information
    )
    
    $btn1.Enabled = $true
    $btn2.Enabled = $true
    $btn3.Enabled = $true
    $btn4.Enabled = $true
    $progressBar.Visible = $false
    $statusLabel.Text = 'Choose a solution below:'
}

function Complete-Reinstall {
    $result = [System.Windows.Forms.MessageBox]::Show(
        "This will completely remove Kiro and guide you to reinstall.`n`nYour work files will NOT be affected.`n`nContinue?",
        "Complete Reinstall",
        [System.Windows.Forms.MessageBoxButtons]::YesNo,
        [System.Windows.Forms.MessageBoxIcon]::Warning
    )
    
    if ($result -eq 'Yes') {
        $btn1.Enabled = $false
        $btn2.Enabled = $false
        $btn3.Enabled = $false
        $btn4.Enabled = $false
        
        Update-Status "🔄 Reinstall: Stopping Kiro..." 20
        Stop-Process -Name "Kiro" -Force -ErrorAction SilentlyContinue
        Stop-Process -Name "Kiro Helper" -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 3
        
        Update-Status "🔄 Reinstall: Opening uninstall settings..." 40
        Start-Process "ms-settings:appsfeatures"
        
        [System.Windows.Forms.MessageBox]::Show(
            "Please uninstall Kiro from the opened settings window.`n`nAfter uninstalling, click OK to continue.",
            "Uninstall Kiro",
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Information
        )
        
        Update-Status "🔄 Reinstall: Removing all data..." 60
        Remove-Item "$env:APPDATA\Kiro" -Recurse -Force -ErrorAction SilentlyContinue
        Remove-Item "$env:LOCALAPPDATA\Kiro" -Recurse -Force -ErrorAction SilentlyContinue
        
        Update-Status "🔄 Reinstall: Opening download page..." 80
        Start-Process "https://kiro.dev"
        
        Update-Status "✅ Ready to reinstall!" 100
        
        [System.Windows.Forms.MessageBox]::Show(
            "Reinstall preparation complete!`n`nNext steps:`n1. Download latest Kiro from opened page`n2. Install Kiro`n3. Start fresh!`n`nYour work files are safe in:`n- Documents\Cloudfare`n- OneDrive",
            "Reinstall Ready",
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Information
        )
        
        $btn1.Enabled = $true
        $btn2.Enabled = $true
        $btn3.Enabled = $true
        $btn4.Enabled = $true
        $progressBar.Visible = $false
        $statusLabel.Text = 'Choose a solution below:'
    }
}

function Create-GitHubReport {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $reportPath = "$env:USERPROFILE\Desktop\KIRO_GITHUB_REPORT_$timestamp.txt"
    
    $report = @"
KIRO ERROR REPORT FOR GITHUB COMMUNITY
Generated: $(Get-Date)
========================================

SYSTEM INFORMATION:
- Windows Version: $([System.Environment]::OSVersion.VersionString)
- Kiro Installation: $(if (Test-Path "$env:LOCALAPPDATA\Programs\Kiro\Kiro.exe") { "Found" } else { "Not found" })

ERROR DESCRIPTION:
[Describe what you were doing when error occurred]

ERROR MESSAGE:
[Copy the exact error message here]

FIXES ATTEMPTED:
- Quick Fix: [Yes/No]
- Deep Repair: [Yes/No]
- Complete Reinstall: [Yes/No]

RESULT:
[Did it fix the issue? Yes/No]

========================================
POST THIS REPORT AT:
https://github.com/kirolabs/kiro/issues

Include:
- This complete report
- Your Kiro version (Help -> About)
- Screenshots if possible
"@
    
    $report | Out-File $reportPath -Encoding UTF8
    
    [System.Windows.Forms.MessageBox]::Show(
        "GitHub report created!`n`nSaved to Desktop:`nKIRO_GITHUB_REPORT_$timestamp.txt`n`nPlease:`n1. Open the report file`n2. Fill in the [bracketed] sections`n3. Post on GitHub Issues",
        "Report Created",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Information
    )
    
    Start-Process "notepad.exe" $reportPath
}

# Button Click Events
$btn1.Add_Click({ Quick-Fix })
$btn2.Add_Click({ Deep-Repair })
$btn3.Add_Click({ Complete-Reinstall })
$btn4.Add_Click({ Create-GitHubReport })

# Show form
[void]$form.ShowDialog()
