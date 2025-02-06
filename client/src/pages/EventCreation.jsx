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

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const categories = [
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'meetup', label: 'Meetup' }
  ];

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      const { token } = JSON.parse(userData);
      try {
        await axios.post('http://localhost:5000/api/events/event', event, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showToast('Event created successfully!', 'success');
        setTimeout(() => navigate('/dashboard'), 1000);
      } catch (error) {
        showToast('Failed to create event', 'danger');
      } finally {
        setLoading(false);
      }
    } else {
      showToast('No user data found', 'danger');
      setLoading(false);
    }
  };
  
  return (
    <div className="min-vh-100 py-5" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="position-fixed top-0 start-0 w-100 h-100" style={{
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
        // zIndex: 0
      }}></div>

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

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-primary bg-opacity-10 border-0">
                <h2 className="h4 mb-0 text-primary">
                  <i className="fas fa-calendar-plus me-2"></i>
                  Create New Event
                </h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-heading me-2"></i>
                      Event Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={event.name}
                      onChange={handleChange}
                      placeholder="Enter event name"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-align-left me-2"></i>
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={event.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Enter event description"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-tag me-2"></i>
                      Category
                    </label>
                    <select
                      className="form-select"
                      name="category"
                      value={event.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="fas fa-calendar me-2"></i>
                        Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="fas fa-clock me-2"></i>
                        Time
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        name="time"
                        value={event.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating Event...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus me-2"></i>
                          Create Event
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/dashboard')}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Dashboard
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreation;