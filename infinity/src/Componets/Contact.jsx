import React from "react";
import dept from "../assets/dept.png";
import { Mail, MapPin, Phone } from "lucide-react";
import InstagramLogoWhite from "../assets/InstagramLogoWhite.png";
import LinkedInLogoWhite from "../assets/LinkedInLogoWhite.png";

const ContactPage = () => {
  return (
    <section className="relative z-10 py-32 px-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Visit Us
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT — Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-lg opacity-60 group-hover:opacity-90 transition duration-500"></div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img
                src={dept}
                alt="CSE Department"
                className="w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            </div>
          </div>

          {/* RIGHT — Contact Card */}
          <div className="bg-white/[0.03] backdrop-blur-2xl 
                          border border-white/[0.08] 
                          p-12 rounded-3xl 
                          space-y-10">

            {/* Phone */}
            <div className="flex items-start gap-5">
              <Phone className="text-blue-400 mt-1" size={22} />
              <div>
                <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
                  Contact
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Nikheth — 9666854509<br />
                  Sujay — 7337338499
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5">
              <Mail className="text-blue-400 mt-1" size={22} />
              <div>
                <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
                  Email
                </h4>
                <a
                  href="mailto:infinity@uceou.edu"
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  infinity@uceou.edu
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-5">
              <MapPin className="text-blue-400 mt-1" size={22} />
              <div>
                <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
                  Location
                </h4>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Department+of+Computer+Science+Engineering+UCE+OU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  Department of Computer Science Engineering<br />
                  University College of Engineering, Osmania University
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-5">
                Follow Us
              </h4>

              <div className="flex gap-8">
                <a
                  href="https://www.instagram.com/infinity_uceou?igsh=cTJuNm94dHpwNXpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition duration-300"
                >
                  <img src={InstagramLogoWhite} className="h-7 w-7" alt="Instagram" />
                </a>

                <a
                  href="https://www.linkedin.com/in/infinity-uceou-41a8943b0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition duration-300"
                >
                  <img src={LinkedInLogoWhite} className="h-7 w-7" alt="LinkedIn" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;