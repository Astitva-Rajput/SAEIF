import React, { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API || '';

const YouTubeManager = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: '', url: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchVideos = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/youtube`);
    const data = await res.json();
    setVideos(data);
    setLoading(false);
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API}/api/youtube/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });
      } else {
        res = await fetch(`${API}/api/youtube`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });
      }
      if (!res.ok) throw new Error('Failed to save video');
      setForm({ title: '', url: '', description: '' });
      setEditingId(null);
      fetchVideos();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEdit = video => {
    setForm({ title: video.title, url: video.url, description: video.description });
    setEditingId(video._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this video?')) return;
    setLoading(true);
    await fetch(`${API}/api/youtube/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchVideos();
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage YouTube Videos</h2>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
        <input name="url" value={form.url} onChange={handleChange} placeholder="YouTube URL" className="border p-2 rounded" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded md:col-span-2" />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded md:col-span-2">{editingId ? 'Update' : 'Add'} Video</button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="grid gap-4">
        {videos.map(video => (
          <div key={video._id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg">{video.title}</h3>
              <div className="text-gray-800 mt-1 line-clamp-2">{video.description}</div>
              <div className="text-blue-600 text-sm break-all">{video.url}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(video)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(video._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeManager;