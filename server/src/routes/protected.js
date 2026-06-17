const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { roleMiddleware } = require('../middleware/role');

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.id}, this is protected data.` });
});

router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Admin data: top secret.' });
});

module.exports = router;
