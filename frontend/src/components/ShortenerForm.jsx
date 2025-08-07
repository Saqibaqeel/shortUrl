import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Point this at your backend's /urls/shorten endpoint
  const backendBaseUrl = 'https://shorturl-708.onrender.com/urls';

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="card p-4 shadow">
      <h3 className="mb-4">
        <i className="fas fa-cut me-2"></i>Shorten your URL
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="url"
            className="form-control"
            placeholder="Enter long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading}
        >
          {loading ? (
            <><i className="fas fa-spinner fa-spin me-1"></i>Shortening...</>
          ) : (
            'Shorten'
          )}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}
    </div>
  );
}
