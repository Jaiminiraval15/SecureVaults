require('dotenv').config();
const PORT = process.env.port || 3000;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
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
app.use(express.json());
const folderRoutes = require('./routers/folderRoutes')
const passwordRoutes = require('./routers/passwordRoutes')
const authRoutes = require('./routers/authRoutes')
app.use('/api/folder',requireAuth,folderRoutes);
app.use('/api/password',passwordRoutes);
app.use('/api/routes',authRoutes);