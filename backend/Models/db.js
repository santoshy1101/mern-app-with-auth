const mongoose = require("mongoose");
require('dotenv').config();

const mongo_url = process.env.MONGO_URL;


console.log({mongo_url});


mongoose.connect(mongo_url).then(()=>{
    console.log('MongoDB connnected...');
}).catch((err)=>{
    console.log('MongoDB Connection Error : ',err)
})