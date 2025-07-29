const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

function verifyAdminToken(req, res, next) {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; 
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.redirect('/login');
  }
}

module.exports = verifyAdminToken;
