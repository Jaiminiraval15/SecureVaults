const jwt = require('jsonwebtoken');
const User = require('../model/User');
require('dotenv').config();

const requireAuth = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }

    // Get token from the authorization header
    const token = authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.secret_key);

        // Find the user based on the userid from the token
        const user = await User.findById(decodedToken.id);

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Check if the token has expired
        if (decodedToken.exp < Date.now() / 1000) {
            return res.status(401).json({ error: 'Token expired' });
        }

        // Attach the user ID to the request object
        req.userid = user._id;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in requireAuth:', error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
