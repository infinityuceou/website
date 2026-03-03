import React from "react";

const DocIcon = ({ className = "w-8 h-8 text-white/90" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 13h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 16h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ProblemStatementSection = () => {
  return (
    <section
      aria-labelledby="hackathon-problem-statement"
      className="relative z-10 mb-24 max-w-5xl mx-auto px-6"
      role="region"
    >
      <div>
        <h2 id="hackathon-problem-statement" className="text-4xl md:text-5xl font-bold text-center mb-4 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Hack for Infinity – Problem Statements
          </span>
        </h2>

        <p className="text-center text-gray-300 mb-12">
          6 Problem Statements. 8 Hour Build Sprint. Build tech that makes the world more accessible.
        </p>

        {/* Single Premium Glassmorphism Card */}
        <div className="flex justify-center">
          <article
            role="group"
            aria-label="Hack for Infinity Problem Statements"
            className="relative w-full max-w-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-8 md:p-10 transition-all transform hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] hover:border-white/20"
          >
            {/* PDF Icon & Version Badge */}
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-tr from-blue-600/20 to-purple-600/20 ring-1 ring-white/6">
                <DocIcon className="w-6 h-6 text-cyan-300" />
              </div>
              <div className="flex gap-2">
                <span className="text-xs text-green-300 bg-green-900/20 px-3 py-1 rounded-full font-semibold">v1.0</span>
                <span className="text-xs text-cyan-300 bg-white/5 px-3 py-1 rounded-full">Official</span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              Hack for Infinity
            </h3>
            <p className="text-gray-300 mb-6">
              An 8-hour accessibility-focused hackathon featuring 6 high-impact problem statements and a structured judging framework.
            </p>

            {/* Two Column Layout: Problem Domains & Judging Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Problem Domains */}
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-wide mb-4">Problem Domains</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>PS 01 NeuroInclusive Tech</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>PS 02 Accessible Entertainment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>PS 03 Campus Innovation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>PS 04 AI for Ability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>PS 05 Inclusive Gaming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>PS 06 Build the Accessible Web</span>
                  </li>
                </ul>
              </div>

              {/* Judging Criteria */}
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-wide mb-4">Judging Criteria</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>Impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>Technical Execution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>Awareness & Storytelling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>Inclusive Design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>Creativity</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-6 border-t border-white/5">
              <div className="flex gap-3 w-full sm:w-auto">
                <a
                  href="/infinity_hackathon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  aria-label="View Full Problem Statement in new tab"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View Full Problem Statement
                </a>

                <a
                  href="/infinity_hackathon.pdf"
                  download="infinity_hackathon.pdf"
                  role="button"
                  aria-label="Download Problem Statements PDF"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white/[0.06] border border-white/15 text-gray-200 font-medium hover:bg-white/[0.1] hover:border-white/25 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Download PDF
                </a>
              </div>

              <span className="text-xs text-gray-500">Official Hackathon Document</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatementSection;
