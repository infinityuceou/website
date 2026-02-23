import React from "react";
import { Link } from "react-router-dom";

import ai_pictionary from '../assets/Events/ai_pictionary.png'
import code_quest from '../assets/Events/code_quest.png'
import drama_tec from '../assets/Events/drama_tec.png'
import dsa_flag from '../assets/Events/dsa_flag.png'
import escape_room from '../assets/Events/escape_room.png'
import infyhunt from '../assets/Events/infyhunt.png'
import tech_bingo from '../assets/Events/tech_bingo.png'
import tech_rebus from '../assets/Events/tech_rebus.png'

const EventCard = ({ event }) => {
  return (
    <div
      className="group bg-white/[0.04] backdrop-blur-md 
                 border border-white/10 rounded-2xl overflow-hidden
                 transition-all duration-300 hover:scale-[1.02] 
                 hover:border-blue-500/40 shadow-lg"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white mb-3">
          {event.name}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
};

const EventPage = () => {

  const events = [
    {
      id: 1,
      name: "Drama Tec",
      description: "A fun, team-based event where participants tackle technical concepts through charades and rapid-fire tech questions.",
      image: drama_tec,
    },
    {
      id: 2,
      name: "DSA Flag",
      description: "Capture the most flags by solving DSA challenges before time runs out.",
      image: dsa_flag,
    },
    {
      id: 3,
      name: "Infyhunt",
      description: "An exhilarating treasure hunt where quick thinking and teamwork lead to victory.",
      image: infyhunt,
    },
    {
      id: 4,
      name: "Code Quest",
      description: "Test your programming and debugging skills through logic-based competitive rounds.",
      image: code_quest,
    },
    {
      id: 5,
      name: "Tech Rebus",
      description: "Decode image-based puzzles and technical clues using creativity and logic.",
      image: tech_rebus,
    },
    {
      id: 6,
      name: "AI Pictionary",
      description: "Compete against an AI bot to guess drawings before it does.",
      image: ai_pictionary,
    },
    {
      id: 7,
      name: "Escape Room",
      description: "Solve tech-themed puzzles and unlock clues to escape before time runs out.",
      image: escape_room,
    },
    {
      id: 8,
      name: "Tech Bingo",
      description: "A technical spin on bingo with computer science-based clues.",
      image: tech_bingo,
    },
  ];

  return (
    <div className="min-h-screen py-24 px-6 relative z-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-bold text-white mb-4">
          Infinity Events
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Discover the curated competitions and experiences awaiting you at INFINITY 2K26.
        </p>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Infinity Pass Section */}
      <div className="max-w-6xl mx-auto mt-28">

        <div className="bg-white/[0.04] backdrop-blur-md 
                        border border-blue-500/30 rounded-2xl 
                        p-12 text-center
                        shadow-[0_0_40px_rgba(59,130,246,0.15)]">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Infinity Pass
            </span>
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
            Access all technical events at INFINITY 2K26 with one unified pass.
            Designed for participants who want to experience everything.
          </p>

          <p className="text-blue-400 font-semibold text-lg mb-4">
            Price: To Be Announced Soon
          </p>

          <p className="text-gray-500 text-sm">
            Pass registration will open once pricing details are finalized.
          </p>

        </div>
      </div>

    </div>
  );
};

export default EventPage;