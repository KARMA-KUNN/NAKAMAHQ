import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  Plus, 
  Home, 
  Users, 
  Film, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Menu, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Link as LinkIcon, 
  BarChart3, 
  Send, 
  Search, 
  Bell, 
  User 
} from 'lucide-react';

// Mock data for communities and posts
const mockCommunities = [
  { id: 1, name: 'anime', fullName: 'Hq*anime', icon: '🎌', members: '2.4M', color: '#FF6B9D' },
  { id: 2, name: 'manga', fullName: 'Hq*manga', icon: '📚', members: '1.8M', color: '#4ECDC4' },
  { id: 3, name: 'cosplay', fullName: 'Hq*cosplay', icon: '👘', members: '890K', color: '#FFE66D' },
  { id: 4, name: 'gaming', fullName: 'Hq*gaming', icon: '🎮', members: '3.2M', color: '#A8E6CF' },
  { id: 5, name: 'art', fullName: 'Hq*art', icon: '🎨', members: '1.2M', color: '#FF8B94' },
  { id: 6, name: 'music', fullName: 'Hq*music', icon: '🎵', members: '950K', color: '#C7CEEA' },
];

const mockPosts = [
  {
    id: 1,
    type: 'text',
    community: 'Hq*anime',
    author: 'sakura_warrior',
    avatar: '🌸',
    title: 'Just finished Attack on Titan - What an absolute masterpiece!',
    content: 'I cannot believe how well they wrapped up the story. The character development, the plot twists, everything was perfect. What did you all think of the ending?',
    upvotes: 2847,
    comments: 342,
    timeAgo: '3h ago',
  },
  {
    id: 2,
    type: 'image',
    community: 'Hq*art',
    author: 'digital_sensei',
    avatar: '🎨',
    title: 'My latest digital painting of Luffy from One Piece',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=600&fit=crop',
    content: 'Spent about 15 hours on this piece. Tried a new lighting technique!',
    upvotes: 4521,
    comments: 156,
    timeAgo: '5h ago',
  },
  {
    id: 3,
    type: 'poll',
    community: 'Hq*anime',
    author: 'poll_master_99',
    avatar: '📊',
    title: 'Best anime of 2024?',
    pollOptions: [
      { text: 'Frieren: Beyond Journey\'s End', votes: 3421, percentage: 45 },
      { text: 'Demon Slayer Season 4', votes: 2134, percentage: 28 },
      { text: 'My Hero Academia Season 7', votes: 1523, percentage: 20 },
      { text: 'Jujutsu Kaisen Season 3', votes: 532, percentage: 7 },
    ],
    totalVotes: 7610,
    upvotes: 1234,
    comments: 89,
    timeAgo: '1d ago',
  },
  {
    id: 4,
    type: 'link',
    community: 'Hq*manga',
    author: 'manga_news_bot',
    avatar: '🤖',
    title: 'New chapter of Chainsaw Man releases tomorrow!',
    linkUrl: 'https://mangaplus.shueisha.co.jp',
    linkDomain: 'mangaplus.shueisha.co.jp',
    content: 'Official announcement from Shueisha. Get ready for some chaos!',
    upvotes: 3892,
    comments: 234,
    timeAgo: '8h ago',
  },
  {
    id: 5,
    type: 'video',
    community: 'Hq*cosplay',
    author: 'cosplay_queen',
    avatar: '👑',
    title: 'My Makima cosplay transformation time-lapse',
    videoUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=600&fit=crop',
    content: 'Full makeup and costume build. Took 6 hours total!',
    upvotes: 5621,
    comments: 278,
    timeAgo: '12h ago',
  },
];

