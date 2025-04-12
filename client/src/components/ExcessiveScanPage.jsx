import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExcessiveScanPage.css';

const ExcessiveScanPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReport(null);

    try {
      const response = await axios.post('/api/scans/excessiveCheck', { url });
      setReport(response.data.result);
    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed');
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Excessive Security Scan 🔒</h2>
        <p className="text-muted">Check for SSL, open ports, outdated libraries, and more.</p>
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
        <button type="submit" disabled={loading} className="btn btn-danger px-4">
          {loading ? 'Scanning...' : 'Run Scan'}
        </button>
      </form>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {report && (
        <div className="card shadow-sm p-4">
          <h4 className="mb-4 text-success">Scan Report</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td><strong>SSL Valid:</strong></td>
                <td>{report.ssl.valid ? '✅ Yes' : '❌ No'}</td>
              </tr>
              <tr>
                <td><strong>SSL Expiry:</strong></td>
                <td>{report.ssl.validTo}</td>
              </tr>
              <tr>
                <td><strong>Open Ports:</strong></td>
                <td>{report.openPorts.length > 0 ? report.openPorts.join(', ') : 'None detected'}</td>
              </tr>
              <tr>
                <td><strong>Outdated Libraries:</strong></td>
                <td>
                  {report.outdatedLibraries.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {report.outdatedLibraries.map((lib, i) => (
                        <li key={i}>🔺 {lib}</li>
                      ))}
                    </ul>
                  ) : 'None found'}
                </td>
              </tr>
              <tr>
                <td><strong>Security Headers:</strong></td>
                <td>
                  <ul className="list-unstyled mb-0">
                    <li>🛡️ Content-Security-Policy: <code>{report.headers["Content-Security-Policy"]}</code></li>
                    <li>🛡️ X-Frame-Options: <code>{report.headers["X-Frame-Options"]}</code></li>
                    <li>🛡️ Strict-Transport-Security: <code>{report.headers["Strict-Transport-Security"]}</code></li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcessiveScanPage;
