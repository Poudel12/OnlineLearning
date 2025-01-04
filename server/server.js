require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000; 
const MONGO_URI = process.env.MONGO_URI;


// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from the frontend
app.use(bodyParser.json());

cors({
    origin : process.env.FRONTEND_URL,
    methods : ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders : ["content-Type", "Authorization"],
});

app.use(express.json());

//DATABASE CONNECTION
mongoose
    .connect(MONGO_URI)
    .then(()=>console.log('mongoDB is connected'))
    .catch((e)=> console.log(e));
//routes configuration


app.use((err, req, res,next) => {
    console.log(err.stack);
    res.status(500).json({
       success: false,
       message: "Something went wrong", 
    });
});

app.listen(PORT,()=> {
    console.log(`Server is now running on port ${PORT}`)

});

