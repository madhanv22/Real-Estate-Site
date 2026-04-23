const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer '))
      return res.status(401).json({ error: 'No token provided' });

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'propfunnel_secret');
    const user = await User.findByPk(decoded.id);

    if (!user || !user.isActive)
      return res.status(401).json({ error: 'Account not found or disabled' });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const isAdmin = (req, res, next) => {
  if (!['admin', 'super_admin', 'agent'].includes(req.user.role))
    return res.status(403).json({ error: 'Staff access required' });
  next();
};

const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin')
    return res.status(403).json({ error: 'Super admin access required' });
  next();
};

module.exports = { auth, isAdmin, isSuperAdmin };
