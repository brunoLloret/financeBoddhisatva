import cors from 'cors';
import express from 'express';
import request from 'request';
import fs from 'fs';
import path from 'path';
import router from './routes'; // Ensure this path is correct

const app = express();
const PORT = 8080;
const DATA_FILE_PATH = path.resolve(__dirname, '..', 'BE', 'scraped', 'finance', 'markets_data.json'); // Adjust path

// Middleware setup
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use('/api', router); // Prefix all routes with /api

// Function to fetch data from API and save to file
function fetchAndUpdateData() {
  const url = 'https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo'; // Replace 'demo' with your actual API key

  request.get({
    url: url,
    json: true,
    headers: { 'User-Agent': 'request' }
  }, (err, response, data) => {
    if (err) {
      console.error('Error:', err);
      return;
    }

    if (response.statusCode !== 200) {
      console.log('Status:', response.statusCode);
      return;
    }

    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
      console.log('Data updated successfully');
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });
}

// Fetch data immediately and then every minute
fetchAndUpdateData();
setInterval(fetchAndUpdateData, 60000); // 60000 milliseconds = 1 minute

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
