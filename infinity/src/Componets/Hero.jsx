import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 text-white">

      <div className="text-center max-w-4xl">

        {/* Small Overline */}
        <p className="text-gray-400 tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
          Department of Computer Science Engineering, UCEOU
        </p>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text">
            INFINITY 2K26
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-gray-300 font-light">
          National Level Technical Symposium
        </p>

        {/* Date */}
        <p className="mt-2 text-gray-400 text-base md:text-lg">
          March 12 & 13
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex justify-center gap-6 flex-wrap">

          <button
            onClick={() => navigate("/events")}
            className="px-10 py-3 rounded-full 
            bg-gradient-to-r from-blue-600 to-purple-600 
            hover:from-blue-700 hover:to-purple-700
            transition transform hover:scale-105
            text-white font-semibold shadow-xl"
          >
            Explore Events
          </button>

          <button
            onClick={() => navigate("/workshop")}
            className="px-10 py-3 rounded-full 
            border border-white/20 
            hover:border-white
            backdrop-blur-md
            transition
            text-white font-medium"
          >
            View Workshop
          </button>

        </div>

      </div>

    </section>
  );
};

export default Hero;