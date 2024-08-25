import express, { Request, Response } from 'express';
import request from 'request';

const router = express.Router();

router.get('/indicators', (req: Request, res: Response) => {
    // Replace 'demo' with your actual API key
    const url = 'https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo';

    request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, response, data) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error fetching data' });
        }

        if (response.statusCode !== 200) {
            console.log('Status:', response.statusCode);
            return res.status(response.statusCode).json({ error: 'Error fetching data' });
        }

        // Assuming the API response is structured correctly
        try {
            res.json(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Error parsing data' });
        }
    });
});

export default router;
