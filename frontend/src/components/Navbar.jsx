// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fas fa-link me-2"></i>
          <span>URL Shortener</span>
        </Link>
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                <i className="fas fa-compress-alt me-1"></i> Shorten
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}