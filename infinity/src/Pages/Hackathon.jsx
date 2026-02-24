import React from "react";
import { Link } from "react-router-dom";

const Hackathon = () => {
  const timeline = [
    {
      time: "9:00 AM – 9:30 AM",
      title: "Inauguration",
      desc: "Welcome address and official launch."
    },
    {
      time: "9:30 AM – 10:00 AM",
      title: "Problem Statement Briefing",
      desc: "Explanation of domains, rules and evaluation criteria."
    },
    {
      time: "10:00 AM – 1:00 PM",
      title: "Hacking Session – 1",
      desc: "Brainstorming, architecture planning, and development."
    },
    {
      time: "1:00 PM – 1:45 PM",
      title: "Lunch Break",
      desc: "Recharge and prepare for final stretch."
    },
    {
      time: "1:45 PM – 3:30 PM",
      title: "Hacking Session – 2",
      desc: "Feature building, debugging, refinement."
    },
    {
      time: "3:30 PM – 4:00 PM",
      title: "Final Submission",
      desc: "Submit your solution and prepare for demo."
    },
    {
      time: "4:00 PM – 4:45 PM",
      title: "Project Demonstrations",
      desc: "Live demos evaluated by judges."
    },
    {
      time: "4:45 PM – 5:00 PM",
      title: "Prize Distribution",
      desc: "Winners announcement and closing ceremony."
    }
  ];

  return (
    <section className="relative z-10 min-h-screen text-white px-6 py-28">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 text-transparent bg-clip-text">
              INFINITY 2K26 Hackathon
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl text-cyan-300 font-semibold mb-6">
            8-Hour Innovation Sprint
          </h2>

          <div className="flex flex-wrap justify-center gap-8 mt-6 text-gray-300 text-lg">
            <span>📅 March 7</span>
            <span>⏰ 9:00 AM – 5:00 PM</span>
            <span>📍 Department of CSE</span>
          </div>
        </div>

        {/* INFO CARDS — MOVED UP */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">

          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              🚀 Rapid Innovation
            </h3>
            <p className="text-gray-400">
              Build a functional prototype within 8 hours and turn your idea into reality.
            </p>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              🧠 Real-World Challenges
            </h3>
            <p className="text-gray-400">
              Solve impactful technical problems and showcase your logic, creativity and execution.
            </p>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              🤝 Team Collaboration
            </h3>
            <p className="text-gray-400">
              Collaborate with peers, interact with mentors and compete at a national level.
            </p>
          </div>

        </div>

        {/* REGISTRATION STRUCTURE */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-10">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
              👥 Team Registration
            </h3>
            <p className="text-gray-300 mb-3">
              3 Members per Team
            </p>
            <p className="text-3xl font-bold text-white">
              ₹1000 <span className="text-gray-400 text-base">per team</span>
            </p>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-10">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
              🧍 Individual Registration
            </h3>
            <p className="text-gray-300 mb-3">
              Team will be formed at help desk on the event day.
            </p>
            <p className="text-3xl font-bold text-white">
              ₹349 <span className="text-gray-400 text-base">per person</span>
            </p>
          </div>
        </div>

        {/* PRIZE SECTION */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-12 text-center mb-24 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <h3 className="text-4xl font-bold mb-4">
            🏆 Prize Pool
          </h3>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
            ₹25,000
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-16">
            Event Timeline
          </h2>

          <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />

          <div className="space-y-14 pl-16">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-14 top-1 w-6 h-6 
                                bg-blue-500 rounded-full 
                                shadow-[0_0_25px_rgba(59,130,246,0.6)]
                                ring-4 ring-blue-500/20
                                border border-cyan-400" />

                <p className="text-cyan-400 font-semibold text-sm">
                  {item.time}
                </p>

                <h3 className="text-xl font-semibold mt-2 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl font-semibold mb-4">
              Ready to Build Something Big?
            </h3>
            <p className="text-gray-400 mb-8">
              Registrations opening soon. Form your team now.
            </p>
            <Link
              to="/wip"
              className="inline-block px-12 py-4 rounded-full
                         bg-gradient-to-r from-blue-600 to-purple-600
                         hover:from-blue-700 hover:to-purple-700
                         transition transform hover:scale-[1.03]
                         text-white font-semibold shadow-xl"
            >
              Register Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hackathon;