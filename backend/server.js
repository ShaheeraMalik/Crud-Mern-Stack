// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

export const mongoDBConfig = {
  URI: process.env.MONGODB_URI
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/items', itemRoutes);

// Basic health-check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, async() => {
  console.log(`🚀 Server listening on port ${PORT}`);
  await connectDB();
});
