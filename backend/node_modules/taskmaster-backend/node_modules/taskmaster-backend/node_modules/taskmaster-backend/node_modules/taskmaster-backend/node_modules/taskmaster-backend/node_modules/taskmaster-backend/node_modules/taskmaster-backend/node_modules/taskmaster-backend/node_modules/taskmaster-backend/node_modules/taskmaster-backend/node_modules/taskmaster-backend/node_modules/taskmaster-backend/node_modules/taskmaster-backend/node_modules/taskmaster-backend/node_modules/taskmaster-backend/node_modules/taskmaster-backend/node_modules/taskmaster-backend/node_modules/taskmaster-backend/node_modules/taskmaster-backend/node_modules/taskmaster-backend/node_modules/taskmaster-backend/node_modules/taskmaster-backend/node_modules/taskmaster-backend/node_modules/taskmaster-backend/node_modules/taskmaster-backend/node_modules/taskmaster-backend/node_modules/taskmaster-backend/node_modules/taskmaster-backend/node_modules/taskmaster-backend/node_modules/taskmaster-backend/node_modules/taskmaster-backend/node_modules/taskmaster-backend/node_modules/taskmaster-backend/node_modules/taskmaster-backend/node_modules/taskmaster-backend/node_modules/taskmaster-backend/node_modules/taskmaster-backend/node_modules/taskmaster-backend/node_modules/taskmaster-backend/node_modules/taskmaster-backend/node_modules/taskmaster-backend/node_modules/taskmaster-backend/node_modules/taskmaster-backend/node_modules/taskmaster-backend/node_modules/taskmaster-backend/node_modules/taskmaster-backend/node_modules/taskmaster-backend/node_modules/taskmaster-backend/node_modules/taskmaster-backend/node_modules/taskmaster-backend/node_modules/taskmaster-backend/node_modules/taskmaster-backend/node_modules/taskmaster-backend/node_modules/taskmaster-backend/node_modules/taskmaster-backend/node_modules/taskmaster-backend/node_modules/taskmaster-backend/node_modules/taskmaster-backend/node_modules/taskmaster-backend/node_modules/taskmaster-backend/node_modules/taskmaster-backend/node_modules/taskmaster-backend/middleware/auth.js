const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Import your User model

// Middleware to authenticate a token
const authenticateToken = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.replace('Bearer ', ''); // Extract the actual token

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key from .env

        // Find the user based on the token's payload
        const user = await User.findById(decoded.userId); // Assuming the token contains `userId`
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Attach user info to the request object
        req.user = user;

        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        console.error('Token verification error:', err.message); // Log the error for debugging
        res.status(400).json({ message: 'Invalid token.', error: err.message });
    }
};

module.exports = authenticateToken;
