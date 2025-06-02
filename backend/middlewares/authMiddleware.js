const jwt = require('jsonwebtoken');
const User = require('../models/user'); // đổi tên thành User để tránh trùng biến

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    token = token.split(' ')[1]; // Lấy token sau "Bearer "

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token: ", decoded);

    const user = await User.findById(decoded.id).select('-password');
    console.log("User from DB: ", user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

// Middleware cho admin-only
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(401).json({ message: 'Not authorized' });
  }
  next();
};

module.exports = { protect, adminOnly };
