import React from 'react';
import { useNavigate } from 'react-router-dom';

const GuestLogin = () => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container mt-5">
      <h2>Guest Login</h2>
      <button onClick={handleGuestLogin} className="btn btn-secondary">Continue as Guest</button>
    </div>
  );
}

export default GuestLogin;
