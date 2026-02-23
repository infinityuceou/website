import React, { useState, useEffect } from "react";

const AnimatedCard = ({ animation, digit }) => (
  <div
    className={`absolute w-full h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl ${animation}`}
  >
    <div className="w-full h-full flex items-center justify-center text-white text-3xl md:text-5xl font-bold">
      {digit}
    </div>
  </div>
);

const StaticCard = ({ position, digit }) => (
  <div
    className={`absolute w-full h-1/2 ${position} bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-3xl md:text-5xl font-bold rounded-xl`}
  >
    {digit}
  </div>
);

const FlipCard = ({ digit, prevDigit }) => {
  return (
    <div className="relative w-12 h-20 md:w-16 md:h-24">
      <StaticCard position="top-0" digit={digit} />
      <StaticCard position="bottom-0" digit={prevDigit} />

      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <AnimatedCard
          animation="animate-flip-top origin-bottom"
          digit={prevDigit}
        />
        <AnimatedCard
          animation="animate-flip-bottom origin-top"
          digit={digit}
        />
      </div>

      <div className="absolute w-full h-px bg-white/20 top-1/2"></div>
    </div>
  );
};

const CountdownSection = ({ label, value, prevValue }) => {
  const digits = value.toString().padStart(2, "0").split("");
  const prevDigits = prevValue.toString().padStart(2, "0").split("");

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {digits.map((digit, index) => (
          <FlipCard
            key={index}
            digit={digit}
            prevDigit={prevDigits[index]}
          />
        ))}
      </div>
      <div className="text-gray-400 text-sm md:text-base tracking-wider">
        {label}
      </div>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [prevTimeLeft, setPrevTimeLeft] = useState(timeLeft);

  const targetDate = new Date("2026-03-12T09:00:00").getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setPrevTimeLeft(prev => prev);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const newTime = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      setTimeLeft(prev => {
        setPrevTimeLeft(prev);
        return newTime;
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []); // ✅ Runs only once

  return (
    <section className="relative py-28 px-6 bg-transparent text-white">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            The Countdown Has Begun
          </span>
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-6">
          <CountdownSection
            label="DAYS"
            value={timeLeft.days}
            prevValue={prevTimeLeft.days}
          />

          <CountdownSection
            label="HOURS"
            value={timeLeft.hours}
            prevValue={prevTimeLeft.hours}
          />

          <CountdownSection
            label="MINUTES"
            value={timeLeft.minutes}
            prevValue={prevTimeLeft.minutes}
          />

          <CountdownSection
            label="SECONDS"
            value={timeLeft.seconds}
            prevValue={prevTimeLeft.seconds}
          />
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;