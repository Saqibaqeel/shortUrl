// src/components/ShortenerForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('https://shorturl-708.onrender.com/urls/shorten', { originalUrl });
      const shortCode = res.data.shortUrl;
      navigate(`/stats/${shortCode}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h3 className="card-title mb-4 text-center">
          <i className="fas fa-link me-2 text-primary"></i>Shorten Your URL
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="urlInput" className="form-label fw-medium">
              Enter Long URL
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-globe"></i>
              </span>
              <input
                type="url"
                className="form-control form-control-lg"
                placeholder="https://example.com/very/long/url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <i className="fas fa-spinner fa-spin me-2"></i> Shortening...
                </span>
              ) : (
                <span>
                  <i className="fas fa-cut me-2"></i> Shorten URL
                </span>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 d-flex align-items-center">
            <i className="fas fa-exclamation-circle me-2"></i>
            <div>{error}</div>
          </div>
        )}
      </div>
    </div>
  );
}