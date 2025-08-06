const express = require('express');
const connectDb = require('./db/connectDb');
const urlRoutes = require('./routes/urlRoutes');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const cors = require('cors');
const app = express();
const port=process.env.PORT||5000;
   connectDb();
app.use(express.json());
app.use(cors());
app.use('/urls', urlRoutes);
// Error handling middleware


app.listen(port,  () => {
  try {
 
    console.log(`Server is running on${port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit the process with failure
  }
}
);











