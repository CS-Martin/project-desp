#!/usr/bin/env node

/**
 * Scheduler script that runs auto-commit every hour
 * This is an alternative to using system schedulers like cron or Task Scheduler
 */

const { execSync } = require('child_process');
const path = require('path');

const INTERVAL_MS = 60 * 60 * 1000; // 1 hour in milliseconds

function log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
}

function runAutoCommit() {
    try {
        log('Running auto-commit...');
        execSync('node scripts/auto-commit.js', {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });
    } catch (error) {
        log(`Error running auto-commit: ${error.message}`);
    }
}

function scheduleNextRun() {
    const nextRun = new Date(Date.now() + INTERVAL_MS);
    log(`Next commit scheduled for: ${nextRun.toLocaleString()}`);
}

log('Starting auto-commit scheduler...');
log(`Commits will be made every hour (${INTERVAL_MS / 1000 / 60} minutes)`);
log('Press Ctrl+C to stop');

// Run immediately on start
runAutoCommit();
scheduleNextRun();

// Schedule subsequent runs
setInterval(() => {
    runAutoCommit();
    scheduleNextRun();
}, INTERVAL_MS);

