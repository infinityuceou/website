import React from "react";

const PassSection = () => {
  return (
    <section className="relative py-28 px-6 z-10">

      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-5xl font-bold text-white mb-6">
          INFINITY Technical Pass
        </h2>

        <p className="text-gray-400 mb-10">
          One pass grants you access to all technical competitions at INFINITY 2K26.
        </p>

        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 
                        rounded-2xl p-12 relative overflow-hidden">

          {/* soft glow layer */}
          <div className="absolute inset-0 bg-gradient-to-r 
                          from-blue-500/5 via-purple-500/5 to-blue-500/5 
                          pointer-events-none" />

          <div className="relative z-10 space-y-6">

            <p className="text-lg text-gray-300">
              ✔ Access to all Technical Events  
            </p>

            <p className="text-lg text-gray-300">
              ✔ Participation Certificate  
            </p>

            <p className="text-lg text-gray-300">
              ✔ Flexible Event Participation  
            </p>

            <p className="text-sm text-gray-500 pt-4">
              * Hackathon registration is separate.
            </p>

            <button className="mt-6 px-10 py-4 rounded-full 
                               bg-gradient-to-r from-blue-600 to-purple-600
                               hover:from-blue-700 hover:to-purple-700
                               text-white font-semibold 
                               transition-transform duration-300 hover:scale-105">
              Get Your Pass
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default PassSection;