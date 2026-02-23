import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/infinity-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/workshop", label: "Workshop" },
    { path: "/gallery", label: "Gallery" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Infinity Logo" />
          <span className="text-lg md:text-xl font-semibold tracking-wide">
            INFINITY 2K26
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative transition duration-300 hover:text-blue-400
                ${isActive(item.path) ? "text-blue-400" : "text-gray-300"}`}
            >
              {item.label}

              {/* Active underline */}
              {isActive(item.path) && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-400 rounded-full"></span>
              )}
            </Link>
          ))}

        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-xl bg-black/80 border-t border-white/10 px-6 py-6 space-y-6 text-gray-300 text-lg">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block transition hover:text-blue-400
                ${isActive(item.path) ? "text-blue-400" : ""}`}
            >
              {item.label}
            </Link>
          ))}

        </div>
      )}
    </nav>
  );
};

export default Navbar;