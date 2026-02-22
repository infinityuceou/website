import React from 'react'
import Hero from '../Componets/Hero'
import About from '../Componets/About'
import Timer from '../Componets/Timer'
import Tim from '../Componets/Timeline'
import Faculty from '../Componets/Faculty'
import Gal from '../Componets/Gallery'
import ContactPage from '../Componets/Contact'
import PassSection from '../Componets/PassSection'

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* All content sits above global StarsCanvas from App.jsx */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Timer />
        <Tim />
        <Faculty />
        <Gal />
        <ContactPage />
      </div>

    </div>
  )
}

export default Home