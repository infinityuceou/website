import React from "react";
import { Link } from "react-router-dom";

const Live = () => {
  return (
    <section className="relative z-10 min-h-screen text-white px-6 py-28">
      <div className="max-w-5xl mx-auto text-center">

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            How Modern AI Actually Works
          </span>
        </h1>

        {/* Elevated Subtitle */}
        <h2 className="text-2xl md:text-3xl font-medium mt-4 mb-12
               text-white/80 tracking-wide">
          And Where It Is Going Next
        </h2>

        {/* Core Value */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-gray-300 text-lg leading-relaxed">
            A powerful 2-day hands-on workshop designed to give you a competitive
            edge in the AI-driven world. Understand Transformers, RAG systems,
            and AI Agents — and learn how to build real AI-powered applications
            with confidence.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20">

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">📅 Dates</h3>
            <p className="text-gray-400">March 2 & 3</p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">⏰ Time</h3>
            <p className="text-gray-400">10:00 AM – 4:00 PM</p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">📍 Venue</h3>
            <p className="text-gray-400">Seminar Hall, CSE Department</p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-md border border-blue-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <h3 className="text-xl font-semibold mb-3">💳 Fee</h3>
            <p className="text-blue-400 font-semibold text-lg">₹899</p>
          </div>

        </div>

        {/* Day Breakdown */}
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-20 text-left">

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">
              Day 1
            </h3>
            <ul className="space-y-3 text-gray-300 list-disc pl-5">
              <li>Foundations of Machine Learning</li>
              <li>Transformers & Large Language Models</li>
              <li>How ChatGPT works internally</li>
              <li>RAG Systems explained</li>
            </ul>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
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

        {/* CTA */}
        <div className="text-center">
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
        </div>

      </div>
    </section>
  );
};

export default Live;