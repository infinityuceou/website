import React from "react";
import { Calendar, IndianRupee, MapPin, BookOpen, Clock } from "lucide-react";

const WorkshopPage = () => {
  return (
    <div className="relative z-10 min-h-screen text-white px-6 py-24">

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            How Modern AI Actually Works
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 italic">
          And Where It Is Going Next
        </p>
      </div>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20">

        {/* Date */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
          <Calendar className="mx-auto mb-3 text-blue-400" />
          <p className="text-gray-300">March 2 & 3</p>
        </div>

        {/* Time */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
          <Clock className="mx-auto mb-3 text-blue-400" />
          <p className="text-gray-300">10:00 AM – 4:00 PM</p>
        </div>

        {/* Venue */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
          <MapPin className="mx-auto mb-3 text-blue-400" />
          <p className="text-gray-300">Seminar Hall, CSE Dept</p>
        </div>

        {/* Fee */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
          <IndianRupee className="mx-auto mb-3 text-blue-400" />
          <p className="text-gray-300">₹899 Registration Fee</p>
        </div>

      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <p className="text-gray-300 text-lg leading-relaxed">
          A powerful 2-day hands-on workshop designed to give you a real competitive edge in the AI-driven world.
          <br /><br />
          Understand how modern AI systems like ChatGPT actually work — from Machine Learning and Neural Networks to Transformers, Large Language Models, RAG systems, and AI Agents.
          <br /><br />
          This workshop prepares you to think, build, and grow with AI — a skill every future engineer must have.
        </p>
      </div>

      {/* Day Breakdown */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Day 1 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">
              Day 1 — Foundations of Modern AI
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Evolution of Machine Learning
              </li>
              <li className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Neural Networks & Transformers
              </li>
              <li className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                How Large Language Models Work
              </li>
            </ul>
          </div>

          {/* Day 2 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">
              Day 2 — The Future of AI Systems
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Retrieval-Augmented Generation (RAG)
              </li>
              <li className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                AI Agents & Autonomous Systems
              </li>
              <li className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Building Your First AI-Powered Application
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkshopPage;