import React, { useState } from 'react';
import axios from 'axios';

const DeleteEvent = ({ token }) => {
  const [eventName, setEventName] = useState('');
  const [message, setMessage] = useState('');
  const handleDelete = async (e) => {
    e.preventDefault();

    const userData = localStorage.getItem('userData');
    if (!userData) {
      setMessage('User is not authenticated');
      return;
    }

    const { token } = JSON.parse(userData); 
    try {
      const response = await axios.delete(`http://localhost:5000/api/events/delete/${eventName}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (response.data.success) {
        setMessage('Event deleted successfully');
      } else {
        setMessage('Event not found');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setMessage('Error occurred while deleting event');
    }
  };

  return (
    <div>
      <h4>Delete Event</h4>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          value={eventName}  
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
          required
        />
        <button type="submit">Delete Event</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteEvent;