const NakamaHQ = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const [userVotes, setUserVotes] = useState({});

  const handleVote = (postId, voteType) => {
    const currentVote = userVotes[postId];
    let newVote = voteType;
    
    if (currentVote === voteType) {
      newVote = null;
    }

    setUserVotes(prev => ({ ...prev, [postId]: newVote }));
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        let voteDelta = 0;
        if (currentVote === 'up' && newVote === null) voteDelta = -1;
        if (currentVote === 'down' && newVote === null) voteDelta = 1;
        if (currentVote === null && newVote === 'up') voteDelta = 1;
        if (currentVote === null && newVote === 'down') voteDelta = -1;
        if (currentVote === 'up' && newVote === 'down') voteDelta = -2;
        if (currentVote === 'down' && newVote === 'up') voteDelta = 2;
        
        return { ...post, upvotes: post.upvotes + voteDelta };
      }
      return post;
    }));
  };

  const PostCard = ({ post }) => {
    const userVote = userVotes[post.id];
    
    return (
      <div className="post-card">
        <div className="post-vote">
          <button 
            className={`vote-btn ${userVote === 'up' ? 'active' : ''}`}
            onClick={() => handleVote(post.id, 'up')}
          >
            <ArrowUp size={20} />
          </button>
          <span className="vote-count">{post.upvotes.toLocaleString()}</span>
          <button 
            className={`vote-btn ${userVote === 'down' ? 'active' : ''}`}
            onClick={() => handleVote(post.id, 'down')}
          >
            <ArrowDown size={20} />
          </button>
        </div>
        
        <div className="post-content">
          <div className="post-header">
            <div className="post-meta">
              <span className="community-tag">{post.community}</span>
              <span className="post-author">
                <span className="author-avatar">{post.avatar}</span>
                u/{post.author}
              </span>
              <span className="post-time">{post.timeAgo}</span>
            </div>
          </div>
          
          <h2 className="post-title">{post.title}</h2>
          
          {post.type === 'text' && (
            <p className="post-text">{post.content}</p>
          )}
          
          {post.type === 'image' && (
            <>
              <p className="post-text">{post.content}</p>
              <div className="post-image-container">
                <img src={post.imageUrl} alt={post.title} className="post-image" />
              </div>
            </>
          )}
          
          {post.type === 'video' && (
            <>
              <p className="post-text">{post.content}</p>
              <div className="post-video-container">
                <img src={post.videoUrl} alt={post.title} className="post-video-thumbnail" />
                <div className="video-play-overlay">▶</div>
              </div>
            </>
          )}
          
          {post.type === 'poll' && (
            <div className="poll-container">
              {post.pollOptions.map((option, idx) => (
                <div key={idx} className="poll-option">
                  <div className="poll-bar" style={{ width: `${option.percentage}%` }}></div>
                  <div className="poll-text">
                    <span>{option.text}</span>
                    <span className="poll-percentage">{option.percentage}%</span>
                  </div>
                </div>
              ))}
              <div className="poll-footer">
                {post.totalVotes.toLocaleString()} votes
              </div>
            </div>
          )}
          
          {post.type === 'link' && (
            <>
              <p className="post-text">{post.content}</p>
              <a href={post.linkUrl} className="post-link-preview" target="_blank" rel="noopener noreferrer">
                <LinkIcon size={16} />
                <span>{post.linkDomain}</span>
              </a>
            </>
          )}
          
          <div className="post-actions">
            <button className="action-btn">
              <MessageCircle size={18} />
              <span>{post.comments} Comments</span>
            </button>
            <button className="action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
            <button className="action-btn">
              <Heart size={18} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nakama-hq">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1 className="logo">NAKAMA<span>HQ</span></h1>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {sidebarOpen && (
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => { setActiveTab('home'); setSelectedCommunity(null); }}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'community' ? 'active' : ''}`}
              onClick={() => setActiveTab('community')}
            >
              <Users size={20} />
              <span>Community</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'anime' ? 'active' : ''}`}
              onClick={() => setActiveTab('anime')}
            >
              <Film size={20} />
              <span>Anime</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'manga' ? 'active' : ''}`}
              onClick={() => setActiveTab('manga')}
            >
              <BookOpen size={20} />
              <span>Manga</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'nakamas' ? 'active' : ''}`}
              onClick={() => setActiveTab('nakamas')}
            >
              <MessageSquare size={20} />
              <span>My Nakamas</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
            
            <div className="sidebar-divider"></div>
            
            <div className="communities-section">
              <h3 className="section-title">TOP COMMUNITIES</h3>
              {mockCommunities.map(community => (
                <button 
                  key={community.id}
                  className="community-item"
                  onClick={() => {
                    setActiveTab('community');
                    setSelectedCommunity(community);
                  }}
                >
                  <span className="community-icon">{community.icon}</span>
                  <div className="community-info">
                    <span className="community-name">{community.fullName}</span>
                    <span className="community-members">{community.members} members</span>
                  </div>
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="search-bar">
            <Search size={20} />
            <input type="text" placeholder="Search Nakama HQ..." />
          </div>
          <div className="top-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-badge">5</span>
            </button>
            <button className="icon-btn">
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Feed Header */}
        <div className="feed-header">
          <div className="feed-title">
            {selectedCommunity ? (
              <>
                <span className="community-icon-large">{selectedCommunity.icon}</span>
                <div>
                  <h2>{selectedCommunity.fullName}</h2>
                  <p>{selectedCommunity.members} Nakamas</p>
                </div>
              </>
            ) : (
              <h2>
                {activeTab === 'home' && 'Your Feed'}
                {activeTab === 'community' && 'All Communities'}
                {activeTab === 'anime' && 'Anime Hub'}
                {activeTab === 'manga' && 'Manga Hub'}
                {activeTab === 'nakamas' && 'My Nakamas'}
                {activeTab === 'settings' && 'Settings'}
              </h2>
            )}
          </div>
          
          <button className="create-post-btn" onClick={() => setCreatePostOpen(true)}>
            <Plus size={20} />
            <span>Create Post</span>
          </button>
        </div>

        {/* Feed Filters */}
        {(activeTab === 'home' || activeTab === 'community') && (
          <div className="feed-filters">
            <button className="filter-btn active">
              <TrendingUp size={16} />
              <span>Hot</span>
            </button>
            <button className="filter-btn">
              <BarChart3 size={16} />
              <span>New</span>
            </button>
            <button className="filter-btn">
              <ArrowUp size={16} />
              <span>Top</span>
            </button>
          </div>
        )}

        {/* Posts Feed */}
        {(activeTab === 'home' || activeTab === 'community') && (
          <div className="posts-feed">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Anime/Manga Redirect Pages */}
        {(activeTab === 'anime' || activeTab === 'manga') && (
          <div className="redirect-page">
            <div className="redirect-card">
              <div className="redirect-icon">
                {activeTab === 'anime' ? '🎌' : '📚'}
              </div>
              <h2>Visit {activeTab === 'anime' ? 'Anime' : 'Manga'} Site</h2>
              <p>
                Access our dedicated {activeTab} platform with streaming links,
                episode notifications, and community reviews.
              </p>
              <button className="redirect-btn">
                Go to {activeTab === 'anime' ? 'SenpaiPlay' : 'SenpaiRead'} →
              </button>
            </div>
            
            <div className="notification-settings">
              <h3>📱 Notification Settings</h3>
              <label className="toggle-setting">
                <input type="checkbox" defaultChecked />
                <span>New episode alerts</span>
              </label>
              <label className="toggle-setting">
                <input type="checkbox" defaultChecked />
                <span>Weekly releases</span>
              </label>
              <label className="toggle-setting">
                <input type="checkbox" />
                <span>Community highlights</span>
              </label>
            </div>
          </div>
        )}

        {/* My Nakamas (Messaging) */}
        {activeTab === 'nakamas' && (
          <div className="messaging-layout">
            <div className="conversations-list">
              <h3>Messages</h3>
              <div className="conversation-item active">
                <div className="conv-avatar">🌸</div>
                <div className="conv-info">
                  <div className="conv-name">Hq*anime Squad</div>
                  <div className="conv-preview">Ready for tonight's episode?</div>
                </div>
                <div className="conv-badge">3</div>
              </div>
              <div className="conversation-item">
                <div className="conv-avatar">🎨</div>
                <div className="conv-info">
                  <div className="conv-name">art_lover_42</div>
                  <div className="conv-preview">Your latest piece is amazing!</div>
                </div>
              </div>
              <div className="conversation-item">
                <div className="conv-avatar">🎮</div>
                <div className="conv-info">
                  <div className="conv-name">Gaming Gang</div>
                  <div className="conv-preview">Anyone up for raid tonight?</div>
                </div>
              </div>
            </div>
            
            <div className="chat-area">
              <div className="chat-header">
                <div className="chat-avatar">🌸</div>
                <div className="chat-title">
                  <div className="chat-name">Hq*anime Squad</div>
                  <div className="chat-members">12 members</div>
                </div>
              </div>
              
              <div className="chat-messages">
                <div className="message received">
                  <div className="message-avatar">🌸</div>
                  <div className="message-content">
                    <div className="message-author">sakura_warrior</div>
                    <div className="message-text">
                      Ready for tonight's episode?
                    </div>
                    <div className="message-time">2:34 PM</div>
                  </div>
                </div>
                
                <div className="message sent">
                  <div className="message-content">
                    <div className="message-text">
                      Absolutely! Can't wait to see what happens!
                    </div>
                    <div className="message-time">2:35 PM</div>
                  </div>
                </div>
              </div>
              
              <div className="chat-input">
                <input type="text" placeholder="Message Hq*anime Squad..." />
                <button className="send-btn">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="settings-page">
            <div className="settings-section">
              <h3>Account Settings</h3>
              <div className="setting-item">
                <label>Username</label>
                <input type="text" defaultValue="nakama_user_123" />
              </div>
              <div className="setting-item">
                <label>Email</label>
                <input type="email" defaultValue="nakama@example.com" />
              </div>
            </div>
            
            <div className="settings-section">
              <h3>Notifications</h3>
              <label className="toggle-setting">
                <input type="checkbox" defaultChecked />
                <span>Community posts</span>
              </label>
              <label className="toggle-setting">
                <input type="checkbox" defaultChecked />
                <span>Direct messages</span>
              </label>
              <label className="toggle-setting">
                <input type="checkbox" />
                <span>Email notifications</span>
              </label>
            </div>
            
            <div className="settings-section">
              <h3>Theme</h3>
              <div className="theme-selector">
                <button className="theme-btn active">Dark</button>
                <button className="theme-btn">Light</button>
                <button className="theme-btn">Auto</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {createPostOpen && (
        <div className="modal-overlay" onClick={() => setCreatePostOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Post</h2>
              <button onClick={() => setCreatePostOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="create-post-types">
              <button className="post-type-btn active">Text</button>
              <button className="post-type-btn">Image</button>
              <button className="post-type-btn">Video</button>
              <button className="post-type-btn">Link</button>
              <button className="post-type-btn">Poll</button>
            </div>
            
            <select className="community-select">
              <option>Choose a community</option>
              {mockCommunities.map(c => (
                <option key={c.id}>{c.fullName}</option>
              ))}
            </select>
            
            <input 
              type="text" 
              className="post-title-input" 
              placeholder="Title"
            />
            
            <textarea 
              className="post-content-input" 
              placeholder="Text (optional)"
              rows={8}
            />
            
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setCreatePostOpen(false)}>
                Cancel
              </button>
              <button className="submit-btn">Post</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0a0e27;
          color: #ffffff;
        }

        .nakama-hq {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1d3a 100%);
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
          width: 280px;
          background: rgba(20, 24, 45, 0.8);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: fixed;
          height: 100vh;
          z-index: 100;
          overflow-y: auto;
        }

        .sidebar.closed {
          width: 70px;
        }

        .sidebar-header {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .logo {
          font-size: 24px;
          font-weight: 900;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .logo span {
          background: linear-gradient(135deg, #4ECDC4 0%, #556FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sidebar-toggle {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        .sidebar-nav {
          padding: 16px 12px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          margin-bottom: 4px;
          font-size: 15px;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          transform: translateX(4px);
        }

        .nav-item.active {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(192, 111, 249, 0.2) 100%);
          color: #FF6B9D;
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.2);
        }

        .sidebar-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 16px 0;
        }

        .communities-section {
          margin-top: 8px;
        }

        .section-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 12px;
          padding: 0 16px;
        }

        .community-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border: none;
          background: transparent;
          color: white;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          margin-bottom: 4px;
        }

        .community-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(4px);
        }

        .community-icon {
          font-size: 20px;
        }

        .community-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }

        .community-name {
          font-size: 14px;
          font-weight: 600;
        }

        .community-members {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }

        /* ===== MAIN CONTENT ===== */
        .main-content {
          flex: 1;
          margin-left: 280px;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar.closed ~ .main-content {
          margin-left: 70px;
        }

        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          background: rgba(20, 24, 45, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          padding: 12px 20px;
          border-radius: 24px;
          flex: 1;
          max-width: 500px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.2s;
        }

        .search-bar:focus-within {
          background: rgba(255, 255, 255, 0.08);
          border-color: #FF6B9D;
          box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
        }

        .search-bar input {
          background: none;
          border: none;
          color: white;
          flex: 1;
          font-size: 15px;
          outline: none;
        }

        .search-bar input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .top-actions {
          display: flex;
          gap: 12px;
        }

        .icon-btn {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #FF6B9D;
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
        }

        .feed-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 32px 24px;
        }

        .feed-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .feed-title h2 {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 50%, #4ECDC4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .feed-title p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }

        .community-icon-large {
          font-size: 48px;
        }

        .create-post-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(255, 107, 157, 0.3);
        }

        .create-post-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 107, 157, 0.4);
        }

        .feed-filters {
          display: flex;
          gap: 8px;
          padding: 0 32px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .filter-btn.active {
          background: rgba(255, 107, 157, 0.15);
          border-color: #FF6B9D;
          color: #FF6B9D;
        }

        /* ===== POSTS FEED ===== */
        .posts-feed {
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .post-card {
          display: flex;
          gap: 16px;
          background: rgba(20, 24, 45, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 16px;
          transition: all 0.3s;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .post-card:hover {
          border-color: rgba(255, 107, 157, 0.3);
          box-shadow: 0 8px 32px rgba(255, 107, 157, 0.1);
          transform: translateY(-2px);
        }

        .post-vote {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 4px;
        }

        .vote-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .vote-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          transform: scale(1.1);
        }

        .vote-btn.active {
          background: rgba(255, 107, 157, 0.2);
          border-color: #FF6B9D;
          color: #FF6B9D;
        }

        .vote-count {
          font-weight: 700;
          font-size: 14px;
          color: white;
        }

        .post-content {
          flex: 1;
        }

        .post-header {
          margin-bottom: 12px;
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 13px;
        }

        .community-tag {
          background: rgba(78, 205, 196, 0.15);
          color: #4ECDC4;
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 600;
        }

        .post-author {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.6);
        }

        .author-avatar {
          font-size: 14px;
        }

        .post-time {
          color: rgba(255, 255, 255, 0.4);
        }

        .post-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.4;
          color: white;
        }

        .post-text {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .post-image-container,
        .post-video-container {
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .post-image,
        .post-video-thumbnail {
          width: 100%;
          height: auto;
          display: block;
        }

        .video-play-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: rgba(255, 107, 157, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .video-play-overlay:hover {
          transform: translate(-50%, -50%) scale(1.1);
          background: rgba(255, 107, 157, 1);
        }

        .poll-container {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .poll-option {
          position: relative;
          padding: 12px 16px;
          margin-bottom: 8px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          cursor: pointer;
          overflow: hidden;
          transition: all 0.2s;
        }

        .poll-option:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .poll-bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: linear-gradient(90deg, rgba(255, 107, 157, 0.3) 0%, rgba(192, 111, 249, 0.3) 100%);
          transition: width 0.5s ease-out;
          border-radius: 8px;
        }

        .poll-text {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
        }

        .poll-percentage {
          color: #FF6B9D;
          font-weight: 700;
        }

        .poll-footer {
          margin-top: 12px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .post-link-preview {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(78, 205, 196, 0.1);
          border: 1px solid rgba(78, 205, 196, 0.3);
          border-radius: 8px;
          color: #4ECDC4;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
          transition: all 0.2s;
        }

        .post-link-preview:hover {
          background: rgba(78, 205, 196, 0.2);
          transform: translateX(4px);
        }

        .post-actions {
          display: flex;
          gap: 16px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          transform: translateY(-1px);
        }

        /* ===== REDIRECT PAGE ===== */
        .redirect-page {
          padding: 48px 32px;
          max-width: 800px;
          margin: 0 auto;
        }

        .redirect-card {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(192, 111, 249, 0.1) 100%);
          border: 2px solid rgba(255, 107, 157, 0.3);
          border-radius: 24px;
          padding: 48px;
          text-align: center;
          margin-bottom: 32px;
        }

        .redirect-icon {
          font-size: 80px;
          margin-bottom: 24px;
        }

        .redirect-card h2 {
          font-size: 32px;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .redirect-card p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .redirect-btn {
          padding: 16px 40px;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 8px 24px rgba(255, 107, 157, 0.3);
        }

        .redirect-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255, 107, 157, 0.4);
        }

        .notification-settings {
          background: rgba(20, 24, 45, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 32px;
        }

        .notification-settings h3 {
          margin-bottom: 24px;
          font-size: 20px;
        }

        .toggle-setting {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
        }

        .toggle-setting:last-child {
          border-bottom: none;
        }

        .toggle-setting input[type="checkbox"] {
          width: 48px;
          height: 26px;
          appearance: none;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s;
        }

        .toggle-setting input[type="checkbox"]:checked {
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
        }

        .toggle-setting input[type="checkbox"]::before {
          content: '';
          position: absolute;
          width: 22px;
          height: 22px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: all 0.3s;
        }

        .toggle-setting input[type="checkbox"]:checked::before {
          transform: translateX(22px);
        }

        .toggle-setting span {
          flex: 1;
          font-size: 15px;
        }

        /* ===== MESSAGING ===== */
        .messaging-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          height: calc(100vh - 73px);
        }

        .conversations-list {
          background: rgba(20, 24, 45, 0.8);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          overflow-y: auto;
        }

        .conversations-list h3 {
          padding: 24px 20px;
          font-size: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .conversation-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .conversation-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .conversation-item.active {
          background: rgba(255, 107, 157, 0.1);
          border-left: 3px solid #FF6B9D;
        }

        .conv-avatar {
          font-size: 32px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .conv-info {
          flex: 1;
        }

        .conv-name {
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 4px;
        }

        .conv-preview {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .conv-badge {
          background: #FF6B9D;
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
        }

        .chat-area {
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 32px;
          background: rgba(20, 24, 45, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .chat-avatar {
          font-size: 36px;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 14px;
        }

        .chat-title {
          flex: 1;
        }

        .chat-name {
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 2px;
        }

        .chat-members {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message {
          display: flex;
          gap: 12px;
          max-width: 70%;
        }

        .message.sent {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-avatar {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          flex-shrink: 0;
        }

        .message-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .message-author {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .message-text {
          background: rgba(255, 255, 255, 0.05);
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
        }

        .message.sent .message-text {
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
        }

        .message-time {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }

        .chat-input {
          display: flex;
          gap: 12px;
          padding: 20px 32px;
          background: rgba(20, 24, 45, 0.8);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .chat-input input {
          flex: 1;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          color: white;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
        }

        .chat-input input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #FF6B9D;
        }

        .chat-input input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .send-btn {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          border: none;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
        }

        .send-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(255, 107, 157, 0.4);
        }

        /* ===== SETTINGS ===== */
        .settings-page {
          padding: 32px;
          max-width: 800px;
          margin: 0 auto;
        }

        .settings-section {
          background: rgba(20, 24, 45, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 24px;
        }

        .settings-section h3 {
          font-size: 20px;
          margin-bottom: 24px;
          color: #FF6B9D;
        }

        .setting-item {
          margin-bottom: 20px;
        }

        .setting-item label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
        }

        .setting-item input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          color: white;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
        }

        .setting-item input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #FF6B9D;
        }

        .theme-selector {
          display: flex;
          gap: 12px;
        }

        .theme-btn {
          flex: 1;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .theme-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .theme-btn.active {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(192, 111, 249, 0.2) 100%);
          border-color: #FF6B9D;
          color: #FF6B9D;
        }

        /* ===== MODAL ===== */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          background: #14182d;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .modal-header h2 {
          font-size: 24px;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .modal-header button {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-header button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        .create-post-types {
          display: flex;
          gap: 8px;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .post-type-btn {
          flex: 1;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .post-type-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .post-type-btn.active {
          background: rgba(255, 107, 157, 0.15);
          border-color: #FF6B9D;
          color: #FF6B9D;
        }

        .community-select,
        .post-title-input,
        .post-content-input {
          width: 100%;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          color: white;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
          font-family: inherit;
        }

        .community-select {
          margin: 20px 24px 16px;
        }

        .post-title-input {
          margin: 0 24px 16px;
        }

        .post-content-input {
          margin: 0 24px 20px;
          resize: vertical;
        }

        .community-select:focus,
        .post-title-input:focus,
        .post-content-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #FF6B9D;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          padding: 20px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cancel-btn,
        .submit-btn {
          flex: 1;
          padding: 14px 24px;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-btn {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
        }

        .cancel-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .submit-btn {
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 107, 157, 0.4);
        }

        /* ===== SCROLLBAR ===== */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 157, 0.3);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 157, 0.5);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .sidebar {
            width: 70px;
          }

          .main-content {
            margin-left: 70px;
          }

          .sidebar-nav span {
            display: none;
          }

          .messaging-layout {
            grid-template-columns: 280px 1fr;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0;
          }

          .messaging-layout {
            grid-template-columns: 1fr;
          }

          .conversations-list {
            display: none;
          }

          .feed-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .create-post-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default NakamaHQ;
