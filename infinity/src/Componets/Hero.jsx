import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 text-white py-32">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <p className="text-gray-400 tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
          Department of Computer Science Engineering · UCEOU
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1]">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
            INFINITY 2K26
          </span>
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-cyan-300 font-semibold tracking-wide">
          National Level Technical Symposium
        </p>

        <p className="mt-2 text-gray-400 text-base md:text-lg">
          March 12 & 13
        </p>

        <div className="mt-12 flex justify-center gap-6 flex-wrap">

          <button
            onClick={() => navigate("/events")}
            className="px-10 py-3 rounded-full 
            bg-gradient-to-r from-blue-600 to-purple-600
            hover:from-blue-700 hover:to-purple-700
            transition transform hover:scale-[1.03]
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
      </motion.div>

    </section>
  );
};

export default Hero;