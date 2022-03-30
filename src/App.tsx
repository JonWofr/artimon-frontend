import React from 'react';
import ArtidexSection from './components/artidex-section';
import GenerationSection from './components/generation-section';
import Hero from './components/hero';
import HowItWorksSection from './components/how-it-works-section';

const App = () => {
  return (
    <div>
      <Hero />
      <HowItWorksSection />
      <GenerationSection />
      <ArtidexSection />
    </div>
  );
};

export default App;
