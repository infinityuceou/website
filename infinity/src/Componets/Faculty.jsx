import React from "react";
import hod from "../assets/hod.png";
import faculty from "../assets/faculty.png";

const FacultyPage = () => {
  return (
    <section className="relative py-28 px-6 text-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Faculty Mentors
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Guiding INFINITY 2K26 with academic excellence and visionary leadership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">

          {/* HOD CARD */}
          <div className="relative group">
            
            {/* Glow Background */}
            <div className="absolute -inset-2 bg-purple-500/20 blur-2xl opacity-70 group-hover:opacity-100 transition duration-500 rounded-3xl"></div>

            <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] 
                            rounded-2xl p-10 text-center 
                            border border-purple-500/30 
                            shadow-xl transition duration-300">

              <img
                src={hod}
                alt="Prof. K. Shyamala"
                className="w-44 h-44 mx-auto object-cover 
                           rounded-full border-4 border-purple-400/30 mb-8"
              />

              <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                Prof. K. Shyamala
              </h3>

              <p className="text-purple-300 font-medium mb-2">
                Head of the Department
              </p>

              <p className="text-gray-400 italic">
                Professor of Computer Science
              </p>
            </div>
          </div>


          {/* CONVENOR CARD */}
          <div className="relative group">
            
            {/* Glow Background */}
            <div className="absolute -inset-2 bg-blue-500/20 blur-2xl opacity-70 group-hover:opacity-100 transition duration-500 rounded-3xl"></div>

            <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] 
                            rounded-2xl p-10 text-center 
                            border border-blue-500/30 
                            shadow-xl transition duration-300">

              <img
                src={faculty}
                alt="Prof. E. Pragnavi"
                className="w-44 h-44 mx-auto object-cover 
                           rounded-full border-4 border-blue-400/30 mb-8"
              />

              <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                Prof. E. Pragnavi
              </h3>

              <p className="text-blue-300 font-medium mb-2">
                Faculty Convenor
              </p>

              <p className="text-gray-400 italic">
                Associate Professor of Computer Science
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FacultyPage;