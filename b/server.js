require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 4000;              
const app = express();
const userRoutes = require('./routes/rgstrLoginRoute.js');
const router = require('./routes/route.js');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
app.use(express.json()); // to parse JSON body

connectDB();
app.use('/api/v1/User',userRoutes);
app.use('/api/v1/test',router);
// app.get('/',(rea,res)=>{
//     res.send("Hello, Shams here!");
// })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

