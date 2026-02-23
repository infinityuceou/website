import React from "react";
import Logo from "../assets/infinity-logo.png";

const About = () => {
  return (
    <section className="relative py-24 px-6 bg-transparent">

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="text-gray-400">ABOUT</span>{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            INFINITY
          </span>
        </h2>

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img 
            src={Logo}
            alt="Infinity Symposium Logo"
            className="w-48 md:w-64 lg:w-72 object-contain 
                       drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          />
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-6">
          INFINITY is the national-level technical symposium organized by the
          Department of Computer Science & Engineering, bringing together
          innovation, creativity, and competitive spirit under one platform.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-14">
          Join us on March 12 & 13 for two days of dynamic competitions,
          technical excellence, collaboration, and an unforgettable campus experience.
        </p>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl py-6">
            <p className="text-sm text-gray-400">Date</p>
            <p className="text-xl font-semibold">March 12–13, 2026</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl py-6">
            <p className="text-sm text-gray-400">Venue</p>
            <p className="text-xl font-semibold">Dept. of CSE</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl py-6">
            <p className="text-sm text-gray-400">Events</p>
            <p className="text-xl font-semibold">Technical & Fun</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl py-6">
            <p className="text-sm text-gray-400">Duration</p>
            <p className="text-xl font-semibold">2 Days</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
