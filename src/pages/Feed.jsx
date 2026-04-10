import React from 'react';
import { motion } from 'framer-motion';

const Feed = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-12"
    >
      <h1 className="font-decorative text-5xl mb-10 gradient-text tracking-widest uppercase">Community</h1>
      <div className="grid gap-6 max-w-4xl">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card p-8 mb-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20" />
              <div>
                <h3 className="text-sm font-bold text-teal-400">Hq*anime_leaks</h3>
                <p className="text-xs text-muted mt-1">Posted by <span className="text-pink-500">Nakama_Senpai</span> • 5h ago</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 leading-snug">Solo Leveling Season 2 Release Date Rumors?</h2>
            <p className="text-base text-muted mb-6 leading-relaxed">Guys, I just saw some leaks suggesting a Winter 2025 release. What do you think about the animation quality changes?</p>
            <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 cursor-pointer hover:text-pink-500 transition-colors bg-white/5 py-2 px-4 rounded-lg">↑ 2.4k Upvotes</span>
              <span className="flex items-center gap-2 cursor-pointer hover:text-purple-500 transition-colors bg-white/5 py-2 px-4 rounded-lg">💬 142 Comments</span>
              <span className="flex items-center gap-2 cursor-pointer hover:text-teal-500 transition-colors bg-white/5 py-2 px-4 rounded-lg">🔗 Share</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Feed;
