import React from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-8 max-w-2xl mx-auto"
    >
      <h1 className="font-decorative text-4xl mb-12 gradient-text">Settings</h1>
      
      <div className="space-y-8">
        <section className="glass-card p-6">
          <h2 className="font-cinzel text-lg mb-4 text-teal-400">Account</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-sm">Profile Visibility</span>
              <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-500 font-bold uppercase">Public</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Email</span>
              <span className="text-sm text-muted">nakama_user@hq.com</span>
            </div>
          </div>
        </section>

        <section className="glass-card p-6">
          <h2 className="font-cinzel text-lg mb-4 text-purple-400">Notifications</h2>
          <div className="space-y-4">
            {['New Episode Alerts', 'Community Mentions', 'Direct Messages', 'Platform Updates'].map(item => (
              <div key={item} className="flex justify-between items-center border-b border-white/5 last:border-0 pb-4 last:pb-0">
                <span className="text-sm">{item}</span>
                <div className="w-10 h-5 rounded-full bg-teal-500/20 relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-teal-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-6">
          <h2 className="font-cinzel text-lg mb-4 text-pink-400">Appearance</h2>
          <div className="flex gap-4">
            <div className="flex-1 p-4 rounded-xl border border-pink-500 bg-pink-500/10 text-center">
              <p className="text-xs font-bold uppercase tracking-widest">Dark Mode</p>
            </div>
            <div className="flex-1 p-4 rounded-xl border border-glass-border bg-white/5 text-center opacity-50">
              <p className="text-xs font-bold uppercase tracking-widest">Light Mode</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Settings;
