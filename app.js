const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import the user routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use user routes
app.use('/api', userRoutes);  // Prefix '/api' to all routes in userRoutes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Real-time chat setup with Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});