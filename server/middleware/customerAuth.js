const jwt = require('jsonwebtoken');
const Customers = require('../models/Customers');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            logger.warn(`Unauthorized access attempt from IP: ${req.ip}`);
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const customer = await Customers.findById(decoded.id)
        
        if (!customer) {
            logger.warn(`Invalid token used from IP: ${req.ip}`);
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach the authenticated agent to the request
        req.user = customer;
        next();
    } catch (error) {
        logger.error({
            message: 'Authentication error',
            error: error.message,
            route: req.originalUrl,
            method: req.method,
            ip: req.ip
        });
        res.status(401).json({ message: 'Unauthorized' });
    }
};