import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 text-white">

      <div
        className={`text-center max-w-4xl transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >

        {/* Overline */}
        <p className="text-gray-400 tracking-[0.35em] uppercase text-xs md:text-sm mb-8">
          Department of Computer Science Engineering · UCEOU
        </p>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text">
            INFINITY 2K26
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-2xl text-gray-300 font-light tracking-wide">
          National Level Technical Symposium
        </p>

        {/* Date */}
        <p className="mt-4 text-gray-400 text-base md:text-lg">
          March 12 & 13, 2026
        </p>

        {/* CTA */}
        <div className="mt-14 flex justify-center gap-8 flex-wrap">

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