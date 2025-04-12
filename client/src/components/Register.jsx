import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Optional for your custom styles

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', formData);
      const { user, token } = res.data;

      if (user && user._id) {
        localStorage.setItem('userId', user._id);
      }
      if (token) {
        localStorage.setItem('token', token);
      }

      setMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/scan');
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 d-flex flex-row align-items-stretch shadow-lg" style={{ maxWidth: '900px', width: '100%' }}>
        
        {/* Left Side: Image */}
        <div className="w-50 d-none d-md-flex align-items-center justify-content-center">
        <img
  src="/register.jpeg"
  alt="Register"
  className="img-fluid rounded p-3"
  style={{ transform: 'scale(1.9)', transformOrigin: 'center' }}
/>

        </div>

        {/* Divider */}
        <div className="d-none d-md-flex align-items-stretch">
          <div className="vr" style={{ width: '2px', backgroundColor: 'black' }}></div>
        </div>

        {/* Right Side: Form */}
        <div className="w-100 w-md-50 p-4">
          <h2 className="text-center mb-3">Register</h2>

          {message && (
            <p className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Username"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>

        
        </div>
      </div>
    </div>
  );
};

export default Register;
