// src/components/StatsCard.js
import React from 'react';

export default function StatsCard({ title, value, icon, color = 'primary' }) {
  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className={`bg-${color} text-white rounded-circle p-3 me-3`}>
            <i className={`fas ${icon} fa-lg`}></i>
          </div>
          <div>
            <h6 className="text-uppercase text-muted small">{title}</h6>
            <h4 className="mb-0">{value}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}