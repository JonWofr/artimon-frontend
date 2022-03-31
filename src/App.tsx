import React from 'react';
import ArtidexSection from './components/artidex-section';
import Footer from './components/footer';
import GenerationSection from './components/generation-section';
import Header from './components/header';
import Hero from './components/hero';
import HowItWorksSection from './components/how-it-works-section';

const App = () => {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorksSection />
      <GenerationSection />
      <ArtidexSection />
      <Footer />
    </>
  );
};

export default App;
