const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    const dbConfig = config.get('mongodb');
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || dbConfig.uri, 
      dbConfig.options
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
