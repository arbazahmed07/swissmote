import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const GuestLogin = () => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    document.querySelector('.login-container').classList.add('fade-out');
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center login-page">
      <div className="bg-overlay"></div>
      <div className="login-container fade-in p-4 p-md-5 rounded-4 bg-white shadow-lg text-center">
        <h2 className="display-6 mb-4 fw-bold text-primary slide-down">Welcome Guest</h2>
        <div className="guest-icon-wrapper bounce mb-4">
          <i className="bi bi-person-circle display-1 text-primary"></i>
        </div>
        <button 
          onClick={handleGuestLogin} 
          className="btn btn-primary btn-lg px-5 py-3 scale-hover shadow-sm"
        >
          Continue as Guest
        </button>
        
        <style>{`
          .login-page {
            background-image: url('https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
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

          .login-container {
            max-width: 400px;
            width: 90%;
            position: relative;
            z-index: 2;
            backdrop-filter: blur(5px);
            background-color: rgba(255, 255, 255, 0.9) !important;
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

          .bounce {
            animation: bounce 1s ease infinite;
          }

          .scale-hover {
            transition: transform 0.2s ease;
          }

          .scale-hover:hover {
            transform: scale(1.05);
          }

          @media (max-width: 768px) {
            .login-page {
              background-position: center;
            }
            .login-container {
              margin: 15px;
            }
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

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default GuestLogin;