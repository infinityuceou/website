import React from "react";
import { Link } from "react-router-dom";

const Live = () => {
  return (
    <section className="relative z-10 min-h-screen text-white px-6 py-28">
      <div className="max-w-5xl mx-auto text-center">

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            How Modern AI Actually Works
          </span>
        </h1>

        <p className="text-gray-400 text-lg mb-12">
          And where it is going next
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">📅 Dates</h3>
            <p className="text-gray-400">
              March 2 & 3
            </p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">⏰ Time</h3>
            <p className="text-gray-400">
              10:00 AM – 4:00 PM
            </p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">📍 Venue</h3>
            <p className="text-gray-400">
              Seminar Hall, CSE Department
            </p>
          </div>

        </div>

        {/* Description */}
        <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-10 text-left max-w-4xl mx-auto mb-16">
          <p className="text-gray-300 leading-relaxed mb-6">
            A powerful 2-day hands-on workshop designed to give you a real competitive edge in the AI-driven world.
          </p>

          <p className="text-gray-300 leading-relaxed mb-6">
            Understand how modern AI systems like ChatGPT actually work — from Machine Learning and Transformers to RAG and AI Agents — and learn how to build with them confidently.
          </p>

          <p className="text-gray-300 leading-relaxed">
            This workshop prepares you to think, build, and grow with AI — a skill every future engineer must have.
          </p>
        </div>

        {/* Day Breakdown */}
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-16">

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">
              Day 1
            </h3>
            <ul className="space-y-3 text-gray-300 list-disc pl-5">
              <li>Foundations of Machine Learning</li>
              <li>Transformers & Large Language Models</li>
              <li>How ChatGPT works internally</li>
              <li>RAG Systems explained</li>
            </ul>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left">
            <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
              Day 2
            </h3>
            <ul className="space-y-3 text-gray-300 list-disc pl-5">
              <li>Introduction to AI Agents</li>
              <li>Building Autonomous Systems</li>
              <li>Practical AI App Development</li>
              <li>Future of AI Systems</li>
            </ul>
          </div>

        </div>

        {/* Price + Register Button */}
        <div className="text-center">
          <p className="text-2xl font-semibold text-white mb-6">
            Workshop Fee: ₹899
          </p>

          <Link
            to="/wip"
            className="inline-block px-12 py-4 rounded-full
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       transition transform hover:scale-105
                       text-white font-semibold shadow-xl"
          >
            Register Now
          </Link>

          <p className="text-gray-500 text-sm mt-4">
            Registration will open soon.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Live;