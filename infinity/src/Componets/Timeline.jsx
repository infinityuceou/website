import React from "react";

const Timeline = () => {
  const events = [
    {
      date: "Feb 9, 2026",
      time: "3:30 PM - 5:30 PM",
      title: "Brochure Launch",
    },
    {
      date: "March 2 - 3, 2026",
      time: "10:00 AM – 4:00 PM",
      title: "Workshop",
    },
    {
      date: "March 7, 2026",
      time: "9:00 AM – 5:00 PM",
      title: "National Level Hackathon",
    },
    {
      date: "March 12, 2026",
      time: "9:30 AM – 6:00 PM",
      title: "Technical Events & Fest Day",
    },
  ];

  return (
    <section className="relative py-28 px-6 text-white">
      <div className="max-w-4xl mx-auto">

        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Event Timeline
          </span>
        </h2>

        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-white/20"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {events.map((event, index) => (
              <div key={index} className="relative pl-12 md:pl-20">

                {/* Dot */}
                <div className="absolute left-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-400/20 border border-blue-400/50 backdrop-blur-md"></div>

                {/* Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition">

                  <p className="text-sm text-gray-400 mb-1">{event.date}</p>
                  <p className="text-sm text-gray-400 mb-3">{event.time}</p>

                  <h3 className="text-xl md:text-2xl font-semibold">
                    {event.title}
                  </h3>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;
