// src/components/ShortenerForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const backendBaseUrl = 'https://shorturl-708.onrender.com/urls';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(
        `${backendBaseUrl}/shorten`,
        { originalUrl }
      );
      const code = res.data.shortUrl;
      setSuccess(`Short URL generated: `);
      setTimeout(() => navigate(`/stats/${code}`), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="card-title mb-3 text-center">
              <i className="fas fa-cut text-primary me-2"></i>Shorten Your URL
            </h3>
            <p className="text-center text-muted mb-4">
              Paste a long URL below to generate a short link and track its clicks.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text bg-white">
                  <i className="fas fa-link text-primary"></i>
                </span>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://example.com/very/long-url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <><i className="fas fa-spinner fa-spin me-1"></i>Shortening...</>
                  ) : (
                    'Shorten'
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                <i className="fas fa-exclamation-circle me-2"></i>{error}
              </div>
            )}

            {success && (
              <div className="alert alert-success mt-3 d-flex justify-content-between align-items-center" role="alert">
                <div>
                  <i className="fas fa-check-circle me-2"></i>{success}
                </div>
                <div className="spinner-border text-success" role="status" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
