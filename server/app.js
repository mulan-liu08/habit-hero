const express = require('express');
const cors = require('cors');
const app = express();
const habitRoutes = require('./routes/habitRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors())

// routes
app.use('/api/auth', authRoutes);
app.use('/api/habit', habitRoutes);

// init
app.get('/', (req, res) => {
  return res.send("initialized")
});

module.exports = app;  // exported to be used by server.js