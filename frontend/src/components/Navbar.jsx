import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaUser } from "react-icons/fa";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Blog", to: "/blog" },
  { name: "Media", to: "/media" },
  { name: "About", to: "/about" },
  { name: "Contact Us", to: "/contact" },
];

const darkBlue = "#0D2241";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 font-poppins transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg' 
        : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo Left */}
        <div className="flex items-center gap-3 min-w-[220px]">
          <img src="/logo.png" alt="SAEIF Logo" className="w-14 h-14 object-contain" />
          <div className="leading-tight">
            <div className="font-medium text-base text-primary transition-colors duration-300">
              SKILL AID EMPOWER
            </div>
            <div className="font-medium text-base text-primary transition-colors duration-300">
              INDIA FOUNDATION
            </div>
          </div>
        </div>
        {/* Nav Center */}
        <div className="flex-1 flex justify-center">
          <div className="flex gap-8 items-center">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({isActive}) =>
                  `px-2 py-1 rounded font-medium text-base transition-colors duration-300 ${
                    isActive 
                      ? "text-accent" 
                      : "text-primary hover:text-accent"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
        {/* Buttons Right */}
        <div className="flex gap-4 items-center min-w-[220px] justify-end">
          <Link 
            to="/donate" 
            className="flex items-center gap-2 px-7 py-2 rounded-xl font-medium text-base shadow-sm transition-all duration-300 border border-accent text-primary bg-white hover:bg-accent hover:text-white"
          >
            <FaHeart className="text-lg" /> Donate
          </Link>
          <Link 
            to="/login" 
            className="flex items-center gap-2 px-7 py-2 rounded-xl font-medium text-base shadow-sm transition-all duration-300 bg-accent text-white hover:bg-primary"
          >
            <FaUser className="text-lg" /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 