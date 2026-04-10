import React from 'react';
import { motion } from 'framer-motion';

const Feed = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <h1 className="font-decorative text-4xl mb-8 gradient-text">HQ*COMMUNITY</h1>
      <div className="grid gap-6 max-w-4xl">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600" />
              <div>
                <h3 className="text-sm font-bold">Hq*anime_leaks</h3>
                <p className="text-xs text-muted">Posted by Nakama_Senpai • 5h ago</p>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-3">Solo Leveling Season 2 Release Date Rumors?</h2>
            <p className="text-sm text-muted mb-4">Guys, I just saw some leaks suggesting a Winter 2025 release. What do you think?</p>
            <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
              <span className="cursor-pointer hover:text-pink-500 transition-colors">↑ 2.4k Upvotes</span>
              <span className="cursor-pointer hover:text-purple-500 transition-colors">💬 142 Comments</span>
              <span className="cursor-pointer hover:text-teal-500 transition-colors">🔗 Share</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Feed;
