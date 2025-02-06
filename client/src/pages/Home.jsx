import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <div className="text-center p-5 bg-light bg-opacity-10 rounded-3 backdrop-blur" 
             style={{backdropFilter: 'blur(10px)'}}>
          <h1 className="display-4 mb-4 fw-bold text-white animate-fade-in">
            Welcome to the Event Management Platform
          </h1>
          <p className="lead text-light mb-5 animate-fade-in-delay">
            Create unforgettable experiences, one event at a time
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/login" className="btn btn-primary btn-lg px-5 py-3 shadow-sm btn-animate">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </Link>
            <Link to="/register" className="btn btn-success btn-lg px-5 py-3 shadow-sm btn-animate">
              <i className="bi bi-person-plus me-2"></i>
              Register
            </Link>
            <Link to="/guest-login" className="btn btn-light btn-lg px-5 py-3 shadow-sm btn-animate">
              <i className="bi bi-person-circle me-2"></i>
              Guest Login
            </Link>
          </div>
          <div className="mt-5 text-white-50 animate-fade-in-delay-2">
            <p className="mb-0">Ready to host your next amazing event?</p>
            <p className="small">Join thousands of successful event organizers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;