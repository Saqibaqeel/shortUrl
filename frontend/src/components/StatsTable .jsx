// src/components/StatsTable.js
import React from 'react';

export default function StatsTable({ stats }) {
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = Math.floor((now - date) / 1000); // in seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff/60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)} hour${Math.floor(diff/3600) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diff/86400)} day${Math.floor(diff/86400) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
              <td>{getTimeAgo(item.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}