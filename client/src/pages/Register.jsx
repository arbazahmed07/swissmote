import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      document.querySelector('.register-container').classList.add('fade-out');
      setTimeout(() => navigate('/login'), 500);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center register-page">
      <div className="bg-overlay"></div>
      <div className="register-container fade-in p-4 p-md-5 rounded-4 bg-white shadow-lg">
        <h2 className="text-center mb-4 slide-down">Create Your Event Account</h2>
        
        {error && (
          <div className="alert alert-danger alert-dismissible fade show animate__shake" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        <form onSubmit={handleRegister} className="slide-up">
          <div className="mb-4">
            <label className="form-label">Email address</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input 
                type="email" 
                className="form-control form-control-lg" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required 
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input 
                type="password" 
                className="form-control form-control-lg" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Create password"
                required 
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input 
                type="password" 
                className="form-control form-control-lg" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm password"
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg w-100 scale-hover mb-3"
            disabled={loading}
          >
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Registering...
              </span>
            ) : 'Register Now'}
          </button>

          <p className="text-center mb-0">
            Already have an account? 
            <a href="/login" className="ms-2 text-decoration-none">Login here</a>
          </p>
        </form>
      </div>

      <style>{`
        .register-page {
          background-image: url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%);
          z-index: 1;
        }

        .register-container {
          max-width: 500px;
          width: 90%;
          position: relative;
          z-index: 2;
          backdrop-filter: blur(5px);
          background-color: rgba(255, 255, 255, 0.95) !important;
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }

        .fade-out {
          animation: fadeOut 0.5s ease-out;
        }

        .slide-down {
          animation: slideDown 0.7s ease-out;
        }

        .slide-up {
          animation: slideUp 0.7s ease-out;
        }

        .scale-hover {
          transition: transform 0.2s ease;
        }

        .scale-hover:hover:not(:disabled) {
          transform: scale(1.02);
        }

        .animate__shake {
          animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }

        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(13,110,253,.15);
        }

        @media (max-width: 768px) {
          .register-container {
            margin: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;