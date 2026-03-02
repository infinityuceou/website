import React, { useState, useEffect, useRef } from "react";

/* IMAGE IMPORTS */

import brochure1 from "../assets/eventsimages/BrochureLaunch1.jpeg";
import brochure5 from "../assets/eventsimages/BrouchureLaunch2.jpeg";
import brochure3 from "../assets/eventsimages/BrochureLaunch3.jpeg";
import brochure4 from "../assets/eventsimages/BrochureLaunch4.jpeg";
import brochure2 from "../assets/eventsimages/BrochureLaunch5.jpeg";
import thumbnail1 from "../assets/eventsimages/Video_thumbnail_brochure.jpeg";

import csi1 from "../assets/eventsimages/csi1.jpg";
import csi2 from "../assets/eventsimages/csi2.jpg";
import csi3 from "../assets/eventsimages/csi3.jpg";
import csi4 from "../assets/eventsimages/csi4.jpg";

import workshop1 from "../assets/eventsimages/workshop1.jpeg";
import workshop2 from "../assets/eventsimages/workshop2.jpeg";
import workshop3 from "../assets/eventsimages/workshop3.jpeg";
import workshop4 from "../assets/eventsimages/workshop4.jpeg";
import workshop5 from "../assets/eventsimages/workshop5.jpeg";

/* Progressive Image */

const ProgressiveImage = ({ src }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`w-full max-h-[75vh] object-contain rounded-lg transition duration-500 ${
        loaded ? "blur-0 scale-100" : "blur-lg scale-105"
      }`}
      alt=""
    />
  );
};

const Timeline = () => {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const today = new Date();

  const events = [

    {
      date: "2026-02-09",
      displayDate: "Feb 9, 2026",
      time: "3:30 PM - 5:30 PM",
      title: "Brochure Launch",
      view: true,
      images: [
        brochure1,
        brochure2,
        brochure3,
        brochure4,
        brochure5,
        {
          type: "video",
          src: "/Videos/Brochure_Launch_event.mp4",
          thumbnail: thumbnail1
        }
      ]
    },

    {
      date: "2026-02-20",
      displayDate: "Feb 20, 2026",
      time: "10:30 AM – 1 PM",
      title: "CSI AI 100K – One Day Technical Session",
      view: true,
      images: [
        csi1,
        csi2,
        csi3,
        csi4,
        {
          type: "video",
          src: "/Videos/csi.mp4",
          thumbnail: csi1
        }
      ]
    },

    {
      date: "2026-03-02",
      displayDate: "March 2 - 3, 2026",
      time: "10:00 AM – 4:00 PM",
      title: "Workshop",
      view: false,
      images: [workshop1, workshop2, workshop3, workshop4, workshop5]
    },

    {
      date: "2026-03-12",
      displayDate: "March 12 - 13, 2026",
      time: "9:00 AM – 6:00 PM",
      title: "Technical Events & Fest Day",
      view: false
    }

  ];

  const openModal = (event) => {
    setSelectedEvent(event);
    setCurrentImage(0);
    setVideoPlaying(false);
  };

  const nextImage = () => {
    setVideoPlaying(false);
    setCurrentImage((prev) => (prev + 1) % selectedEvent.images.length);
  };

  const prevImage = () => {
    setVideoPlaying(false);
    setCurrentImage((prev) =>
      prev === 0 ? selectedEvent.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {

    if (!selectedEvent || videoPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % selectedEvent.images.length);
    }, 3000);

    return () => clearInterval(interval);

  }, [selectedEvent, currentImage, videoPlaying, isHovered]);

  useEffect(() => {

    const handleKey = (e) => {

      if (!selectedEvent) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedEvent(null);

    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);

  }, [selectedEvent, currentImage]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {

    if (touchStartX.current - touchEndX.current > 50) nextImage();
    if (touchEndX.current - touchStartX.current > 50) prevImage();

  };

  return (

    <section className="relative py-28 px-6 text-white">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Event Timeline
          </span>
        </h2>

        <div className="relative">

          <div className="absolute left-[12px] md:left-[14px] top-0 bottom-0 w-[3px]
          bg-gradient-to-b from-blue-400 via-blue-500 to-blue-400
          shadow-[0_0_12px_rgba(59,130,246,0.9)]"></div>

          <div className="space-y-16">

            {events.map((event, index) => {

              const eventDate = new Date(event.date);
              const completed = eventDate < today;

              return (

                <div key={index} className="relative pl-12 md:pl-20">

                  <div className={`absolute left-0 flex items-center justify-center
                  w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all duration-300
                  ${completed
                    ? "bg-blue-500 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)]"
                    : "bg-blue-500/20 border-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                  }`}>

                    {completed && (
                      <svg width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="white" strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}

                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition">

                    <p className="text-white/90">{event.displayDate}</p>
                    <p className="text-white/70 mb-3">{event.time}</p>

                    <div className="flex items-center justify-between">

                      <h3 className="text-xl md:text-2xl font-semibold">
                        {event.title}
                      </h3>

                      {event.view && (
                        <button
                          onClick={() => openModal(event)}
                          className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 rounded-lg transition"
                        >
                          View
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>
      {/* MODAL */}

{selectedEvent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

    <div className="relative max-w-5xl w-full px-6">

      {/* Close Button */}

      <button
        onClick={() => setSelectedEvent(null)}
        className="absolute -top-12 right-6 text-white text-3xl hover:text-gray-300 transition"
      >
        ✕
      </button>

      <div
        className="relative bg-black/60 border border-white/10 rounded-xl p-4 shadow-2xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        {/* SLIDER */}

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >

          {selectedEvent.images.map((item, index) => {

            const isVideo =
              typeof item === "object" && item.type === "video";

            return (

              <div
                key={index}
                className="w-full flex-shrink-0 flex items-center justify-center"
              >

                {isVideo ? (

                  videoPlaying && currentImage === index ? (

                    <video
                      src={item.src}
                      controls
                      autoPlay
                      playsInline
                      className="w-full max-h-[75vh] object-contain rounded-lg"
                    />

                  ) : (

                    <div className="relative">

                      <ProgressiveImage src={item.thumbnail} />

                      <button
                        onClick={() => setVideoPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">

                          <svg width="26" height="26" viewBox="0 0 24 24" fill="black">
                            <path d="M8 5v14l11-7z" />
                          </svg>

                        </div>
                      </button>

                    </div>

                  )

                ) : (

                  <ProgressiveImage src={item} />

                )}

              </div>

            );

          })}

        </div>

        {/* LEFT BUTTON */}

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2
          w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="black" strokeWidth="3" fill="none">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* RIGHT BUTTON */}

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2
          w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="black" strokeWidth="3" fill="none">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

      </div>

      {/* DOTS */}

      <div className="flex justify-center gap-3 mt-4">

        {selectedEvent.images.map((_, index) => (

          <div
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`cursor-pointer rounded-full transition-all
            ${index === currentImage ? "w-3 h-3 bg-white" : "w-3 h-3 bg-white/40"}`}
          />

        ))}

      </div>

    </div>

  </div>
)}

    </section>

  );

};

export default Timeline;