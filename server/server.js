const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Models
const Event = require('./models/Event');  
const User = require('./models/User');  

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to check token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); 
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Import routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

// Routes
app.use('/api/auth', authRoutes.router);
app.use('/api/events', eventRoutes);

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinEvent', async (eventId) => {
    try {
    
      const token = socket.handshake.query.token; 
      if (!token) {
        socket.emit('attendeeList', { error: 'Authorization token is missing' });
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        socket.emit('attendeeList', { error: 'User not found' });
        return;
      }

      const event = await Event.findById(eventId).populate('attendees', 'email name');
      if (!event) {
        socket.emit('attendeeList', { error: 'Event not found' });
        return;
      }

      // Check if the user is already an attendee
      if (event.attendees.some(attendee => attendee._id.equals(user._id))) {
        socket.emit('attendeeList', event.attendees);  
        return;
      }

      event.attendees.push(user._id);
      await event.save();
      socket.join(eventId);
      io.to(eventId).emit('attendeeList', event.attendees); 
    } catch (error) {
      console.error('Error joining event:', error);
      socket.emit('attendeeList', { error: 'Failed to join the event' });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port 5000');
});

