import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import EventDashboard from './pages/EventDashboard';
import EventCreation from './pages/EventCreation';
import Login from './pages/Login';
import Register from './pages/Register';
import GuestLogin from './pages/GuestLogin';
import DeleteEvent from './components/DeleteEvent';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<EventDashboard />} />
          <Route path="/create-event" element={<EventCreation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/guest-login" element={<GuestLogin />} />
          <Route path="/delete-event" element={<DeleteEvent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
