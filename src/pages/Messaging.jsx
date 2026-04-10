import React from 'react';
import { motion } from 'framer-motion';

const Messaging = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex h-full overflow-hidden"
    >
      {/* Inbox List */}
      <div className="w-80 border-r border-glass-border glass p-4 overflow-y-auto">
        <h2 className="font-cinzel text-lg mb-6">Messages</h2>
        <div className="space-y-2">
          {['Senpai', 'AnimeLover99', 'Nakama Group', 'General Chat'].map((name, i) => (
            <div key={i} className={`p-4 rounded-xl cursor-pointer transition-all ${i === 0 ? 'bg-pink-500/10 border border-pink-500/30' : 'hover:bg-white/5'}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-purple-500" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">{name}</h4>
                  <p className="text-xs text-muted truncate">Yo, check out this new...</p>
                </div>
                {i === 0 && <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#FF6B9D]" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col glass">
        <div className="p-4 border-b border-glass-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600" />
            <h4 className="font-bold">Senpai</h4>
          </div>
          <div className="flex gap-4 opacity-70">
            <span>📞</span>
            <span>📹</span>
          </div>
        </div>
        
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          <div className="flex justify-start">
            <div className="bg-glass-border p-4 rounded-2xl rounded-tl-none max-w-md">
              <p className="text-sm">Yo! Did you see the latest Nakama HQ update?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-pink-500 p-4 rounded-2xl rounded-tr-none max-w-md">
              <p className="text-sm">Yeah, the new redirection system is sick 🚀</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white/5">
          <input 
            type="text" 
            placeholder="Write a message..." 
            className="w-full bg-black/20 border border-glass-border rounded-full px-6 py-3 outline-none focus:border-pink-500 transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Messaging;
