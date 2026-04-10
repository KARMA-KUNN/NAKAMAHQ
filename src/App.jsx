import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Feed from './pages/Feed';
import Messaging from './pages/Messaging';
import AnimeRedirect from './pages/AnimeRedirect';
import MangaRedirect from './pages/MangaRedirect';
import Settings from './pages/Settings';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="layout-container">
        <div className="noise-overlay" />
        
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Navigate to="/community" replace />} />
              <Route path="/community" element={<Feed />} />
              <Route path="/my-nakamas" element={<Messaging />} />
              <Route path="/anime" element={<AnimeRedirect />} />
              <Route path="/manga" element={<MangaRedirect />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
