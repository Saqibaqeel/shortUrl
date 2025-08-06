const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDb = async () => {
  try {
    const dbUri = process.env.MONGO_URI
   
    await mongoose.connect(dbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};
module.exports = connectDb;