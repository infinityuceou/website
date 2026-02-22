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

      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
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
      description: "A fun, team-based event where participants tackle technical concepts through charades and a rapid-fire tech question round. It's all about interactive challenges and collaboration!",
      image: drama_tec,
    },
    {
      id: 2,
      name: "DSA flag",
      description: "The battle is simple – two teams, multiple flags, and DSA challenges! The goal? Capture the most flags before time runs out.",
      image: dsa_flag,
    },
    {
      id: 3,
      name: "Infyhunt",
      description: "An exhilarating treasure hunt where quick thinking and teamwork lead to victory!",
      image: infyhunt,
    },
    {
      id: 4,
      name: "Code quest",
      description: "It is a technical event that tests participants’ programming and debugging skills through two rounds: predicting the output of given code and identifying and fixing errors. It strengthens logical thinking, problem-solving, and practical coding expertise.",
      image: code_quest,
    },
    {
      id: 5,
      name: "Tech rebus",
      description: "It is an interactive technical event that tests participants’ creativity, logical thinking, and technical knowledge through image-based puzzles and logo identification challenges.",
      image: tech_rebus,
    },
    {
      id: 6,
      name: "AI Pictionary",
      description: "Team members will take turns to draw the given word on the board, the remaining players have to compete against an AI Bot to guess what's being drawn. Points are given to the team if they are able to guess before the AI can!",
      image: ai_pictionary,
    },
    {
      id: 7,
      name: "Escape Room",
      description: "An exciting, tech-themed escape room event where participants solve a series of puzzles and challenges based on technology-related questions. Each correct answer unlocks a new clue, guiding them through different scenarios. The participant who successfully answers all questions and escapes is declared the winner.",
      image: escape_room,
    },
    {
      id: 8,
      name: "Tech Bingo",
      description: "It is an individual technical game that combines traditional Bingo with computer science concepts, testing participants’ technical knowledge, speed, and accuracy through a 5×5 grid of technical clues.",
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

    </div>
  );
};

export default EventPage;