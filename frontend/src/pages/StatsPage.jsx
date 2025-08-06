// src/pages/StatsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StatsCard from '../components/StatsCard';
import StatsTable from '../components/StatsTable ';

export default function StatsPage() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Get backend base URL from environment variable or use default
  const backendBaseUrl ='https://shorturl-708.onrender.com/urls';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`https://shorturl-708.onrender.com/urls/stats/${shortUrl}`);
        setStats(res.data.stats);
        setClicks(res.data.clicks);
      } catch (err) {
        setError(err.response?.data?.error || 'Unable to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [shortUrl, backendBaseUrl]);

  const copyToClipboard = () => {
    // Use backend base URL for the short URL
    navigator.clipboard.writeText(`${backendBaseUrl}/${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="text-center">
          <i className="fas fa-spinner fa-spin fa-2x"></i>
          <p className="mt-3">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center">
          <i className="fas fa-exclamation-triangle me-2"></i>
          <div>{error}</div>
          <button 
            className="btn btn-sm btn-outline-danger ms-auto"
            onClick={() => navigate('/')}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                <div>
                  <h2 className="mb-3 mb-md-0">
                    <i className="fas fa-chart-bar text-primary me-2"></i>
                    URL Analytics
                  </h2>
                  <div className="d-flex align-items-center flex-wrap gap-2 mt-2">
                    <span className="badge bg-primary fs-6">{shortUrl}</span>
                    <button 
                      className={`btn btn-sm ${copied ? 'btn-success' : 'btn-outline-primary'}`}
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <span><i className="fas fa-check me-1"></i> Copied!</span>
                      ) : (
                        <span><i className="fas fa-copy me-1"></i> Copy URL</span>
                      )}
                    </button>
                  </div>
                </div>
                <button 
                  className="btn btn-outline-primary mt-3 mt-md-0"
                  onClick={() => navigate('/')}
                >
                  <i className="fas fa-plus me-1"></i> New URL
                </button>
              </div>
              
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <StatsCard 
                    title="Total Clicks" 
                    value={clicks} 
                    icon="fa-mouse-pointer" 
                  />
                </div>
                <div className="col-md-6">
                  <StatsCard 
                    title="Last Click" 
                    value={stats.length > 0 ? new Date(stats[stats.length - 1].timestamp).toLocaleDateString() : 'Never'} 
                    icon="fa-clock"
                    color="info"
                  />
                </div>
              </div>
              
              <h4 className="mb-3">
                <i className="fas fa-history me-2"></i>Click History
              </h4>
              
              {stats.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <i className="fas fa-inbox fa-3x mb-3"></i>
                  <p>No clicks recorded yet</p>
                </div>
              ) : (
                <StatsTable stats={stats} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}