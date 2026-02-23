import React from "react";

const WIP = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 text-white">

      <div className="text-center max-w-2xl animate-fade-in">

        {/* Emoji Tag */}
        <div className="mb-6 text-4xl animate-bounce">
          🚧
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 text-transparent bg-clip-text">
            Building Something Awesome
          </span>
        </h1>

        {/* Fun Description */}
        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          Our devs are probably arguing over pixel-perfect spacing and
          polishing things you didn’t even notice.
        </p>

        <p className="text-gray-400 mb-10">
          Give us a little time — greatness takes a few commits.
        </p>

        {/* Button */}
        <a
          href="/"
          className="inline-block px-8 py-3 rounded-full 
                     bg-gradient-to-r from-blue-600 to-purple-600
                     hover:from-blue-700 hover:to-purple-700
                     transition transform hover:scale-105
                     text-white font-semibold shadow-lg"
        >
          Back to Home
        </a>

      </div>
    </section>
  );
};

export default WIP;