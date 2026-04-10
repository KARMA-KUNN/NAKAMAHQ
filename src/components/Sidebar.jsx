import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  PlayCircle, 
  BookOpen, 
  MessageCircle, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  GripVertical,
  Bell
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const dragControls = useDragControls();

  const navItems = [
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Anime', path: '/anime', icon: PlayCircle },
    { name: 'Manga', path: '/manga', icon: BookOpen },
    { name: 'My Nakamas', path: '/my-nakamas', icon: MessageCircle },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const sidebarVariants = {
    open: { width: 280, x: 0 },
    closed: { width: 80, x: 0 }
  };

  return (
    <motion.div
      initial="open"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="glass border-r border-glass-border h-full relative z-50 flex flex-col"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-4 overflow-hidden">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex-shrink-0 flex items-center justify-center shadow-lg shadow-pink-500/20">
          <span className="font-decorative text-2xl text-white">N</span>
        </div>
        <motion.span 
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
          className="font-decorative text-xl gradient-text whitespace-nowrap"
        >
          NAKAMA HQ
        </motion.span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 p-3 rounded-xl transition-all group
              ${isActive 
                ? 'bg-pink-500/10 text-pink-500 shadow-[inset_0_0_12px_rgba(255,107,157,0.1)]' 
                : 'text-muted hover:bg-white/5 hover:text-white'}
            `}
          >
            <item.icon size={24} className="flex-shrink-0" />
            <motion.span
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
              className="font-cinzel text-sm font-bold tracking-widest whitespace-nowrap"
            >
              {item.name}
            </motion.span>
            {!isOpen && (
              <div className="absolute left-20 bg-pink-500 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Handle */}
      <div 
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 glass flex-center rounded-full cursor-pointer hover:border-pink-500 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft size={16} className="group-hover:text-pink-500" /> : <ChevronRight size={16} className="group-hover:text-pink-500" />}
      </div>

      {/* Notifications Handle */}
      <div className="px-6 py-4">
        <div className="relative group cursor-pointer p-2 hover:bg-white/5 rounded-xl transition-all">
          <Bell size={20} className="text-teal-400" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          
          <div className="absolute left-full ml-2 top-0 w-64 glass-card p-4 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all origin-top-left z-[100]">
            <h5 className="font-cinzel text-xs font-bold mb-3 border-b border-white/5 pb-2">New Updates</h5>
            <div className="space-y-3">
              <div className="text-[10px] leading-relaxed">
                <p className="text-teal-400 font-bold">New Episode!</p>
                <p className="text-white">Solo Leveling Ep 12 is now available on SenpaiPlay.</p>
                <p className="text-muted mt-1">2 mins ago</p>
              </div>
              <div className="text-[10px] leading-relaxed">
                <p className="text-purple-400 font-bold">New release!</p>
                <p className="text-white">One Piece Manga Chapter 1112 released.</p>
                <p className="text-muted mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Area at bottom */}
      <motion.div 
        drag="x"
        dragControls={dragControls}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(e, info) => {
          if (info.offset.x < -50) setIsOpen(false);
          if (info.offset.x > 50) setIsOpen(true);
        }}
        className="p-4 flex flex-center border-t border-glass-border cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={20} className="text-muted" />
        {isOpen && <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-muted">Drag to slide</span>}
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
