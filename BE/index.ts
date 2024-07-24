import cors from "cors";
import express, { Express } from "express";
import router from "./routes"; // Ensure this path is correct

// Set up Express server
export const app = express();

app.use(cors());
app.use('/api', router); // Prefix all routes with /api

const PORT = 8080

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
