// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';


function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 min-vw-100">
        <Navbar />
        <main className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<ShortenerPage />} />
            <Route path="/stats/:shortUrl" element={<StatsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;