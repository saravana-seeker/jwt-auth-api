const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//import routes
const authRouter = require('./router/auth');

// connect to DB
mongoose.connect(process.env.Db_Url,() => {app.listen(3000,() => {
    console.log("Server running")
})})

//Middleware
app.use(express.json());

//Route middleware
app.use('/api/user',authRouter);

//server running 
