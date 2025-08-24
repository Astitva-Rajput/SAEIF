import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogManager from '../components/BlogManager';
import BlogIntroEditor from '../components/BlogIntroEditor';
import YouTubeManager from '../components/YouTubeManager';

const TABS = [
  { label: 'Blog Management', value: 'blogs' },
  { label: 'Blog Intro', value: 'intro' },
  { label: 'YouTube Videos', value: 'youtube' },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for JWT and admin role in localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</button>
      </div>
      <div className="flex gap-4 mb-8">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === tab.value ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        {activeTab === 'blogs' && <BlogManager />}
        {activeTab === 'intro' && <BlogIntroEditor />}
        {activeTab === 'youtube' && <YouTubeManager />}
      </div>
    </div>
  );
};

export default AdminPanel;