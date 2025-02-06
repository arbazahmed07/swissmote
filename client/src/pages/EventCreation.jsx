import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventCreation = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    category: '',
    date: '',
    time: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      const { token } = JSON.parse(userData); 
      console.log("Token:", token);
      
      try {
        await axios.post('http://localhost:5000/api/events/event', event, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Event created successfully!');
        navigate('/dashboard');
      } catch (error) {
        alert('Failed to create event');
      }
    } else {
      alert('No user data found');
    }
  };
  
  return (
    <div className="container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={event.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={event.time}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Event</button>
      </form>
    </div>
  );
};

export default EventCreation;
