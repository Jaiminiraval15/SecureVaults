const jwt = require('jsonwebtoken');
const User = require('../model/User');
require('dotenv').config();

const requireAuth = async (req, res, next) => {
   
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }
    const token = authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.secret_key);
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        if (decodedToken.exp < Date.now() / 1000) {
            return res.status(401).json({ error: 'Token expired' });
        }
        req.userid = user._id;
        next();
    } catch (error) {
        console.error('Error in requireAuth:', error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
