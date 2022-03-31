import React from 'react';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Section from '../section';
import ArtimonCard from '../artimon-card';
import { artimons } from '../../assets/raw/artimons';

const ArtidexSection = () => {
  return (
    <Section backgroundColor="secondary">
      <SectionHeader title="All the Artimons at a glance" subtitle="Artidex" />
      <SectionBody>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          {artimons.map((artimon) => (
            <ArtimonCard key={artimon.name} artimon={artimon} />
          ))}
        </div>
      </SectionBody>
    </Section>
  );
};

export default ArtidexSection;
