// import * as cheerio from 'cheerio'
// import puppeteer from 'puppeteer';
// import * as fs from 'fs';
// import * as path from 'path';
// import { timeStamp } from 'console';

// // Constants
// const MAX_RETRIES = 3;
// const TIMEOUT = 120000; // 120 seconds

// // Define the type for indicator data
// export interface Indicator {
//     name: string;
//     price: number;
//     change: number;
//     changePercent: string;
// }

// // Function to fetch HTML content using Puppeteer with retries
// export const fetchHTMLWithPuppeteer = async (url: string): Promise<string> => {
//     for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
//         const browser = await puppeteer.launch({
//             headless: true,
//             args: [
//                 '--disable-http2',
//                 '--no-sandbox',
//                 '--disable-setuid-sandbox',
//                 '--disable-gpu',
//                 '--disable-extensions',
//                 '--disable-dev-shm-usage',
//                 '--disable-software-rasterizer',
//                 '--disable-features=IsolateOrigins,site-per-process',
//             ]
//         });
//         const page = await browser.newPage();

//         // Block unnecessary resources
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const resourceType = request.resourceType();
//             if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
//                 request.abort();
//             } else {
//                 request.continue();
//             }
//         });

//         try {
//             await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
//             const html = await page.content();
//             await browser.close();
//             return html;
//         } catch (error) {
//             console.error(`Error fetching data (attempt ${attempt}/${MAX_RETRIES}):`, error);
//             await browser.close();
//             if (attempt === MAX_RETRIES) {
//                 throw error;
//             }
//         }
//     }
//     throw new Error('Failed to fetch HTML after multiple attempts');
// };

// // Function to extract indicators from the HTML
// export const getIndicators = (html: string): Indicator[] => {
//     const $ = cheerio.load(html);
//     const indicators: Indicator[] = [];

//     // Adjust the selector to target the correct elements
//     $('section').each((_, section) => {
//         if (indicators.length >= 6) return false; // Limit to the first 6 indicators

//         $(section).find('span.symbol.yf-a8quos.valid').each((_, element) => {
//             const name = $(element).text().trim();

//             const priceStr = $(element).closest('div').find('fin-streamer.last-price.yf-a8quos').attr('data-value') || '0';
//             const changeStr = $(element).closest('div').find('fin-streamer.percentChange.yf-a8quos[data-field="regularMarketChange"]').attr('data-value') || '0';
//             const changePercentStr = $(element).closest('div').find('fin-streamer.percentChange.yf-a8quos[data-field="regularMarketChangePercent"]').text().trim();

//             const price = parseFloat(priceStr);
//             const change = parseFloat(changeStr);
//             const changePercent = changePercentStr.replace(/[^\d.-]/g, '');

//             indicators.push({
//                 name,
//                 price,
//                 change,
//                 changePercent
//             });
//         });
//     });

//     return indicators;
// };

// // Function to save data
// export const saveIndicatorsData = (data: Indicator[], parentDir: string) => {
//     const dirPath = path.join(parentDir, 'finance');
//     if (!fs.existsSync(dirPath)) {
//         fs.mkdirSync(dirPath, { recursive: true });
//     }
//     const filePath = path.join(dirPath, 'indicators_data.json');
//     fs.writeFileSync(filePath, JSON.stringify({ timestamp: new Date().toISOString(), indicators: data }, null, 2), 'utf-8');
//     console.log(`Indicators data saved to ${filePath}`, timeStamp);
// };

// // Function to scrape the site
// export async function scrapeSite(url: string, parentDir: string): Promise<Indicator[]> {
//     const rawHTML = await fetchHTMLWithPuppeteer(url);

//     if (!rawHTML) {
//         console.log('Failed to fetch HTML');
//         return [];
//     }

//     const indicators = getIndicators(rawHTML);
//     saveIndicatorsData(indicators, parentDir);

//     return indicators;
// }

// // Run the scraper initially and then every 2 minutes
// const scrapeAndSave = async () => {
//     try {
//         await scrapeSite('https://finance.yahoo.com', 'scraped');
//         console.log('Scraping completed successfully');
//     } catch (error) {
//         console.error('Error during scraping:', error);
//     }
// };

// scrapeAndSave();
// setInterval(scrapeAndSave, 120000); // Run every 2 minutes