const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');


// Load env vars
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

//static files
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});


// Set the port
const PORT = process.env.PORT || 8080;


//server starts here
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})