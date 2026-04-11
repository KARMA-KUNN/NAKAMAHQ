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

// Initial data is handled in state initialization via localStorage or defaults

const NakamaHQ = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  
  // Persistence Layer
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('nhq_posts');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [
        {
          id: 'welcome-1',
          type: 'text',
          community: 'Hq*announcements',
          author: 'NakamaHq_Team',
          avatar: '💎',
          title: 'Welcome to the new Nakama HQ! 🎌',
          content: 'Your ultimate anime social hub is now live. Join communities, share your favorite moments, and connect with other nakamas. Start by creating your first post!',
          upvotes: 99,
          comments: 0,
          timeAgo: 'Just now',
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [joinedCommunities, setJoinedCommunities] = useState(() => {
    try {
      const saved = localStorage.getItem('nhq_joined');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : ['Hq*anime', 'Hq*manga'];
    } catch (e) {
      return ['Hq*anime', 'Hq*manga'];
    }
  });

  const [userVotes, setUserVotes] = useState(() => {
    try {
      const saved = localStorage.getItem('nhq_votes');
      const parsed = saved ? JSON.parse(saved) : null;
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (e) {
      return {};
    }
  });

  const [messagingState, setMessagingState] = useState(() => {
    const defaultState = {
      activeChatId: 1,
      threads: {
        1: {
          id: 1,
          name: 'Hq*anime Squad',
          avatar: '🌸',
          members: '12 members',
          messages: [
            { id: 1, sender: 'sakura_warrior', text: "Ready for tonight's episode?", time: '2:34 PM', isMe: false }
          ]
        }
      }
    };
    try {
      const saved = localStorage.getItem('nhq_messages');
      const parsed = saved ? JSON.parse(saved) : null;
      return (parsed && parsed.threads) ? parsed : defaultState;
    } catch (e) {
      return defaultState;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', community: 'Hq*anime', type: 'text', mediaUrl: '' });

  const [viewedUser, setViewedUser] = useState(null);
  const [createCommunityOpen, setCreateCommunityOpen] = useState(false);
  const [newCommunityData, setNewCommunityData] = useState({ name: '', icon: '🌟', color: '#FF6B9D' });

  const handleCreateCommunity = (e) => {
    if (e) e.preventDefault();
    if (!newCommunityData.name) return;
    
    const newComm = {
      id: Date.now(),
      name: newCommunityData.name.toLowerCase().replace(/\s+/g, '_'),
      fullName: `Hq*${newCommunityData.name.toLowerCase()}`,
      icon: newCommunityData.icon,
      members: '1',
      color: newCommunityData.color
    };
    
    setCommunities([...communities, newComm]);
    setCreateCommunityOpen(false);
    setNewCommunityData({ name: '', icon: '🌟', color: '#FF6B9D' });
    setJoinedCommunities([...joinedCommunities, newComm.fullName]);
  };
  const [communities, setCommunities] = useState(() => {
    try {
      const saved = localStorage.getItem('nhq_communities');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : mockCommunities;
    } catch (e) {
      return mockCommunities;
    }
  });

  const [followStatus, setFollowStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('nhq_following');
      const parsed = saved ? JSON.parse(saved) : null;
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (e) {
      return {};
    }
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'follow', user: 'sakura_warrior', time: '5m ago', read: false },
    { id: 2, type: 'upvote', user: 'digital_sensei', time: '1h ago', post: 'My Makima cosplay...', read: true },
    { id: 3, type: 'comment', user: 'poll_master_99', time: '2h ago', text: 'Great point!', read: true },
  ]);

  useEffect(() => {
    localStorage.setItem('nhq_posts', JSON.stringify(posts));
    localStorage.setItem('nhq_votes', JSON.stringify(userVotes));
    localStorage.setItem('nhq_joined', JSON.stringify(joinedCommunities));
    localStorage.setItem('nhq_messages', JSON.stringify(messagingState));
    localStorage.setItem('nhq_communities', JSON.stringify(communities));
    localStorage.setItem('nhq_following', JSON.stringify(followStatus));
  }, [posts, userVotes, joinedCommunities, messagingState, communities, followStatus]);

  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    const handleError = (msg, url, lineNo, columnNo, error) => {
      setErrorStatus(`Error: ${msg} [Line: ${lineNo}]`);
      return false;
    };
    window.onerror = handleError;
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW Registered', reg))
        .catch(err => console.log('SW Failed', err));
    }
  }, []);

  if (errorStatus) {
    return (
      <div style={{ padding: '40px', background: '#0a0e27', color: '#FF6B9D', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>⚠️ Nakama HQ Error</h1>
        <p style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>{errorStatus}</p>
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '20px', padding: '12px 24px', background: '#FF6B9D', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>
          Reset Site Data
        </button>
      </div>
    );
  }

  const triggerTestNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Nakama HQ', {
        body: 'New Episode: Solo Leveling Ep 12 is now live!',
        icon: '/favicon.ico'
      });
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          triggerTestNotification();
        }
      });
    }
  };

  const handleCreatePost = (e) => {
    if (e) e.preventDefault();
    if (!formData.title) return;

    const newPost = {
      id: Date.now(),
      type: formData.type || 'text',
      community: formData.community || 'Hq*anime',
      author: 'you',
      avatar: '👤',
      title: formData.title,
      content: formData.content,
      imageUrl: formData.type === 'image' ? formData.mediaUrl : null,
      videoUrl: formData.type === 'video' ? formData.mediaUrl : null,
      upvotes: 1,
      comments: 0,
      timeAgo: 'Just now',
    };
    setPosts([newPost, ...posts]);
    setCreatePostOpen(false);
    setFormData({ title: '', content: '', community: 'Hq*anime', type: 'text', mediaUrl: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    const threadId = messagingState.activeChatId;
    const newMessage = {
      id: Date.now(),
      sender: 'you',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessagingState(prev => ({
      ...prev,
      threads: {
        ...prev.threads,
        [threadId]: {
          ...prev.threads[threadId],
          messages: [...prev.threads[threadId].messages, newMessage]
        }
      }
    }));
  };

  const [activeFilter, setActiveFilter] = useState('hot');

  const filteredPosts = (posts || []).filter(post => {
    if (!post || !post.title) return false;
    const matchesSearch = (post.title || "").toLowerCase().includes((searchQuery || "").toLowerCase()) ||
                         (post.content || "").toLowerCase().includes((searchQuery || "").toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === 'home') {
      return (joinedCommunities || []).includes(post.community) || post.author === 'you' || post.id === 'welcome-1';
    }
    
    if (activeTab === 'community' && selectedCommunity) {
      return post.community === selectedCommunity.fullName;
    }

    return true; 
  });

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
              <span 
                className="post-author clickable"
                onClick={() => { setViewedUser(post.author); setActiveTab('profile'); }}
              >
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
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              <span>Profile</span>
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
              <div className="section-header">
                <h3 className="section-title">COMMUNITIES</h3>
                <button className="add-comm-btn" onClick={() => setCreateCommunityOpen(true)}>
                  <Plus size={14} />
                </button>
              </div>
              {(communities || []).map(community => (
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
            <input 
              type="text" 
              placeholder="Search Nakama HQ..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="top-actions">
            <div className="notifications-wrapper">
              <button className="icon-btn" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                <Bell size={20} />
                {notifications.some(n => !n.read) && <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>}
              </button>
              
              {notificationsOpen && (
                <div className="notifications-dropdown">
                  <div className="dropdown-header">
                    <h3>Notifications</h3>
                    <button onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}>Mark all read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.length > 0 ? notifications.map(n => (
                      <div key={n.id} className={`notification-item ${!n.read ? 'unread' : ''}`}>
                        <div className="notif-avatar">{n.user[0].toUpperCase()}</div>
                        <div className="notif-content">
                          <p>
                            <strong>u/{n.user}</strong> {n.type === 'follow' ? 'started following you' : n.type === 'upvote' ? 'upvoted your post' : 'commented on your post'}
                          </p>
                          <span className="notif-time">{n.time}</span>
                        </div>
                        {!n.read && <div className="unread-dot"></div>}
                      </div>
                    )) : (
                      <div className="empty-notifs">No notifications yet</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button className="icon-btn" onClick={() => { setViewedUser(null); setActiveTab('profile'); }}>
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
            {selectedCommunity && (
              <button 
                className={`join-btn ${joinedCommunities.includes(selectedCommunity.fullName) ? 'joined' : ''}`}
                onClick={() => {
                  const name = selectedCommunity.fullName;
                  if (joinedCommunities.includes(name)) {
                    setJoinedCommunities(joinedCommunities.filter(c => c !== name));
                  } else {
                    setJoinedCommunities([...joinedCommunities, name]);
                  }
                }}
              >
                {joinedCommunities.includes(selectedCommunity.fullName) ? 'Joined' : 'Join'}
              </button>
            )}
          </div>

        {/* Feed Filters */}
        {(activeTab === 'home' || activeTab === 'community') && (
          <div className="feed-filters">
            <button 
              className={`filter-btn ${activeFilter === 'hot' ? 'active' : ''}`}
              onClick={() => setActiveFilter('hot')}
            >
              <TrendingUp size={16} />
              <span>Hot</span>
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'new' ? 'active' : ''}`}
              onClick={() => setActiveFilter('new')}
            >
              <TrendingUp size={16} style={{ transform: 'rotate(90deg)' }} />
              <span>New</span>
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'top' ? 'active' : ''}`}
              onClick={() => setActiveFilter('top')}
            >
              <ArrowUp size={16} />
              <span>Top</span>
            </button>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-page">
            <div className="profile-banner">
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-value">{(posts || []).filter(p => p && p.author === (viewedUser || 'you')).length}</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{viewedUser ? (followStatus[viewedUser]?.followers || 124) : Object.keys(userVotes).length}</span>
                  <span className="stat-label">{viewedUser ? 'Followers' : 'Karma'}</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{viewedUser ? 42 : 156}</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>
            </div>
            <div className="profile-header-main">
              <div className="profile-avatar-large">
                {viewedUser ? viewedUser[0].toUpperCase() : '👤'}
              </div>
              <div className="profile-info-actions">
                <div>
                  <h2>u/{viewedUser || 'you'}</h2>
                  <p>Nakama since {viewedUser ? 'Jan 2024' : 'April 2024'}</p>
                </div>
                {viewedUser && (
                  <button 
                    className={`follow-btn ${followStatus[viewedUser]?.isFollowing ? 'following' : ''}`}
                    onClick={() => {
                      const isFollowing = !followStatus[viewedUser]?.isFollowing;
                      setFollowStatus({
                        ...followStatus,
                        [viewedUser]: {
                          isFollowing,
                          followers: (followStatus[viewedUser]?.followers || 124) + (isFollowing ? 1 : -1)
                        }
                      });
                    }}
                  >
                    {followStatus[viewedUser]?.isFollowing ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>
            </div>
            
            <div className="posts-feed">
              <h3 className="section-title">{viewedUser ? `${viewedUser}'s Posts` : 'YOUR POSTS'}</h3>
              {posts.filter(p => p.author === (viewedUser || 'you')).length > 0 ? (
                posts.filter(p => p.author === (viewedUser || 'you')).map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="empty-state">
                  <p>{viewedUser ? 'This user has no posts yet.' : "You haven't posted anything yet."}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Posts Feed */}
        {(activeTab === 'home' || activeTab === 'community') && (
          <div className="posts-feed">
            {(filteredPosts || []).map(post => (
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
              <button 
                className="redirect-btn"
                onClick={() => window.open(activeTab === 'anime' ? 'https://senpaiplay.vercel.app' : 'https://senpairead.vercel.app', '_blank')}
              >
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
                <div className="chat-avatar">{messagingState.threads[messagingState.activeChatId]?.avatar}</div>
                <div className="chat-title">
                  <div className="chat-name">{messagingState.threads[messagingState.activeChatId]?.name}</div>
                  <div className="chat-members">{messagingState.threads[messagingState.activeChatId]?.members}</div>
                </div>
              </div>
              
              <div className="chat-messages">
                {(messagingState.threads[messagingState.activeChatId]?.messages || []).map(msg => (
                  <div key={msg.id} className={`message ${msg.isMe ? 'sent' : 'received'}`}>
                    {!msg.isMe && <div className="message-avatar">🌸</div>}
                    <div className="message-content">
                      {!msg.isMe && <div className="message-author">{msg.sender}</div>}
                      <div className="message-text">{msg.text}</div>
                      <div className="message-time">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <form className="chat-input" onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.msgInput;
                handleSendMessage(input.value);
                input.value = '';
              }}>
                <input name="msgInput" type="text" placeholder={`Message ${messagingState.threads[messagingState.activeChatId]?.name}...`} />
                <button type="submit" className="send-btn">
                  <Send size={20} />
                </button>
              </form>
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
              <h3>Theme & Notifications</h3>
              <div className="theme-selector mb-6">
                <button className="theme-btn active">Dark</button>
                <button className="theme-btn">Light</button>
                <button className="theme-btn">Auto</button>
              </div>
              <button 
                className="gradient-btn w-full"
                onClick={triggerTestNotification}
                style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #556FFF 100%)', padding: '12px', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '800', cursor: 'pointer' }}
              >
                🔔 Test Phone Notification
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="bottom-nav">
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => { setActiveTab('home'); setSelectedCommunity(null); setViewedUser(null); }}>
          <Home size={24} />
        </button>
        <button className={activeTab === 'community' ? 'active' : ''} onClick={() => setActiveTab('community')}>
          <Users size={24} />
        </button>
        <button onClick={() => setCreatePostOpen(true)}>
          <div className="plus-nav">
            <Plus size={24} />
          </div>
        </button>
        <button className={activeTab === 'nakamas' ? 'active' : ''} onClick={() => setActiveTab('nakamas')}>
          <MessageSquare size={24} />
        </button>
        <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => { setViewedUser(null); setActiveTab('profile'); }}>
          <User size={24} />
        </button>
      </div>

      {/* Create Community Modal */}
      {createCommunityOpen && (
        <div className="modal-overlay" onClick={() => setCreateCommunityOpen(false)}>
          <div className="modal-content community-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create a Community</h2>
              <button onClick={() => setCreateCommunityOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="input-group">
              <label>Community Name</label>
              <div className="prefix-input">
                <span className="prefix">Hq*</span>
                <input 
                  type="text" 
                  placeholder="anime, art, etc..."
                  value={newCommunityData.name}
                  onChange={(e) => setNewCommunityData({ ...newCommunityData, name: e.target.value })}
                />
              </div>
            </div>
            
            <div className="input-group">
              <label>Icon</label>
              <div className="emoji-selector">
                {['🎌', '🌟', '🎮', '🎨', '🎵', '👘', '📚'].map(emoji => (
                  <button 
                    key={emoji}
                    className={newCommunityData.icon === emoji ? 'active' : ''}
                    onClick={() => setNewCommunityData({ ...newCommunityData, icon: emoji })}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setCreateCommunityOpen(false)}>Cancel</button>
              <button className="submit-btn" onClick={handleCreateCommunity}>Create</button>
            </div>
          </div>
        </div>
      )}

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
              {['text', 'image', 'video', 'poll'].map(type => (
                <button 
                  key={type}
                  className={`post-type-btn ${formData.type === type ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, type })}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            
            <select 
              className="community-select"
              value={formData.community}
              onChange={(e) => setFormData({ ...formData, community: e.target.value })}
            >
              <option disabled>Choose a community</option>
              {mockCommunities.map(c => (
                <option key={c.id} value={c.fullName}>{c.fullName}</option>
              ))}
            </select>
            
            <input 
              type="text" 
              className="post-title-input" 
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            {(formData.type === 'image' || formData.type === 'video') && (
              <div style={{ margin: '0 24px 16px' }}>
                <input 
                  type="file" 
                  accept={formData.type === 'image' ? "image/*" : "video/*"}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setFormData({ ...formData, mediaUrl: URL.createObjectURL(file) });
                  }}
                  className="hidden"
                  id="media-upload"
                />
                <label 
                  htmlFor="media-upload" 
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-pink-500 transition-all"
                >
                  {formData.mediaUrl ? (
                    formData.type === 'image' ? 
                    <img src={formData.mediaUrl} className="max-h-32 rounded-lg" alt="Preview" /> :
                    <div className="text-cyan">Video selected!</div>
                  ) : (
                    <>
                      <Plus size={32} className="text-white/20 mb-2" />
                      <span className="text-sm text-white/50">Click to upload {formData.type}</span>
                    </>
                  )}
                </label>
              </div>
            )}
            
            <textarea 
              className="post-content-input" 
              placeholder="Text (optional)"
              rows={formData.type === 'text' ? 8 : 3}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setCreatePostOpen(false)}>
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleCreatePost}
              >
                Post
              </button>
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

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 16px;
        }

        .add-comm-btn {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-comm-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: #FF6B9D;
        }

        /* ===== NOTIFICATIONS ===== */
        .notifications-wrapper {
          position: relative;
        }

        .notifications-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 320px;
          background: #14182d;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          z-index: 1000;
          overflow: hidden;
        }

        .dropdown-header {
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .dropdown-header h3 {
          font-size: 14px;
          font-weight: 700;
        }

        .dropdown-header button {
          background: transparent;
          border: none;
          color: #FF6B9D;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .notifications-list {
          max-height: 400px;
          overflow-y: auto;
        }

        .notification-item {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background 0.2s;
          position: relative;
        }

        .notification-item.unread {
          background: rgba(255, 107, 157, 0.05);
        }

        .notification-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .notif-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #4ECDC4 0%, #556FFF 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
        }

        .notif-content p {
          font-size: 13px;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.8);
        }

        .notif-content strong {
          color: #ffffff;
        }

        .notif-time {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          background: #FF6B9D;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .empty-notifs {
          padding: 32px;
          text-align: center;
          color: rgba(255, 255, 255, 0.3);
          font-size: 13px;
        }

        /* ===== BOTTOM NAV (MOBILE) ===== */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: rgba(20, 24, 45, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 10px;
          z-index: 1000;
        }

        .bottom-nav button {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .bottom-nav button.active {
          color: #FF6B9D;
        }

        .plus-nav {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          border-radius: 16px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(255, 107, 157, 0.4);
          transform: translateY(-5px);
        }

        @media (min-width: 769px) {
          .bottom-nav {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
          .main-content {
            margin-left: 0 !important;
            padding-bottom: 80px;
          }
          .feed-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          .profile-stats {
            position: static;
            justify-content: center;
            margin-top: 24px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 16px;
          }
        }

        /* ===== COMMUNITY MODAL ===== */
        .community-modal {
          max-width: 400px;
        }

        .input-group {
          padding: 0 24px 20px;
        }

        .input-group label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 10px;
        }

        .prefix-input {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .prefix {
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          color: #FF6B9D;
          font-weight: 800;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .prefix-input input {
          background: transparent;
          border: none;
          padding: 12px 16px;
          color: white;
          width: 100%;
          outline: none;
        }

        .emoji-selector {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .emoji-selector button {
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .emoji-selector button.active {
          background: rgba(255, 107, 157, 0.15);
          border-color: #FF6B9D;
          transform: scale(1.1);
        }

        .clickable {
          cursor: pointer;
        }

        .clickable:hover {
          text-decoration: underline;
        }

        .follow-btn {
          padding: 10px 32px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          color: white;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .follow-btn.following {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #4ECDC4;
        }

        .profile-info-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
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
          box-shadow: 0 8px 10 24px rgba(255, 107, 157, 0.4);
        }

        .join-btn {
          padding: 10px 24px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }

        .join-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .join-btn.joined {
          background: transparent;
          border-color: #4ECDC4;
          color: #4ECDC4;
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
        /* ===== PROFILE ===== */
        .profile-page {
          padding-bottom: 48px;
        }

        .profile-banner {
          height: 180px;
          background: linear-gradient(135deg, #FF6B9D 0%, #C06FF9 100%);
          position: relative;
        }

        .profile-stats {
          position: absolute;
          bottom: 20px;
          right: 32px;
          display: flex;
          gap: 24px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 800;
        }

        .stat-label {
          font-size: 11px;
          text-transform: uppercase;
          opacity: 0.8;
          font-weight: 700;
        }

        .profile-header-main {
          padding: 0 32px;
          margin-top: -50px;
          position: relative;
          z-index: 10;
        }

        .profile-avatar-large {
          width: 100px;
          height: 100px;
          background: #14182d;
          border: 4px solid #0a0e27;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          margin-bottom: 16px;
        }

        .profile-header-main h2 {
          font-size: 28px;
          font-weight: 800;
        }

        .profile-header-main p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }

        .empty-state {
          padding: 48px;
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.4);
        }

        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NakamaHQ;
