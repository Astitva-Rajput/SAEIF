import React, { useState } from "react";
import { FaSearch, FaRegClock, FaUser, FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const samplePosts = [
  {
    _id: "1",
    title: "Building Resilience in Your Career Journey",
    content: "Learn how to bounce back from setbacks and build a successful career with practical tips and inspiring stories.",
    author: "Vikram Singh",
    date: "December 12, 2024",
    readTime: "7 min read",
    tag: "Career Development",
  },
  {
    _id: "2",
    title: "AI and Machine Learning: Skills for the Future",
    content: "Explore the essentials of AI and ML, and discover how these skills can transform your career.",
    author: "Neha Gupta",
    date: "December 12, 2024",
    readTime: "6 min read",
    tag: "Digital Skills",
  },
  {
    _id: "3",
    title: "From Unemployment to Entrepreneurship: Ravi's Journey",
    content: "Get step-by-step entrepreneurship insights, resources, and success stories from our successful fellows.",
    author: "Team SAEIF",
    date: "December 12, 2024",
    readTime: "8 min read",
    tag: "Success Stories",
  },
  {
    _id: "4",
    title: "The Rise of Remote Work: Adapting Your Skills",
    content: "Strategies and skills for thriving in the remote work environment.",
    author: "Pooja Sharma",
    date: "December 12, 2024",
    readTime: "5 min read",
    tag: "Industry Insights",
  },
  {
    _id: "5",
    title: "Effective Communication in the Digital Age",
    content: "Master the art of digital communication in the modern workplace with our professional guidance.",
    author: "Amit Kumar",
    date: "December 12, 2024",
    readTime: "6 min read",
    tag: "Career Development",
  },
  {
    _id: "6",
    title: "Workshop Recap: Data Analytics Bootcamp",
    content: "Key takeaways and lessons from our recent data analytics bootcamp for beginners.",
    author: "Workshop Team",
    date: "December 12, 2024",
    readTime: "7 min read",
    tag: "Workshops",
  },
];

const tags = [
  "Success Stories",
  "Career Development",
  "Digital Skills",
  "Industry Insights",
  "Workshops",
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const filteredPosts = samplePosts.filter(
    (post) =>
      (activeTag === "" || post.tag === activeTag) &&
      (post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 font-poppins">
      {/* Hero Section */}
      <div className="relative w-full min-h-[420px] flex items-center justify-center">
        <img
          src="/demo-banner.jpg"
          alt="Blog Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent w-1/2" style={{right: 'auto'}} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 py-16">
          <div className="bg-white/90 rounded-full px-5 py-2 mb-4 shadow text-primary text-sm font-semibold mx-auto w-fit">
            Latest Insights & Stories
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Inspiring <span className="text-accent">Stories</span>
          </h1>
          <p className="text-white text-lg max-w-2xl mb-6">
            Discover success stories, industry insights, and expert guidance on transforming careers across India. Join thousands who are already on their journey to success.
          </p>
          {/* Search Bar */}
          <form
            className="flex w-full max-w-xl mx-auto bg-white rounded-full shadow-lg overflow-hidden"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="text"
              className="flex-1 px-6 py-3 outline-none text-gray-700 text-base bg-transparent"
              placeholder="Search for articles, topics, or insights..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" className="bg-accent px-6 flex items-center justify-center text-white font-semibold text-lg">
              <FaSearch />
            </button>
          </form>
          {/* Tag Filters */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            <span className="text-white font-medium mr-2">Trending:</span>
            {tags.map(tag => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:border-white/50 ${activeTag === tag ? "bg-white/40 border-white/50" : ""}`}
                onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Latest <span className="text-accent">Insights</span>
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Stay updated with the latest trends, success stories, and expert advice from our community
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12 text-lg">No articles found.</div>
          ) : (
            filteredPosts.map(post => (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[260px] border-t-4 border-accent/20 hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 animate-fadeInUp"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-1">•</span>
                    <FaRegClock />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-primary line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.content}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaUser className="text-accent" /> {post.author}
                  </div>
                  <Link to={`/blog/${post._id}`} className="flex items-center gap-1 text-accent font-semibold text-sm hover:underline group">
                    Read More <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-accent text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-primary transition">Load More Articles</button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-gradient-to-r from-[#3a4b9c] to-[#ff6b35]/90 py-16 px-4 flex flex-col items-center text-center rounded-t-[48px] mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Stay <span className="text-accent">Inspired</span></h2>
        <p className="text-white/90 mb-6 max-w-xl mx-auto">
          Get the latest success stories, career tips, and skill development insights delivered straight to your inbox. Join 10,000+ professionals who are already transforming their careers.
        </p>
        <form className="flex w-full max-w-md mx-auto bg-white rounded-full shadow-lg overflow-hidden mb-6" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            className="flex-1 px-6 py-3 outline-none text-gray-700 text-base bg-transparent"
            placeholder="Enter your email address"
          />
          <button type="submit" className="bg-accent px-6 flex items-center justify-center text-white font-semibold text-lg">
            Subscribe
          </button>
        </form>
        <div className="flex gap-12 mt-6 justify-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-white">10K+</span>
            <span className="text-white/80 text-sm">Subscribers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-white">Weekly</span>
            <span className="text-white/80 text-sm">Updates</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-white">100%</span>
            <span className="text-white/80 text-sm">Free</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;