import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Pages/Home';
import Events from './Pages/Events';
import Pass from './Pages/Pass';
import Gallery from './Pages/GalleryPage';
import Workshop from './Pages/Live';

import Navbar from './Componets/Navbar';
import Foot from './Componets/Footer';
import StarsCanvas from './Componets/StarsCanvas';
import ScrollToTop from './Componets/ScrollToTop';

const App = () => {
  return (
    <Router>

      {/* Ensures page scroll resets on navigation */}
      <ScrollToTop />

      <div className="relative bg-black min-h-screen overflow-x-hidden">

        {/* Global Star Background */}
        <StarsCanvas />

        {/* Main Content Layer */}
        <div className="relative z-10">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/pass" element={<Pass />} />
          </Routes>

          <Foot />
        </div>

      </div>

    </Router>
  );
};

export default App;