const jwt = require('jsonwebtoken');
const AUTH_SECRET = process.env.AUTH_SECRET;
// Verify JWT token
async function verifyJWT(req, res, next) {
    // Get token from header
    const barearToken = req.headers['authorization'];
    if(typeof barearToken === 'undefined') {
        return res.status(401).json({ msg: 'No token provided.' });
    }
    const token = barearToken.split(' ')[1];

    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token provided.' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, AUTH_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token.' });
    }
}

module.exports = verifyJWT;