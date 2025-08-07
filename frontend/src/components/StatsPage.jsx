// src/pages/StatsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StatsPage() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const backendBaseUrl = 'https://shorturl-708.onrender.com/urls';

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendBaseUrl}/stats/${shortUrl}`);
      setStats(res.data.stats);
      setClicks(res.data.clicks);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [shortUrl]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${backendBaseUrl}/${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <button className="btn btn-outline-danger btn-sm" onClick={() => navigate('/')}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Header and actions */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <h2 className="mb-0">
            <i className="fas fa-chart-bar text-primary me-2"></i>
            URL Analytics
          </h2>
        </div>
        <div className="col-md-4 text-md-end">
          <button className="btn btn-outline-secondary me-2" onClick={fetchStats}>
            <i className="fas fa-sync-alt me-1"></i> Refresh
          </button>
          <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
            <i className="fas fa-plus me-1"></i> New URL
          </button>
        </div>
      </div>

      {/* Short URL badge + copy */}
      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <span className="badge bg-primary fs-6">{shortUrl}</span>
          <button
            className={`btn btn-sm ${copied ? 'btn-success' : 'btn-outline-primary'}`}
            onClick={copyToClipboard}
          >
            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} me-1`} />
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
        </div>
      </div>

      {/* Statistics cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Clicks</h5>
              <p className="display-5 mb-0">{clicks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Last Click</h5>
              <p className="display-5 mb-0">
                {stats.length
                  ? new Date(stats[stats.length - 1].timestamp).toLocaleString()
                  : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Click history table */}
      <h4 className="mb-3">
        <i className="fas fa-history me-2"></i>Click History
      </h4>
      {!stats.length ? (
        <div className="card text-center py-5 text-muted">
          <div className="card-body">
            <i className="fas fa-inbox fa-3x mb-3" />
            <p>No clicks recorded yet</p>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Clicked At</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
