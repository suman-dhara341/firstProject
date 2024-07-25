const jwt = require('jsonwebtoken');
const registrationSchema = require('../model/registrationSchema');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const filterToken = token.replace('Bearer', '').trim();

        const decoded = jwt.verify(filterToken, process.env.JWTTOKEN);

        const user = await registrationSchema.findOne({ _id: decoded.userId }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = user;
        
        next();
    } catch (error) {
            return res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
