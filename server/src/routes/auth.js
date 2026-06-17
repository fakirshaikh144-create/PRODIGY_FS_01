const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' }
});

router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
    const hash = await bcrypt.hash(password, saltRounds);

    const user = new User({ name, email, password: hash });
    await user.save();

    console.log('✅ [USER REGISTERED]', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      database: user.collection.conn.name
    });

    const safeUser = { id: user._id, name: user.name, email: user.email, role: user.role };
    res.status(201).json({ user: safeUser });
  } catch (err) {
    console.error('❌ [REGISTRATION ERROR]', err.message);
    next(err);
  }
});

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    const bad = { message: 'Invalid credentials' };
    if (!user) {
      return res.status(400).json(bad);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json(bad);
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
});

router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
