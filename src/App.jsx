import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from '@components/layout/Navbar/Navbar';
import Footer from '@components/layout/Footer/Footer';
import Home from '@pages/Home/Home';

function App() {
  return (
    <Router>
      <Navbar />

      {/* Asosiy kontent qismi. Sahifalar shu yerda o'zgaradi */}
      <main style={{ minHeight: 'calc(100vh - 400px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;