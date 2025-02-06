import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AttendeeList from '../components/AttendeeList';
import './EventDashboard.css';
import { useNavigate } from "react-router-dom";

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const { authData } = useAuth();
  const navigate = useNavigate();

  // Toast handler
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Fetch all events initially
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/events/');
        setEvents(response.data);
        setFilteredEvents(response.data);
        showToast('Events loaded successfully');
        setError('');
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        showToast('Failed to load events', 'danger');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...events];

    if (categoryFilter) {
      result = result.filter(event => event.category === categoryFilter);
    }

    if (dateFilter) {
      const selectedDate = new Date(dateFilter).toLocaleDateString();
      result = result.filter(event => 
        new Date(event.date).toLocaleDateString() === selectedDate
      );
    }

    setFilteredEvents(result);
  }, [categoryFilter, dateFilter, events]);

  const categories = [
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'meetup', label: 'Meetup' }
  ];

  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const userData = localStorage.getItem('userData');
    if (!userData) {
      setMessage('User is not authenticated');
      return;
    }
    const { token } = JSON.parse(userData); 
        // await axios.delete(`http://localhost:5000/api/events/${eventId}`);
        const response = await axios.delete(`http://localhost:5000/api/events/delete/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        setEvents(events.filter(event => event._id !== eventId));
        setEvents([])
        showToast('Event deleted successfully');
      } catch (err) {
        showToast('Failed to delete event', 'danger');
      }
    }
  };

  return (
    <div className="min-vh-100 bg-light py-4" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      {/* Toast Container */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <div className={`toast ${toast.show ? 'show' : ''}`} role="alert">
          <div className={`toast-header bg-${toast.type} text-white`}>
            <strong className="me-auto">Notification</strong>
            <button type="button" className="btn-close btn-close-white" onClick={() => setToast({ ...toast, show: false })}></button>
          </div>
          <div className="toast-body">{toast.message}</div>
        </div>
      </div>

      <div className="container">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div>
                  <h2 className="h3 mb-0">
                    <i className="fas fa-calendar-alt text-primary me-2"></i>
                    Event Dashboard
                  </h2>
                  <p className="text-muted mb-0 mt-1">
                    Showing {filteredEvents.length} of {events.length} events
                  </p>
                </div>
                <button className="btn btn-primary shadow-sm" onClick={() => navigate("/create-event")}>
                  <i className="fas fa-plus me-2"></i>
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Filters Section */}
          <div className="col-12 col-md-3">
            <div className="card border-0 shadow-sm sticky-top" style={{ top: '1rem' }}>
              <div className="card-body">
                <h5 className="card-title h6 mb-3">
                  <i className="fas fa-filter text-primary me-2"></i>
                  Filters
                </h5>
                
                <div className="mb-3">
                  <label className="form-label d-flex justify-content-between align-items-center small">
                    <span><i className="fas fa-tag me-2"></i>Category</span>
                    {categoryFilter && (
                      <button 
                        className="btn btn-link btn-sm p-0 text-muted text-decoration-none"
                        onClick={() => setCategoryFilter('')}
                      >
                        Clear
                      </button>
                    )}
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label d-flex justify-content-between align-items-center small">
                    <span><i className="fas fa-calendar me-2"></i>Date</span>
                    {dateFilter && (
                      <button 
                        className="btn btn-link btn-sm p-0 text-muted text-decoration-none"
                        onClick={() => setDateFilter('')}
                      >
                        Clear
                      </button>
                    )}
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="col-12 col-md-9">
            {error && (
              <div className="alert alert-danger shadow-sm" role="alert">
                <i className="fas fa-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {filteredEvents.length === 0 ? (
                  <div className="col-12">
                    <div className="alert alert-info shadow-sm" role="alert">
                      <i className="fas fa-info-circle me-2"></i>
                      No events found matching your filters.
                    </div>
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <div key={event._id} className="col-12 col-lg-6">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <h5 className="card-title h6 mb-0">{event.name}</h5>
                            <span className="badge bg-primary rounded-pill">{event.category}</span>
                          </div>
                          <p className="card-text text-muted small mb-3">{event.description}</p>
                          <div className="mb-3 small">
                            <i className="fas fa-clock text-primary me-2"></i>
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <AttendeeList eventId={event._id} />
                          <div className="mt-3 d-flex gap-2">
                            {/* <button 
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => navigate(`/edit-event/${event.category}`)}
                            >
                              <i className="fas fa-edit me-1"></i>
                              Edit
                            </button> */}
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDeleteEvent(event.category)}
                            >
                              <i className="fas fa-trash-alt me-1"></i>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;