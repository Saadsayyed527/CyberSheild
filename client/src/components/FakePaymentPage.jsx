import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FakePaymentPage.css';

const FakePaymentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Extra validation just in case (optional but good practice)
    if (formData.cardNumber.length < 6) {
      alert('Card number must be at least 6 digits.');
      return;
    }
    if (formData.cvv.length < 4) {
      alert('CVV must be at least 4 digits.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/excessive-scan');
    }, 2000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">💳 Fake Payment Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name on Card</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="form-control"
              minLength="6"
              maxLength="16"
              pattern="\d*"
              title="Card number must be at least 6 digits"
              required
            />
          </div>

          <div className="row mb-4">
            <div className="col">
              <label className="form-label">Expiry Date</label>
              <input
                type="month"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col">
              <label className="form-label">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="form-control"
                minLength="4"
                maxLength="4"
                pattern="\d{4}"
                title="CVV must be 4 digits"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FakePaymentPage;
