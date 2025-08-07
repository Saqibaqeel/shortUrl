// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import StatsPage from './components/StatsPage';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4 min-vh-100 min-vw-100 d-flex flex-column">
        <Routes>
          <Route path="/" element={<ShortenerForm />} />
          <Route path="/stats/:shortUrl" element={<StatsPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
