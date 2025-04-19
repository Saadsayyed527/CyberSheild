import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PdfFeedbackUploader = () => {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFeedback('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setLoading(true);
    setError('');
    setFeedback('');

    const formData = new FormData();
    formData.append('report', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload-report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setFeedback(response.data.feedback);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get feedback.');
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-sm">
        <h4 className="mb-4">📄 Upload Scan Report for AI Feedback</h4>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="form-control mb-3" />
        <button onClick={handleUpload} className="btn btn-primary" disabled={loading}>
          {loading ? 'Analyzing...' : 'Upload & Get Feedback'}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {feedback && (
          <div className="alert alert-success mt-4" style={{ whiteSpace: 'pre-wrap' }}>
            <h5>🤖 AI Feedback:</h5>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfFeedbackUploader;
