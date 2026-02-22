import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Pages/Home'
import Events from './Pages/Events'
import Gallery from './Pages/GalleryPage'
import Workshop from './Pages/Live'

import Navbar from './Componets/Navbar'
import Foot from './Componets/Footer'
import StarsCanvas from './Componets/StarsCanvas'

const App = () => {
  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">

      {/* Global Star Background */}
      <div className="fixed inset-0 z-0">
        <StarsCanvas />
      </div>

      <div className="relative z-10">
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/workshop" element={<Workshop />} />
          </Routes>

          <Foot />
        </Router>
      </div>

    </div>
  )
}

export default App