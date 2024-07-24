#!/usr/bin/env bun
import { scrapeSite, Indicator } from './script';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as fs from 'fs';
import * as path from 'path';

interface Argv {
    _: (string | number)[];
    $0: string;
}

const argv = yargs(hideBin(process.argv))
    .demandCommand(1, 'You need to provide a URL to scrape')
    .argv as unknown as Argv;

const { _: [url] } = argv;

const fullUrl = (url as string).startsWith('http') ? url : `https://${url}`;
const outputDir = 'scraped';
const outputFile = path.join(outputDir, 'finance', 'indicators_data.json');
const logFile = 'scraper.log';

console.log(`Scraping URL: ${fullUrl}`);

let previousData: Indicator[] = [];

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

function smoothTransition(oldValue: number, newValue: number, steps: number, currentStep: number): number {
    return oldValue + (newValue - oldValue) * (currentStep / steps);
}

async function runScraper() {
    log('Starting scrape cycle');
    try {
        const result = await scrapeSite(fullUrl as string, outputDir);
        log(`Scrape completed. Found ${result.length} indicators.`);

        if (previousData.length === 0) {
            previousData = result;
            fs.writeFileSync(outputFile, JSON.stringify({ timestamp: new Date().toISOString(), indicators: result }, null, 2));
        } else {
            const transitionSteps = 24; // 2 minutes divided into 5-second intervals
            for (let step = 1; step <= transitionSteps; step++) {
                const smoothedData = result.map((newItem, index) => {
                    const oldItem = previousData[index];
                    return {
                        ...newItem,
                        price: smoothTransition(oldItem.price, newItem.price, transitionSteps, step),
                        change: smoothTransition(oldItem.change, newItem.change, transitionSteps, step),
                        changePercent: smoothTransition(parseFloat(oldItem.changePercent), parseFloat(newItem.changePercent), transitionSteps, step).toFixed(2) + '%'
                    };
                });

                fs.writeFileSync(outputFile, JSON.stringify({
                    timestamp: new Date().toISOString(),
                    indicators: smoothedData
                }, null, 2));
                log(`Updated data (step ${step}/${transitionSteps})`);

                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds between updates
            }

            previousData = result;
        }

        updateHeartbeat();
    } catch (error) {
        alertError(error as Error);
    }
}

// Run the scraper initially and then every 2 minutes
runScraper();
setInterval(runScraper, 120000); // 120000 milliseconds = 2 minutes