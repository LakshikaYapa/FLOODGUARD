const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Extract token from "Bearer <TOKEN>" format
    const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    
    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload to request object
    next(); // Proceed to next middleware or controller
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};