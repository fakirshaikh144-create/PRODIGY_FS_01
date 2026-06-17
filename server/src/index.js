const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.options('*', cors({ origin: CLIENT_URL, credentials: true }));

console.log('[Server] CORS origin:', CLIENT_URL);

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoUri) {
  console.error('❌ [ERROR] MONGO_URI is not defined in .env');
  process.exit(1);
}

if (!jwtSecret) {
  console.error('❌ [ERROR] JWT_SECRET is not defined in .env');
  process.exit(1);
}

console.log(`[Server] connecting to MongoDB at ${mongoUri}`);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ [SUCCESS] Connected to MongoDB');
    console.log('✅ [SUCCESS] JWT_SECRET loaded:', Boolean(jwtSecret));
    console.log("dbname:", mongoose.connection.name);
        console.log("dbhost:", mongoose.connection.host);

    app.listen(PORT, () => {
      console.log(`✅ [SUCCESS] Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ [ERROR] MongoDB connection failed');
    console.error('❌ [ERROR] Error:', err.message);
    process.exit(1);
  });


