// imports
const mongoose = require('mongoose');    
require('dotenv').config(); // load environment variables

const app = require('./app')
const PORT = process.env.PORT || 5000;   // Use port from .env or default to 5000

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
    console.log('server alive')
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

