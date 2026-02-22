import React, { useState } from "react";
import StarsCanvas from "../Componets/StarsCanvas";

const Pass = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    college: "",
    phone: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Razorpay integration will go here
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <StarsCanvas />

      <div className="relative z-10 px-6 py-28 max-w-6xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-28">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            INFINITY Technical Pass
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            One pass. Complete access to the technical experience of INFINITY 2K26.
          </p>

          <p className="text-blue-400 mt-6 tracking-wide">
            12–13 March 2026
          </p>
        </div>

        {/* VALUE SECTION */}
        <div className="text-center space-y-8 mb-32">
          <div className="text-xl text-gray-300">
            ✔ Access to all technical competitions
          </div>

          <div className="text-xl text-gray-300">
            ✔ Official participation certificate
          </div>

          <div className="text-xl text-gray-300">
            ✔ Flexible on-spot event participation
          </div>

          <div className="text-xl text-gray-300">
            ✔ Seamless entry experience
          </div>
        </div>

        {/* PRICE */}
        <div className="text-center mb-28">
          <div className="text-4xl md:text-5xl font-semibold">
            Pricing Announcing Soon
          </div>

          <p className="text-gray-400 mt-4">
            Transparent pricing. No hidden charges.
          </p>
        </div>

        {/* FORM */}
        <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-3xl p-12 shadow-2xl">

          <h2 className="text-2xl font-semibold text-center mb-10">
            Secure Your Pass
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <InputField
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <InputField
              name="college"
              placeholder="College Name"
              value={formData.college}
              onChange={handleChange}
            />

            <InputField
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <InputField
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r
              from-blue-600 to-purple-600
              hover:from-blue-700 hover:to-purple-700
              font-semibold transition-transform hover:scale-105 shadow-lg"
            >
              Proceed to Secure Payment
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">
              🔒 Secure payment powered by Razorpay
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

const InputField = ({ name, placeholder, value, onChange }) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    required
    className="w-full bg-white/[0.05] border border-white/10 
    rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 
    text-white placeholder-gray-400 transition"
    placeholder={placeholder}
  />
);

export default Pass;