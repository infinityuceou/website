import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Pages/Home'
import Events from './Pages/Events'
import Workshop from './Pages/Live'
import Hackathon from './Pages/Hackathon'
import Gallery from './Pages/GalleryPage'
import WIP from './Pages/WIP'

import Navbar from './Componets/Navbar'
import Foot from './Componets/Footer'
import StarsCanvas from './Componets/StarsCanvas'
import Analytics from './Analytics'
import ScrollToTop from './Componets/ScrollToTop';

const App = () => {
  return (
    <Router>
      
      {/* 🔍 Google Analytics Route Tracker */}
      <Analytics />
      <ScrollToTop />

      <div className="relative bg-black min-h-screen overflow-x-hidden">

        {/* 🌌 Global Stars Background */}
        <StarsCanvas />

        <div className="relative z-10">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/wip" element={<WIP />} />
          </Routes>

          <Foot />
        </div>

      </div>
    </Router>
  )
}

export default App;