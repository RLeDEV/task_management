const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req,res,next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Get token existance
    if(!token) {
        return res.status(401).json({ msg: 'No token, Authrization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}