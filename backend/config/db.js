// config/db.js
const mongoose = require('mongoose');
const { mongoDBConfig } = require('../server');

async function connectDB() {
  try {
    console.log(mongoDBConfig.URI);
    await mongoose.connect(mongoDBConfig.URI, {
      // avoid IPv6 DNS resolution
      family: 4,
      // extend how long the driver waits for server selection (in ms)
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
