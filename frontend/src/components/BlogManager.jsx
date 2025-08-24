import React, { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API || '';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', author: '', coverImage: null });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/blog`);
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleChange = e => {
    if (e.target.name === 'coverImage') {
      setForm({ ...form, coverImage: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('author', form.author);
    if (form.coverImage) formData.append('coverImage', form.coverImage);
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API}/api/blog/${editingId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } else {
        res = await fetch(`${API}/api/blog`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      }
      if (!res.ok) throw new Error('Failed to save blog');
      setForm({ title: '', content: '', author: '', coverImage: null });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEdit = blog => {
    setForm({ title: blog.title, content: blog.content, author: blog.author, coverImage: null });
    setEditingId(blog._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this blog?')) return;
    setLoading(true);
    await fetch(`${API}/api/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBlogs();
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Blogs</h2>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="border p-2 rounded" required />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="border p-2 rounded md:col-span-2" rows={4} required />
        <input type="file" name="coverImage" accept="image/*" onChange={handleChange} className="md:col-span-2" />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded md:col-span-2">{editingId ? 'Update' : 'Add'} Blog</button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="grid gap-4">
        {blogs.map(blog => (
          <div key={blog._id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4">
            {blog.coverImage && <img src={API + blog.coverImage} alt="cover" className="w-32 h-20 object-cover rounded" />}
            <div className="flex-1">
              <h3 className="font-bold text-lg">{blog.title}</h3>
              <div className="text-sm text-gray-600">By {blog.author}</div>
              <div className="text-gray-800 mt-1 line-clamp-2">{blog.content}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(blog)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;