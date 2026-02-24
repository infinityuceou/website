import React from "react";

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
      description: "A fun, team-based event where participants tackle technical concepts through charades and a rapid-fire tech question round.",
      image: drama_tec,
    },
    {
      id: 2,
      name: "DSA Flag",
      description: "Two teams compete through DSA challenges to capture the most flags before time runs out.",
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
      description: "Predict outputs, debug code, and strengthen problem-solving skills through technical challenges.",
      image: code_quest,
    },
    {
      id: 5,
      name: "Tech Rebus",
      description: "Solve creative image-based technical puzzles that test your logic and tech knowledge.",
      image: tech_rebus,
    },
    {
      id: 6,
      name: "AI Pictionary",
      description: "Draw and compete against an AI Bot to guess the word faster than the machine!",
      image: ai_pictionary,
    },
    {
      id: 7,
      name: "Escape Room",
      description: "Solve technology-themed puzzles and escape before time runs out.",
      image: escape_room,
    },
    {
      id: 8,
      name: "Tech Bingo",
      description: "Traditional Bingo meets computer science through technical clues on a 5×5 grid.",
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
          Discover the curated technical competitions awaiting you at INFINITY 2K26.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-32">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Event Pass Section */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/[0.05] backdrop-blur-xl 
                        border border-blue-500/20 
                        rounded-3xl p-12 text-center
                        shadow-[0_0_40px_rgba(59,130,246,0.15)]">

          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            INFINITY Event Pass
          </h2>

          <p className="text-gray-300 text-lg mb-4">
            Get access to all technical events conducted during INFINITY 2K26.
          </p>

          <p className="text-gray-400 text-sm mb-6">
            *Hackathon registration is separate.
          </p>

          <p className="text-3xl font-semibold text-white mb-8">
            ₹150
          </p>

          <a
            href="https://forms.gle/2JnfS87PfzhzD9RQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 rounded-full
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       transition transform hover:scale-[1.03]
                       text-white font-semibold shadow-xl"
          >
            Register for Event Pass
          </a>

        </div>
      </div>

    </div>
  );
};

export default EventPage;