import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ✅ Optimized WebP Images */
import img1 from "../assets/Gallery/SMK03347.webp";
import img2 from "../assets/Gallery/DSC09616.webp";
import img3 from "../assets/Gallery/DSC01643.webp";
import img4 from "../assets/Gallery/SMK03141.webp";
import img5 from "../assets/Gallery/DSC07036.webp";
import img6 from "../assets/Gallery/SMK02936.webp";
import img7 from "../assets/Gallery/SMK02924.webp";
import img8 from "../assets/Gallery/DSC01667.webp";
import img9 from "../assets/Gallery/SMK03342.webp";
import img10 from "../assets/Gallery/DSC09601.webp";
import img11 from "../assets/Gallery/DSC07217.webp";
import img12 from "../assets/Gallery/DSC07323.webp";
import img13 from "../assets/Gallery/DSC07526.webp";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
];

const GalleryPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeModal = () => setActiveIndex(null);

  const next = () =>
    setActiveIndex((prev) => (prev! + 1) % images.length);

  const prev = () =>
    setActiveIndex((prev) => (prev! - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  return (
    <div className="relative z-10 min-h-screen text-white px-6 py-24">

      {/* Title */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Infinity Moments
          </span>
        </h1>
      </div>

      {/* ✅ Clean Grid Layout (Fixes Gap Issue) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              ease: "easeOut"
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative cursor-pointer group overflow-hidden rounded-2xl"
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              loading="lazy"
              className="w-full aspect-video object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition rounded-2xl"></div>
          </motion.div>
        ))}

      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >

            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white hover:text-blue-400 transition"
            >
              <X size={28} />
            </button>

            {/* Left */}
            <button
              onClick={prev}
              className="absolute left-6 text-white hover:text-blue-400 transition"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-h-[85vh] max-w-[90vw] flex flex-col items-center"
            >
              <img
                src={images[activeIndex]}
                alt="Full View"
                className="max-h-[80vh] rounded-xl shadow-[0_20px_80px_rgba(59,130,246,0.4)]"
              />

              <div className="mt-4 text-sm text-gray-400">
                {activeIndex + 1} / {images.length}
              </div>
            </motion.div>

            {/* Right */}
            <button
              onClick={next}
              className="absolute right-6 text-white hover:text-blue-400 transition"
            >
              <ChevronRight size={40} />
            </button>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GalleryPage;