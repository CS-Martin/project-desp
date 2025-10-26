# Auto-Commit Setup Guide

This project includes scripts to automatically commit and push changes every hour to maintain GitHub activity.

## 📁 Files Created

- `scripts/auto-commit.js` - Main script that creates commits and pushes
- `scripts/scheduler.js` - Node.js scheduler (alternative to system scheduler)
- `scripts/setup-task-scheduler.ps1` - PowerShell script for Windows Task Scheduler
- `ACTIVITY.md` - Log file that gets updated with each commit

## 🚀 Setup Options

### Option 1: Windows Task Scheduler (Recommended for Windows)

Run the PowerShell script as Administrator:

```powershell
# Open PowerShell as Administrator
cd E:\dev\project-desp
.\scripts\setup-task-scheduler.ps1
```

This will create a scheduled task that runs every hour automatically, even when you close your terminal.

**Manage the task:**

```powershell
# View task status
Get-ScheduledTask -TaskName "GitHub-Auto-Commit-ProjectDesp"

# Start immediately
Start-ScheduledTask -TaskName "GitHub-Auto-Commit-ProjectDesp"

# Disable task
Disable-ScheduledTask -TaskName "GitHub-Auto-Commit-ProjectDesp"

# Remove task
Unregister-ScheduledTask -TaskName "GitHub-Auto-Commit-ProjectDesp" -Confirm:$false
```

### Option 2: Node.js Scheduler (Keep Terminal Open)

Run the scheduler script which will keep running and commit every hour:

```bash
npm run schedule
```

This keeps the process running in your terminal. To run in background, you can use `pm2`:

```bash
npm install -g pm2
pm2 start scripts/scheduler.js --name "auto-commit"
pm2 save
pm2 startup  # Follow the instructions to run on system startup
```

### Option 3: Manual Single Commit

To test or run a single commit manually:

```bash
npm run commit
```

## ⚙️ How It Works

1. Every hour, the script runs automatically
2. It updates the `ACTIVITY.md` file with a timestamp
3. Creates a commit with message: `chore(activity): automated commit - [timestamp]`
4. Pushes the commit to GitHub

## 🔒 Git Authentication

Make sure your git credentials are configured:

```bash
# Check current remote
git remote -v

# If using HTTPS with personal access token
git config credential.helper store

# Or use SSH (recommended)
git remote set-url origin git@github.com:yourusername/project-desp.git
```

## 🛑 Stop Auto-Commits

**Windows Task Scheduler:**

```powershell
Disable-ScheduledTask -TaskName "GitHub-Auto-Commit-ProjectDesp"
# or
Unregister-ScheduledTask -TaskName "GitHub-Auto-Commit-ProjectDesp"
```

**Node.js Scheduler:**

```bash
# If running in terminal: Press Ctrl+C

# If using pm2:
pm2 stop auto-commit
pm2 delete auto-commit
```

## 📝 Customization

Edit `scripts/auto-commit.js` to customize:

- Commit message format
- What files are changed
- Logging behavior

Edit `scripts/scheduler.js` to change:

- Commit interval (default: 1 hour)
- Update `INTERVAL_MS` constant

## ⚠️ Important Notes

- **GitHub Credentials**: Ensure git push doesn't require password input (use SSH keys or credential helper)
- **Rate Limits**: GitHub may rate limit excessive commits
- **Repository Size**: The ACTIVITY.md file will grow over time (consider truncating it periodically)
- **Transparency**: Consider adding a note in your main README that this repo uses automated commits

## 🧪 Testing

Test the script works before scheduling:

```bash
npm run commit
```

Check that:

1. The commit was created
2. The push succeeded
3. The commit appears on GitHub
