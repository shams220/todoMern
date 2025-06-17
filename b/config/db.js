const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URL_CLOUD);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Connection failed ${error.message}`);
    }
}

module.exports = connectDB;