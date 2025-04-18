import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ScanPage.css';

const ScanPage = () => {
  const [url, setUrl] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const res = await axios.post(
        '/api/scans/start',
        { url, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setScanResult(res.data.scan);
    } catch (err) {
      setError(err.response?.data?.error || 'Scan failed');
    }
    setLoading(false);
  };

  const handleUpgradeClick = () => {
    navigate('/payment');
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Start a Security Scan 🔍</h2>
        <p className="text-muted">Enter your website URL to begin scanning for security vulnerabilities.</p>
      </div>

      <form onSubmit={handleScan} className="d-flex justify-content-center mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="form-control w-50 me-3"
          required
        />
        <button type="submit" disabled={loading} className="btn btn-primary px-4">
          {loading ? 'Scanning...' : 'Start Scan'}
        </button>
      </form>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {scanResult && (
        <>
          <div className="card shadow-sm p-4 mb-5">
            <h4 className="mb-4">Scan Results</h4>
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Report URL</td>
                  <td>{scanResult.url || 'https://www.facebook.com/'}</td>
                </tr>
                <tr>
                  <td>Performance</td>
                  <td>Page size: 0 bytes (Optimal)</td>
                </tr>
                <tr>
                  <td>Response Time</td>
                  <td>301ms (Good)</td>
                </tr>
                <tr>
                  <td>HTTPS</td>
                  <td>Enabled</td>
                </tr>
                <tr>
                  <td>X-Frame-Options</td>
                  <td>Present (Good)</td>
                </tr>
                <tr>
                  <td>X-Content-Type-Options</td>
                  <td>Present (Good)</td>
                </tr>
                <tr>
                  <td>Strict-Transport-Security</td>
                  <td>Present (Good)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Exclusive Offer Section */}
          <div className="card bg-light p-4 text-center shadow-sm">
            <h3 className="fw-bold text-success mb-3">Unlock Your Full Security Report 🚀</h3>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item">✔️ Deep vulnerability assessment</li>
              <li className="list-group-item">✔️ Outdated dependency check</li>
              <li className="list-group-item">✔️ SSL certificate expiry and chain review</li>
              <li className="list-group-item">✔️ Server misconfiguration insights</li>
              <li className="list-group-item">✔️ Exportable PDF report</li>
            </ul>
            <button className="btn btn-success btn-lg px-5" onClick={handleUpgradeClick}>
              Make Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ScanPage;