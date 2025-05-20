// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load env variables
const userRouter = require('./routes/signup');
const bookingRouter = require('./routes/booking');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Default route
app.get('/', (req, res) => {
  res.send('Shivanshu is great!');
});

// Routes
app.use('/api/users', userRouter);
app.use('/api/booking', bookingRouter);


// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
