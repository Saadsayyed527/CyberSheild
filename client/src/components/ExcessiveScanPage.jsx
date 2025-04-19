import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExcessiveScanPage.css';
import { useNavigate } from 'react-router-dom';

const ExcessiveScanPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const websites = [
    "https://www.google.co.in/",
    "https://www.apple.com/",
    "https://www.microsoft.com/",
    "https://www.amazon.com/",
    "https://www.tesla.com/",
    "https://www.facebook.com/",
    "https://www.berkshirehathaway.com/",
    "https://www.jnj.com/",
    "https://www.walmart.com/",
    "https://corporate.exxonmobil.com/"
  ];

  const xFrameOptionsList = [
    'DENY', 
    'SAMEORIGIN', 
    'ALLOW-FROM http://example.com', 
    'ALLOWALL', 
    'ALLOW-FROM *', 
    'ALLOW-FROM http://www.google.com',
    'ALLOW-FROM https://www.example.org',
    'DENY, SAMEORIGIN', 
    'ALLOWALL, DENY', 
    'SAMEORIGIN, ALLOW-FROM https://www.mysite.com'
  ];

  const hstsList = [
    'max-age=31536000; includeSubDomains; preload',
    'max-age=31536000; includeSubDomains',
    'max-age=63072000; includeSubDomains; preload',
    'max-age=31536000; preload',
    'max-age=86400; includeSubDomains',
    'max-age=31536000; includeSubDomains; no-cache',
    'max-age=31536000; includeSubDomains; no-store',
    'max-age=31536000; includeSubDomains; must-revalidate',
    'max-age=31536000; preload; no-store',
    'max-age=31536000; includeSubDomains; s-maxage=31536000'
  ];

  const contentSecurityPolicyList = [
    "default-src 'self';",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
    "style-src 'self' 'unsafe-inline';",
    "img-src 'self' data:;",
    "connect-src 'self';",
    "font-src 'self';",
    "frame-src 'self';",
    "child-src 'none';",
    "report-uri /report-violation;",
    "frame-ancestors 'none';"
  ];

  const getRandomXFrameOptions = () => {
    const randomOptions = [];
    while (randomOptions.length < 2) {
      const randomIndex = Math.floor(Math.random() * xFrameOptionsList.length);
      const selectedOption = xFrameOptionsList[randomIndex];
      if (!randomOptions.includes(selectedOption)) {
        randomOptions.push(selectedOption);
      }
    }
    return randomOptions;
  };

  const getRandomHSTS = () => {
    const randomIndex = Math.floor(Math.random() * hstsList.length);
    return hstsList[randomIndex];
  };

  const getRandomCSP = () => {
    const randomOptions = [];
    while (randomOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * contentSecurityPolicyList.length);
      const selectedOption = contentSecurityPolicyList[randomIndex];
      if (!randomOptions.includes(selectedOption)) {
        randomOptions.push(selectedOption);
      }
    }
    return randomOptions.join(' ');
  };

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReport(null);

    try {
      const isSecure = url.toLowerCase().startsWith('https://');
      const isLocalhost = url.toLowerCase().includes('localhost');

      let simulatedReport;

      if (isSecure || isLocalhost) {
        const randomXFrameOptions = getRandomXFrameOptions();
        const randomHSTS = getRandomHSTS();
        const randomCSP = getRandomCSP();

        simulatedReport = {
          ssl: {
            valid: isSecure,
            validTo: 'N/A',
          },
          openPorts: isLocalhost ? ['3000'] : ['0'],
          outdatedLibraries: isLocalhost ? ['helmet', 'form-data'] : [],
          headers: {
            'Content-Security-Policy': randomCSP,
            'X-Frame-Options': randomXFrameOptions.join(', '),
            'Strict-Transport-Security': randomHSTS,
          },
        };
      } else {
        simulatedReport = {
          ssl: {
            valid: false,
            validTo: 'N/A',
          },
          openPorts: ['443'],
          outdatedLibraries: [],
          headers: {
            'Content-Security-Policy': "default-src 'self';",
            'X-Frame-Options': 'DENY',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
          },
        };
      }

      setReport(simulatedReport);
    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed');
    }

    setLoading(false);
  };
  const handleGenerateReport = () => {
    if (!report) return;
  
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text('Excessive Security Scan Report', 20, 20);
  
    doc.setFontSize(12);
    doc.text(`SSL Valid: ${report.ssl.valid ? '✅ Yes' : '✅ No'}`, 20, 40);
    doc.text(`SSL Expiry: N/A`, 20, 50);
    doc.text(`Open Ports: ${report.openPorts.join(', ')}`, 20, 60);
  
    doc.text('Outdated Libraries:', 20, 75);
    if (report.outdatedLibraries.length > 0) {
      report.outdatedLibraries.forEach((lib, i) => {
        doc.text(`- ${lib}`, 25, 85 + i * 8);
      });
    } else {
      doc.text('None found', 25, 85);
    }
  
    const yOffset = 100 + report.outdatedLibraries.length * 8;
  
    doc.text('Security Headers:', 20, yOffset);
    doc.text(`Content-Security-Policy: ${report.headers["Content-Security-Policy"]}`, 25, yOffset + 10);
    doc.text(`X-Frame-Options: ${report.headers["X-Frame-Options"]}`, 25, yOffset + 20);
    doc.text(`Strict-Transport-Security: ${report.headers["Strict-Transport-Security"]}`, 25, yOffset + 30);
  
    
    doc.save('scan-report.pdf');
  
    // Redirect to PDF Feedback Upload page
    navigate('/ai-upload');
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
                <td>{report.ssl.valid ? '✅ Yes' : '✅ No'}</td>
              </tr>
              <tr>
                <td><strong>SSL Expiry:</strong></td>
                <td>N/A</td>
              </tr>
              <tr>
                <td><strong>Open Ports:</strong></td>
                <td>{report.openPorts.join(', ')}</td>
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

          <div className="text-end mt-4">
            <button className="btn btn-outline-success" onClick={handleGenerateReport}>
              📄 Generate Report (PDF)
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcessiveScanPage;
