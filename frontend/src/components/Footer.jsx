// src/components/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="d-flex align-items-center">
              <i className="fas fa-link me-2"></i> URL Shortener
            </h5>
            <p className="mb-0">Create short links and track their performance</p>
          </div>
          
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} URL Shortener. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}