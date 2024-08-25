#!/usr/bin/env bun

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fetchMarketStatus, saveData } from './script';

dotenv.config();

const SCRAPE_INTERVAL = 120000; // 2 minutes in milliseconds
const logFile = 'scraper.log';

function log(message: string) {
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
    console.log(logMessage.trim());
}

function updateHeartbeat() {
    fs.writeFileSync('scraper_heartbeat.txt', new Date().toISOString());
}

function alertError(error: Error) {
    log(`ALERT: Scraper error: ${error.message}`);
    // Implement additional alerting logic here (e.g., send email)
}

async function runScraper() {
    log('Starting scrape cycle');
    try {
        const marketStatus = await fetchMarketStatus();
        log(`Scrape completed. Found market statuses.`);
        saveData(marketStatus);
        updateHeartbeat();
    } catch (error) {
        alertError(error as Error);
    }
}

// Run the scraper initially and then every 2 minutes
runScraper();
setInterval(runScraper, SCRAPE_INTERVAL);
