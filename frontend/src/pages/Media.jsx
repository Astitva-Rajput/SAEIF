import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPhotoVideo, FaCamera, FaVideo } from "react-icons/fa";

const sampleMedia = [
  {
    _id: "1",
    title: "SAEIF Annual Conference 2024 - Highlights",
    type: "video",
    url: "/sample-conference.mp4",
    date: "December 15, 2024",
    location: "New Delhi",
    tag: "Events",
    description: "Key moments from our biggest annual gathering featuring success stories and future plans.",
    duration: "5:12",
    thumbnail: "/sample-conference.jpg",
  },
  {
    _id: "2",
    title: "Skill Development Workshop - Bangalore",
    type: "video",
    url: "/sample-workshop.mp4",
    date: "December 10, 2024",
    location: "Bangalore",
    tag: "Workshops",
    description: "Participants engaged in hands-on learning during our digital literacy program.",
    duration: "3:45",
    thumbnail: "/sample-workshop.jpg",
  },
  {
    _id: "3",
    title: "Success Story: From Village to Tech Hub",
    type: "video",
    url: "/sample-success.mp4",
    date: "December 5, 2024",
    location: "Mumbai",
    tag: "Success Stories",
    description: "Follow Priya's journey from rural background to becoming a software developer.",
    duration: "4:45",
    thumbnail: "/sample-success.jpg",
  },
  {
    _id: "4",
    type: "image",
    url: "/sample-instagram1.jpg",
    tag: "Photos",
    thumbnail: "/sample-instagram1.jpg",
  },
  {
    _id: "5",
    type: "image",
    url: "/sample-instagram2.jpg",
    tag: "Photos",
    thumbnail: "/sample-instagram2.jpg",
  },
];

const filters = [
  { label: "All Media", icon: <FaPhotoVideo />, value: "" },
  { label: "Photos", icon: <FaCamera />, value: "Photos" },
  { label: "Videos", icon: <FaVideo />, value: "video" },
];

const stats = [
  { value: 5, label: "Years Documented", suffix: "+" },
  { value: 50, label: "Events Covered", suffix: "+" },
  { value: 1000, label: "+ Lives Impacted", suffix: "" },
];

const Media = () => {
  const [activeFilter, setActiveFilter] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const intervalRef = useRef();

  // Typewriter effect for "Gallery"
  useEffect(() => {
    const word = "Gallery";
    let charIndex = 0;
    setDisplayed("");
    setTyping(true);
    intervalRef.current = setInterval(() => {
      setDisplayed(word.slice(0, charIndex + 1));
      charIndex++;
      if (charIndex === word.length) {
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setTyping(false);
        }, 2000);
      }
    }, 150);
    return () => clearInterval(intervalRef.current);
  }, []);

  const filteredMedia = activeFilter
    ? sampleMedia.filter((item) =>
        activeFilter === "video"
          ? item.type === "video"
          : item.tag === activeFilter
      )
    : sampleMedia;

  return (
    <div className="bg-gray-50 font-poppins">
      {/* Hero Section */}
      <div className="relative w-full min-h-[420px] flex items-center justify-center">
        <img
          src="/demo-banner.jpg"
          alt="Media Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent w-1/2" style={{right: 'auto'}} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 py-16">
          <div className="bg-white/90 rounded-full px-5 py-2 mb-4 shadow text-primary text-sm font-semibold mx-auto w-fit">
            Capturing Our Impact
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Media <span className="text-accent inline-block">
              {displayed}
              <span className="border-r-2 border-accent animate-pulse ml-1" style={{display: typing ? 'inline-block' : 'none'}}></span>
            </span>
          </h1>
          <p className="text-white text-lg max-w-2xl mb-6">
            Explore our journey through powerful visuals that showcase the transformative growth and success stories of individuals empowered by SAEIF's programs across India.
          </p>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            <span className="text-white font-medium mr-2">Trending:</span>
            {filters.map((filter) => (
              <button
                key={filter.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:border-white/50 ${activeFilter === filter.value ? "bg-white/40 border-white/50" : ""}`}
                onClick={() => setActiveFilter(activeFilter === filter.value ? "" : filter.value)}
              >
                {filter.icon} {filter.label}
              </button>
            ))}
          </div>
          {/* Animated Stats */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center min-w-[120px]">
                <span className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-base md:text-lg text-white/80 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Stories Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Featured <span className="text-accent">Stories</span>
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Handpicked moments that showcase our most impactful programs and inspiring success stories
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Large video card on the left */}
          <div className="md:col-span-2 lg:col-span-2 bg-white rounded-2xl shadow-lg p-0 flex flex-col overflow-hidden min-h-[340px]">
            <div className="relative w-full h-64 bg-black">
              <img src={sampleMedia[0].thumbnail} alt={sampleMedia[0].title} className="w-full h-full object-cover" />
              <button className="absolute inset-0 flex items-center justify-center text-white text-5xl bg-black/40 hover:bg-black/60 transition">
                <FaPlay />
              </button>
              <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow">{sampleMedia[0].tag}</div>
            </div>
            <div className="p-6 flex flex-col gap-2">
              <h3 className="text-xl font-bold text-primary mb-1">{sampleMedia[0].title}</h3>
              <p className="text-gray-600 mb-2 text-sm">{sampleMedia[0].description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{sampleMedia[0].date}</span>
                <span>•</span>
                <span>{sampleMedia[0].location}</span>
              </div>
            </div>
          </div>
          {/* Smaller cards for other media */}
          {filteredMedia.slice(1).map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-[340px]">
              {item.type === "video" ? (
                <div className="relative w-full h-48 bg-black">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  <button className="absolute inset-0 flex items-center justify-center text-white text-3xl bg-black/40 hover:bg-black/60 transition">
                    <FaPlay />
                  </button>
                  <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow">{item.tag}</div>
                </div>
              ) : (
                <img src={item.thumbnail} alt="Media" className="w-full h-48 object-cover" />
              )}
              {item.type === "video" && (
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h4 className="text-lg font-bold text-primary mb-1">{item.title}</h4>
                  <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Media; 