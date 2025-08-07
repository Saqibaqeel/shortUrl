import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const navigate = useNavigate();

  // Point this at your backend's /urls/shorten endpoint
  const backendBaseUrl = 'https://shorturl-708.onrender.com/urls';

  useEffect(() => {
    // Simple URL validation
    const pattern = /^https:\/\//;

    setIsValidUrl(pattern.test(originalUrl));
  }, [originalUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl) {
      setError('Please enter a valid URL');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        `${backendBaseUrl}/shorten`,
        { originalUrl }
      );
      // backend returns { shortUrl: 'abc123' }
      const code = res.data.shortUrl;
      navigate(`/stats/${code}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow-lg border-0 rounded-3 bg-light">
      <style>
        {`
          .url-input:focus {
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
            border-color: #86b7fe !important;
          }
          .pulse {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(13, 110, 253, 0); }
            100% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0); }
          }
        `}
      </style>
      
      <div className="text-center mb-4">
        <i className="fas fa-link fa-3x text-primary mb-3"></i>
        <h3 className="fw-bold">
          <i className="fas fa-cut me-2 text-danger"></i>Shorten your URL
        </h3>
        <p className="text-muted">Paste your long URL below to shorten it</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <i className="fas fa-link text-primary"></i>
          </span>
          <input
            type="url"
            className={`form-control form-control-lg url-input ${isValidUrl && 'is-valid'} ${error && 'is-invalid'}`}
            placeholder="https://example.com/very-long-url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button 
            className="btn btn-primary btn-lg" 
            type="submit"
            disabled={loading || !originalUrl}
          >
            {loading ? (
              <span><i className="fas fa-spinner fa-spin me-1"></i> Processing...</span>
            ) : (
              <span>Shorten <i className="fas fa-arrow-right ms-1"></i></span>
            )}
          </button>
        </div>
        
        <div className="d-flex align-items-center mt-2">
          <i className="fas fa-info-circle me-2 text-info"></i>
          <small className="text-muted">Must be a valid URL starting with http:// or https://</small>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger d-flex align-items-center mt-4 animate__animated animate__headShake">
          <i className="fas fa-exclamation-circle me-2"></i>
          <div>{error}</div>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-white border rounded text-center">
        <div className="d-flex justify-content-around">
          <div>
            <i className="fas fa-bolt fa-2x text-warning mb-2"></i>
            <h5 className="fw-bold">Instant</h5>
            <small className="text-muted">Real-time shortening</small>
          </div>
          <div>
            <i className="fas fa-shield-alt fa-2x text-success mb-2"></i>
            <h5 className="fw-bold">Secure</h5>
            <small className="text-muted">HTTPS encryption</small>
          </div>
          <div>
            <i className="fas fa-chart-line fa-2x text-info mb-2"></i>
            <h5 className="fw-bold">Analytics</h5>
            <small className="text-muted">Click tracking</small>
          </div>
        </div>
      </div>
    </div>
  );
}