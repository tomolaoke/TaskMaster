const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));

// Define a basic route
app.get('/', (req, res) => {
  res.send('Welcome to TaskMaster API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();

const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // Middleware to parse JSON
app.use('/api/users', userRoutes);

const taskRoutes = require('./routes/taskRoutes');

app.use('/api/tasks', taskRoutes);
