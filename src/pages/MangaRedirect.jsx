import React from 'react';
import { motion } from 'framer-motion';

const MangaRedirect = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex items-center justify-center bg-[#06070f]"
    >
      {/* Literally blank as requested, but keeping the background and noise overlay from App.jsx */}
    </motion.div>
  );
};

export default MangaRedirect;
