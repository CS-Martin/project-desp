# GitHub Actions Auto-Commit Setup

This repository uses GitHub Actions to automatically commit every hour and keep your GitHub activity timeline active.

## 🚀 How It Works

The workflow runs automatically every hour via GitHub Actions:

1. Checks out the repository
2. Updates `ACTIVITY.md` with a timestamp
3. Commits the change
4. Pushes to the repository

## ✅ Setup (Already Done!)

The workflow file is located at `.github/workflows/auto-commit.yml`

### Enable the Workflow

1. Push these files to your GitHub repository:

   ```bash
   git add .github/workflows/auto-commit.yml ACTIVITY.md
   git commit -m "feat(ci): add GitHub Actions auto-commit workflow"
   git push
   ```

2. **Enable Actions** (if not already enabled):
   - Go to your repository on GitHub
   - Click on "Actions" tab
   - If prompted, click "I understand my workflows, go ahead and enable them"

3. **Verify it's running**:
   - Go to Actions tab
   - You should see "Auto Commit Activity" workflow
   - It will run every hour automatically

## 🧪 Test Manually

You can trigger the workflow manually without waiting for the hourly schedule:

1. Go to your repository on GitHub
2. Click "Actions" tab
3. Select "Auto Commit Activity" workflow
4. Click "Run workflow" button
5. Click the green "Run workflow" button

## 📊 Monitor Activity

- Check the "Actions" tab to see workflow runs
- Each run creates a new commit visible in your commit history
- Your GitHub contribution graph will show consistent activity

## ⚙️ Customization

Edit `.github/workflows/auto-commit.yml` to customize:

### Change Schedule

```yaml
on:
  schedule:
    - cron: '0 * * * *' # Every hour
    # - cron: '*/30 * * * *'  # Every 30 minutes
    # - cron: '0 */2 * * *'  # Every 2 hours
    # - cron: '0 9,17 * * *'  # Twice daily (9 AM and 5 PM UTC)
```

[Cron syntax help](https://crontab.guru/)

### Change Commit Message

```yaml
- name: Commit and push changes
  run: |
    git add ACTIVITY.md
    git commit -m "Your custom message here"
    git push
```

### Modify What Gets Changed

Edit the "Update activity file" step to change different files or add more changes.

## 🛑 Disable Auto-Commits

### Option 1: Disable the Workflow

1. Go to Actions tab on GitHub
2. Click "Auto Commit Activity"
3. Click "..." (three dots)
4. Select "Disable workflow"

### Option 2: Delete the Workflow File

```bash
git rm .github/workflows/auto-commit.yml
git commit -m "chore: disable auto-commit workflow"
git push
```

## 💡 Why GitHub Actions vs Vercel?

- **Vercel**: Read-only filesystem, no git access, designed for web hosting
- **GitHub Actions**: Full git access, perfect for automated commits, free for public repos
- **Result**: GitHub Actions is the standard solution for this use case

## 📋 Advantages

✅ **Free** - Free for public repositories, generous limits for private repos  
✅ **Reliable** - Runs on GitHub's infrastructure  
✅ **No local setup** - No need to keep your computer running  
✅ **Git native** - Full git access built-in  
✅ **Transparent** - All runs visible in Actions tab  
✅ **Secure** - Uses GitHub's built-in authentication

## ⚠️ Important Notes

- **Public repos**: Unlimited Actions minutes
- **Private repos**: 2,000 minutes/month free (this workflow uses ~5 minutes/month)
- **Rate limits**: One commit per hour is well within GitHub's limits
- **Activity file growth**: The ACTIVITY.md file grows over time (consider periodic cleanup)

## 🔧 Troubleshooting

### Workflow not running?

- Check if Actions are enabled in repository settings
- Verify the workflow file is in `.github/workflows/` directory
- Check Actions tab for any error messages

### Permission denied errors?

- The workflow uses `GITHUB_TOKEN` which is automatically provided
- Ensure `permissions: contents: write` is set in the workflow

### Want to run more/less frequently?

- Edit the cron schedule in the workflow file
- Remember: GitHub Actions may have a few minutes delay
