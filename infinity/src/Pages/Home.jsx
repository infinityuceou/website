import React from 'react';

import Hero from '../Componets/Hero';
import About from '../Componets/About';
import Timer from '../Componets/Timer';
import Tim from '../Componets/Timeline';
import Faculty from '../Componets/Faculty';
import Gal from '../Componets/Gallery';
import ContactPage from '../Componets/Contact';
import FadeInSection from '../Componets/FadeInSection';

const Home = () => {
  return (
    <div className="relative">

      {/* Hero stays immediate (no fade wrapper) */}
      <Hero />

      {/* Smooth reveal sections */}
      <FadeInSection>
        <About />
      </FadeInSection>

      <FadeInSection>
        <Timer />
      </FadeInSection>

      <FadeInSection>
        <Tim />
      </FadeInSection>

      <FadeInSection>
        <Faculty />
      </FadeInSection>

      <FadeInSection>
        <Gal />
      </FadeInSection>

      <FadeInSection>
        <ContactPage />
      </FadeInSection>

    </div>
  );
};

export default Home;