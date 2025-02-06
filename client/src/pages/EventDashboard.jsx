import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AttendeeList from '../components/AttendeeList';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ category: '', date: '' });
  const { authData } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:5000/api/events/', {
        params: filters,
      });
      setEvents(response.data);
    };
    fetchEvents();
  }, [filters]);

  return (
    <div className="container">
      <h2>Event Dashboard</h2>
      <div className="my-4">
        <label>Category:</label>
        <input
          type="text"
          className="form-control"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <label>Date:</label>
        <input
          type="date"
          className="form-control"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      <div className="list-group">
        {events.map((event) => (
          <div key={event._id} className="list-group-item">
            <h5>{event.name}</h5>
            <p>{event.description}</p>
            <AttendeeList eventId={event._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDashboard;
