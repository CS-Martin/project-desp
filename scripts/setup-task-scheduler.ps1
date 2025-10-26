# PowerShell script to set up Windows Task Scheduler for auto-commits
# Run this script as Administrator

param(
    [string]$ProjectPath = "E:\dev\project-desp"
)

$TaskName = "GitHub-Auto-Commit-ProjectDesp"
$ScriptPath = Join-Path $ProjectPath "scripts\auto-commit.js"
$NodePath = (Get-Command node).Source

# Create the scheduled task
$Action = New-ScheduledTaskAction -Execute $NodePath -Argument $ScriptPath -WorkingDirectory $ProjectPath
$Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 1)
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
$Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

# Register the task
Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Principal $Principal -Force

Write-Host "✓ Scheduled task created successfully!" -ForegroundColor Green
Write-Host "Task Name: $TaskName" -ForegroundColor Cyan
Write-Host "Runs every: 1 hour" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can manage this task in Task Scheduler or run these commands:" -ForegroundColor Yellow
Write-Host "  Start task:   Start-ScheduledTask -TaskName '$TaskName'" -ForegroundColor Gray
Write-Host "  Stop task:    Stop-ScheduledTask -TaskName '$TaskName'" -ForegroundColor Gray
Write-Host "  Remove task:  Unregister-ScheduledTask -TaskName '$TaskName' -Confirm:`$false" -ForegroundColor Gray

