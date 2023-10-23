require('dotenv').config();
const PORT = process.env.port || 3000;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(process.env.db_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    app.listen(PORT,()=>{
        console.log("DB connected")
    })
})