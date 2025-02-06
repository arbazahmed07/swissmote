import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to the Event Management Platform</h1>
      <div className="my-4">
        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
        <Link to="/register" className="btn btn-success mx-2">Register</Link>
        <Link to="/guest-login" className="btn btn-secondary mx-2">Guest Login</Link>
      </div>
    </div>
  );
}

export default Home;
