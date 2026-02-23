import React, { useState } from "react";

const Live = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const { name, college, phone, email, age } = formData;

    if (!name || !college || !phone || !email || !age) {
      alert("Please fill all details before proceeding.");
      return;
    }

    setLoading(true);

    const sdkLoaded = await loadRazorpay();

    if (!sdkLoaded) {
      alert("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
      });

      const order = await response.json();

      if (!order.id) {
        throw new Error("Order creation failed");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "INFINITY 2K26",
        description: "Agentic AI Workshop",
        order_id: order.id,

        handler: function (response) {
          alert("Payment successful! 🎉");
          console.log("Payment Response:", response);
          console.log("Student Details:", formData);
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <section className="relative z-10 min-h-screen text-white px-6 py-28">
      <div className="max-w-5xl mx-auto text-center">

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            How Modern AI Actually Works
          </span>
        </h1>

        <p className="text-gray-400 text-lg mb-12">
          And where it is going next
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">📅 Dates</h3>
            <p className="text-gray-400">March 2 & 3</p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">⏰ Time</h3>
            <p className="text-gray-400">10:00 AM – 4:00 PM</p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">📍 Venue</h3>
            <p className="text-gray-400">Seminar Hall, CSE Department</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-10 text-left max-w-4xl mx-auto mb-16">
          <p className="text-gray-300 leading-relaxed mb-6">
            A powerful 2-day hands-on workshop designed to give you a real competitive edge
            in the AI-driven world.
          </p>

          <p className="text-gray-300 leading-relaxed mb-6">
            Understand how modern AI systems like ChatGPT actually work —
            from Machine Learning and Transformers to RAG and AI Agents —
            and learn how to build with them confidently.
          </p>

          <p className="text-gray-300 leading-relaxed">
            This workshop prepares you to think, build, and grow with AI —
            a skill every future engineer must have.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-10 max-w-4xl mx-auto mb-16 text-left space-y-6">

          <h3 className="text-2xl font-semibold text-white mb-4 text-center">
            Workshop Registration
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="bg-black/40 border border-white/20 rounded-lg p-4 focus:outline-none focus:border-blue-400"
            />

            <input
              type="text"
              name="college"
              placeholder="College Name"
              onChange={handleChange}
              className="bg-black/40 border border-white/20 rounded-lg p-4 focus:outline-none focus:border-blue-400"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="bg-black/40 border border-white/20 rounded-lg p-4 focus:outline-none focus:border-blue-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="bg-black/40 border border-white/20 rounded-lg p-4 focus:outline-none focus:border-blue-400"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              className="bg-black/40 border border-white/20 rounded-lg p-4 focus:outline-none focus:border-blue-400 md:col-span-2"
            />

          </div>

        </div>

        {/* Price + Button */}
        <div className="text-center">
          <p className="text-2xl font-semibold text-white mb-6">
            Workshop Fee: ₹899
          </p>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="px-10 py-4 rounded-full 
            bg-gradient-to-r from-blue-600 to-purple-600
            hover:from-blue-700 hover:to-purple-700
            transition transform hover:scale-105
            text-white font-semibold shadow-xl"
          >
            {loading ? "Processing..." : "Register Now"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default Live;