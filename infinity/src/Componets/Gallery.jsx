import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ✅ New Optimized WebP Images */
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

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getPositionStyles = (index) => {
    const totalItems = images.length;
    const angleDegree = 360 / totalItems;
    const angle = ((index - activeIndex) * angleDegree) % 360;
    const radian = (angle * Math.PI) / 180;

    const radiusX = Math.min(380, windowWidth * 0.35);
    const radiusY = Math.min(220, windowWidth * 0.2);

    const x = Math.sin(radian) * radiusX;
    const z = Math.cos(radian) * radiusY;

    const scale = 0.75 + (0.25 * (z + radiusY) / (radiusY * 2));
    const opacity = 0.4 + (0.6 * (z + radiusY) / (radiusY * 2));

    return {
      transform: `translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
      opacity,
      zIndex: Math.round((z + radiusY) * 100),
    };
  };

  return (
    <section className="relative py-28 px-6 text-white">
      <div className="max-w-7xl mx-auto text-center">

        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Photo Gallery
            </span>
          </h2>
        </div>

        <div
          className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative w-full h-full perspective-1000">
            <div className="absolute inset-0 transform-style-3d flex items-center justify-center">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="absolute transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    ...getPositionStyles(index),
                    width: "420px",
                    height: "280px",
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) ${getPositionStyles(index).transform}`,
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden
                               border border-blue-500/20
                               shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                               hover:shadow-[0_20px_70px_rgba(59,130,246,0.5)]
                               transition-all duration-300"
                  >
                    <img
                      src={image}
                      alt={`Gallery Slide ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2
                       p-4 rounded-full
                       bg-black/60 backdrop-blur-md
                       border border-white/10
                       hover:border-blue-400/50
                       hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
                       transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % images.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2
                       p-4 rounded-full
                       bg-black/60 backdrop-blur-md
                       border border-white/10
                       hover:border-blue-400/50
                       hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
                       transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="mt-20">
          <a
            href="/gallery"
            className="px-8 py-3 rounded-full
                       bg-blue-500 hover:bg-blue-600
                       transition text-white font-medium"
          >
            View Full Gallery
          </a>
        </div>

      </div>
    </section>
  );
};

export default Gallery;