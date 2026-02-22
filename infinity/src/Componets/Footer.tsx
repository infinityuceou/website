import { FC } from 'react';
import InfinityLogoWhite from '../assets/infinity-logo.png';
import LinkedInLogoWhite from '../assets/LinkedInLogoWhite.png';
import InstagramLogoWhite from '../assets/InstagramLogoWhite.png';
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
    <footer className="relative z-10 mt-32 px-6 pb-12 text-white 
                       bg-white/[0.02] backdrop-blur-sm border-t border-white/10">

      <div className="max-w-6xl mx-auto">

        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-12 pt-12">

          {/* LEFT */}
          <div className="space-y-6 text-center md:text-left">
            <img
              src={InfinityLogoWhite}
              alt="Infinity Logo"
              className="h-20 w-auto mx-auto md:mx-0"
            />

            <div>
              <h3 className="text-xl font-semibold tracking-wide">
                INFINITY 2K26
              </h3>

              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                Department of Computer Science & Engineering<br />
                University College of Engineering<br />
                Osmania University
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-between items-center md:items-end text-center md:text-right">

            {/* Contact */}
            <div className="space-y-4">
              <div className="text-gray-400 text-sm space-y-1">
                <p>Nikheth : 9666854509</p>
                <p>Sujay : 7337338499</p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 justify-center md:justify-end">
                <a
                  href="https://www.instagram.com/infinity_uceou?igsh=cTJuNm94dHpwNXpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition duration-300"
                >
                  <img
                    src={InstagramLogoWhite}
                    className="h-6 w-6"
                    alt="Instagram"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/infinity-uceou-41a8943b0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition duration-300"
                >
                  <img
                    src={LinkedInLogoWhite}
                    className="h-6 w-6"
                    alt="LinkedIn"
                  />
                </a>
              </div>
            </div>

            {/* Developed By */}
            <div className="mt-8">
              <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-3">
                Developed By
              </p>

              <div className="flex gap-3 justify-center md:justify-end">
                {teamMembers.map((member) => (
                  <a
                    key={member.id}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-center"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-9 h-9 rounded-full border border-white/10
                                 transition duration-300
                                 group-hover:scale-110 group-hover:border-blue-400"
                    />
                    <p className="text-[10px] text-gray-500 mt-1 opacity-0 
                                 group-hover:opacity-100 transition duration-200">
                      {member.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-12"></div>

        {/* Bottom */}
        <div className="text-center text-xs text-gray-500">
          © 2026 INFINITY — Powered & Secured by CSE Department
        </div>

      </div>
    </footer>
  );
};

export default Footer;