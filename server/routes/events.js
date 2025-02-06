const express = require('express');
const Event = require('../models/Event');
const { authMiddleware } = require('./auth');
const router = express.Router();

// Create Event
router.post('/event', authMiddleware, async (req, res) => {
  const { name, description, category, date, time } = req.body;
  const event = new Event({
    name,
    description,
    category,
    date,
    time,
    owner: req.user.userId,
  });

  try {
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Get Events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
   let data= res.json(events);
  //  console.log("dataa",data)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get a Single Event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Update Event
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.owner.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Not authorized to update this event' });

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete Event
router.delete('/delete/:name', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findOne({category: req.params.name }); 
    console.log("first",event)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();

    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;

