require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");


const app = express();
const PORT = process.env.PORT || 5000; 
const MONGO_URI = process.env.MONGO_URI;


// Middleware
app.use(
    cors({
        origin : process.env.FRONTEND_URL,
        methods : ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders : ["content-Type", "Authorization"],
    })

);
app.use(express.json());

//DATABASE CONNECTION
mongoose
    .connect(MONGO_URI)
    .then(()=>console.log('mongoDB is connected'))
    .catch((e)=> console.log(e));
//routes configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);



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

