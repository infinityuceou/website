import { FC } from 'react';
import InfinityLogoWhite from '../assets/infinity-logo.png';
import Karan from '../assets/Team/Karan.png';

const teamMembers = [
  {
    id: 1,
    name: "Prabakaran S",
    image: Karan,
    linkedin: "https://www.linkedin.com/in/prabakaran-s-b3aab9164/"
  }
];

const Footer: FC = () => {
  return (
    <footer className="
      relative z-10 mt-40 px-6 pb-16 text-white
      bg-white/[0.04] backdrop-blur-xl
      border-t border-white/10
    ">

      <div className="max-w-6xl mx-auto">

        {/* Center Branding */}
        <div className="text-center space-y-6 pt-12">

          <img
            src={InfinityLogoWhite}
            alt="Infinity Logo"
            className="h-16 w-auto mx-auto opacity-90"
          />

          <h3 className="text-lg font-semibold tracking-wider">
            INFINITY 2K26
          </h3>

          <p className="text-xs text-gray-400 tracking-wide leading-relaxed">
            Department of Computer Science & Engineering<br />
            University College of Engineering, Osmania University
          </p>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-14"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Copyright */}
          <div className="text-xs text-gray-400 text-center md:text-left">
            © 2026 INFINITY — All Rights Reserved
          </div>

          {/* Developer Credit */}
          <div className="flex items-center gap-4">

            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              Developed By
            </p>

            {teamMembers.map((member) => (
              <a
                key={member.id}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border border-white/10
                            transition duration-300
                            group-hover:scale-110 group-hover:border-blue-400"
                />

                <span className="text-sm text-gray-400 transition duration-300
                                group-hover:text-blue-400">
                  {member.name}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;