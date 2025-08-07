// src/pages/ShortenerPage.js
import React from 'react';
import ShortenerForm from './ShortenerForm';

export default function ShortenerPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold mb-3">Shorten Your URLs</h1>
            <p className="lead text-muted">
              Create short, easy-to-share links that you can track
            </p>
          </div>
          
          <ShortenerForm />
          
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <div className="bg-primary text-white rounded-circle p-3 mb-3 mx-auto">
                    <i className="fas fa-bolt fa-lg"></i>
                  </div>
                  <h5>Instant</h5>
                  <p className="mb-0">Get shortened URLs in seconds</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <div className="bg-primary text-white rounded-circle p-3 mb-3 mx-auto">
                    <i className="fas fa-shield-alt fa-lg"></i>
                  </div>
                  <h5>Secure</h5>
                  <p className="mb-0">All links are protected and safe</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <div className="bg-primary text-white rounded-circle p-3 mb-3 mx-auto">
                    <i className="fas fa-chart-line fa-lg"></i>
                  </div>
                  <h5>Analytics</h5>
                  <p className="mb-0">Track clicks and engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}