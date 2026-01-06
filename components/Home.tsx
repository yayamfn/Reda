import React from 'react';
import Navbar from './Layout/Navbar';
import Hero from './Sections/Hero';
import About from './Sections/About';
import Skills from './Sections/Skills';
import Projects from './Sections/Projects';
import Contact from './Sections/Contact';
import Footer from './Layout/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-gray-100 selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;