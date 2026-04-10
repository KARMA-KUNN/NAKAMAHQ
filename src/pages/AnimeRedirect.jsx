import React from 'react';
import { motion } from 'framer-motion';

const AnimeRedirect = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="h-full flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="max-w-xl glass-card p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500" />
        
        <div className="text-6xl mb-6">🎬</div>
        <h1 className="font-decorative text-4xl mb-4 gradient-text">SENPAI PLAY</h1>
        <p className="text-lg text-muted mb-8 italic">"Your portal to the infinite world of anime."</p>
        
        <div className="space-y-4 mb-10 text-sm text-left opacity-80 border-l-2 border-teal-500 pl-4">
          <p>✓ High-speed redirection to premium sources</p>
          <p>✓ Synced watchlist & progress</p>
          <p>✓ Global community integration</p>
        </div>

        <a 
          href="http://localhost:3000" 
          className="gradient-btn inline-block px-12 py-4 rounded-full text-lg shadow-[0_0_30px_#FF6B9D55]"
        >
          Enter SenpaiPlay ↗
        </a>
        
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-teal-500 uppercase">External Link Secured</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeRedirect;
