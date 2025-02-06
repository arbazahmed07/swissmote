import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toast, ToastContainer } from 'react-bootstrap'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      login(response.data)
      setShowToast(true)
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5 login-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 card-glass">
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <i className="bi bi-person-circle display-3 text-primary mb-3"></i>
                  <h2 className="fw-bold text-primary">Welcome Back!</h2>
                  <p className="text-muted">Please sign in to continue</p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                <form onSubmit={handleLogin} className="needs-validation">
                  <div className="mb-4">
                    <label className="form-label">
                      <i className="bi bi-envelope-fill me-2"></i>Email address
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-envelope-fill text-primary"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      <i className="bi bi-lock-fill me-2"></i>Password
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock-fill text-primary"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg pulse-button"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <a href="#" className="text-muted text-decoration-none">
                      <i className="bi bi-key-fill me-2"></i>
                      Forgot password?
                    </a>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-white">
                Don't have an account? <a href="/register" className="text-primary fw-bold">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <i className="bi bi-check-circle-fill me-2 text-success"></i>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Login successful! Redirecting...</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default Login
