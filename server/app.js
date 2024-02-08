require('dotenv').config();
const PORT = process.env.port || 3000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Joi = require('joi');
const requireAuth = require('./middleware/authMiddleware')
mongoose.connect(process.env.db_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    app.listen(PORT,()=>{
        console.log("DB connected")
    })
})
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const folderRoutes = require('./routers/folderRoutes')
const passwordRoutes = require('./routers/passwordRoutes')
const authRoutes = require('./routers/authRoutes')
const userRoutes = require('./routers/userRoutes')
app.use('/api/folder',requireAuth,folderRoutes);
app.use('/api/password',requireAuth,passwordRoutes);
app.use('/api/user',requireAuth,userRoutes);
app.use('/api/routes',authRoutes);
