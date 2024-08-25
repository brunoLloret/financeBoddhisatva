import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export interface Markets {
    market_type: string;
    region: string;
    primary_exchanges: string;
    local_open: string;
    local_close: string;
    current_status: string;
    notes: string;
}

// Function to fetch market status from Alpha Vantage API
export const fetchMarketStatus = async (): Promise<any> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'MARKET_STATUS',
                apikey: API_KEY
            },
            headers: { 'User-Agent': 'request' }
        });
        console.log('API Response:', response.data);
        return response.data; // Adjust this based on actual response structure
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Error fetching market status:', error);
        }
        throw error;
    }
};

// Save the fetched data
export const saveData = (data: any) => {
    const dirPath = path.join(__dirname, '..', 'scraped');
    const filePath = path.join(dirPath, 'markets_data.json');

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const scrapedData = {
        timestamp: new Date().toISOString(),
        markets: data
    };

    fs.writeFileSync(filePath, JSON.stringify(scrapedData, null, 2), 'utf-8');
    console.log(`Scraped data saved to ${filePath}`);
};
