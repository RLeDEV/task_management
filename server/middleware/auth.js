const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = (req,res,next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Get token existance
    if(!token) {
        return res.status(401).json({ msg: 'No token, Authrization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}