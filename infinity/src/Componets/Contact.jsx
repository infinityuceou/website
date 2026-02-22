import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import dept from '../assets/dept.png';
import { Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    feedback: ''
  });

  const [status, setStatus] = useState({
    message: '',
    isError: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Sending...', isError: false });

    try {
      const result = await emailjs.send(
        'service_7fcwm9t',
        'template_w017kga',
        {
          from_email: formData.email,
          message: formData.feedback,
        },
        '-LHwwQdcUgiE6iZ2T'
      );

      if (result.text === 'OK') {
        setStatus({ message: 'Message sent successfully!', isError: false });
        setFormData({ email: '', feedback: '' });
      }
    } catch {
      setStatus({
        message: 'Failed to send message.',
        isError: true
      });
    }
  };

  return (
    <section className="relative z-10 min-h-screen text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Get In Touch
            </span>
          </h1>
          <p className="text-gray-400 mt-4">
            Have questions or suggestions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left Section */}
          <div className="space-y-10">

            <div className="relative overflow-hidden rounded-2xl">
              <img src={dept} alt="Department" className="w-full rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Contact Info Glass Card */}
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl space-y-6">

              <div className="flex items-center gap-4 text-gray-300">
                <Mail className="text-blue-400" size={22} />
                <a
                  href="mailto:infinity@uceou.edu"
                  className="hover:text-blue-400 transition"
                >
                  infinity@uceou.edu
                </a>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <MapPin className="text-blue-400" size={22} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Department+of+Computer+Science+Engineering+UCE+OU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  Department of Computer Science Engineering<br />
                  UCE OU
                </a>
              </div>

            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl">

            <form onSubmit={handleSubmit} className="space-y-8">

              <div>
                <label className="block mb-2 text-gray-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-lg p-4 focus:outline-none focus:border-blue-400 transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-400">Your Message</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-lg p-4 h-40 focus:outline-none focus:border-blue-400 transition"
                  placeholder="Write your message..."
                />
              </div>

              {status.message && (
                <div className={`text-sm ${status.isError ? 'text-red-400' : 'text-green-400'}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 
                           hover:from-blue-600 hover:to-cyan-600 
                           text-white font-semibold py-4 rounded-lg 
                           transition shadow-lg"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;