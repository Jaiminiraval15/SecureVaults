const jwt = require('jsonwebtoken')
const User = require('../model/User')
require('dotenv').config();
const requireAuth = async (req,res,next) =>{
    //verify authentication
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error : 'Authorization token is required'})

    }
    //get token from the authorization header
    const token = authorization.split(' ')[1]
    try {
        const {userid} = jwt.verify(token,process.env.secret_key)
        req.userid = await User.findOne({userid}).select('userid')
         // Check if the token has expired
         if (token.exp < Date.now() / 1000) {
            return res.status(401).json({ error: 'Token expired' });
        }
        next();
    } catch (error) {
        
        res.status(401).json({error : 'Request is not authorized'})
    }
}
module.exports = requireAuth