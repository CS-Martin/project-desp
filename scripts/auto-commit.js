#!/usr/bin/env node

/**
 * Auto-commit script for keeping GitHub activity timeline active
 * This script creates a commit with a timestamp and pushes it to the repository
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ACTIVITY_FILE = path.join(__dirname, '..', 'ACTIVITY.md');

function log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
}

function executeGitCommand(command) {
    try {
        const output = execSync(command, {
            encoding: 'utf-8',
            cwd: path.join(__dirname, '..')
        });
        return output.trim();
    } catch (error) {
        throw new Error(`Git command failed: ${command}\n${error.message}`);
    }
}

function updateActivityFile() {
    const timestamp = new Date().toISOString();
    const content = fs.existsSync(ACTIVITY_FILE)
        ? fs.readFileSync(ACTIVITY_FILE, 'utf-8')
        : '# Activity Log\n\nThis file tracks automated commits to keep the repository active.\n\n## Commits\n\n';

    const newEntry = `- ${timestamp}\n`;
    const updatedContent = content + newEntry;

    fs.writeFileSync(ACTIVITY_FILE, updatedContent);
    log(`Updated activity file with timestamp: ${timestamp}`);
}

function hasChanges() {
    const status = executeGitCommand('git status --porcelain');
    return status.length > 0;
}

function commitAndPush() {
    try {
        // Check if there are any changes
        if (!hasChanges()) {
            log('No changes to commit. Updating activity file...');
            updateActivityFile();
        }

        // Add all changes
        executeGitCommand('git add .');
        log('Staged changes');

        // Create commit
        const timestamp = new Date().toLocaleString();
        const commitMessage = `chore(activity): update activity file - ${timestamp}`;
        executeGitCommand(`git commit -m "${commitMessage}"`);
        log(`Created commit: ${commitMessage}`);

        // Push to remote
        executeGitCommand('git push');
        log('Pushed to remote successfully');

        log('✓ Auto-commit completed successfully');
    } catch (error) {
        log(`✗ Error: ${error.message}`);
        process.exit(1);
    }
}

// Main execution
log('Starting auto-commit script...');
commitAndPush();

