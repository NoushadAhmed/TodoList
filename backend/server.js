// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check route
app.get('/', (req, res) => {
  res.send('Todo API with Auth is running ✅');
});

// Routes
app.use('/auth', authRoutes);    // /auth/register, /auth/login
app.use('/todos', todoRoutes);   // protected todo routes

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
