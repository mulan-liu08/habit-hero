const express = require('express');
const cors = require('cors');
const app = express();
// const habitRoutes = require('./routes/habitRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors())

// routes
app.use('/api/auth', authRoutes);

// initialization
app.get('/', (req, res) => {
  return res.json({
    message: "hello message",
    date: "5/19/2025"
  });
});

module.exports = app;  // exported to be used by server.js