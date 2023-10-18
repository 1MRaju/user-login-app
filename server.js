const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

//express app
const app = express();

//connects to mongodb
connectDB();


//middlewares:
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/api/users', require('./routes/userRoutes'));

// Set the port
const PORT = process.env.PORT || 8080;


//server starts here
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})