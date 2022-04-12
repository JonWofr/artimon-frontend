import React, { useEffect, useState } from 'react';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Section from '../section';
import ArtimonCard from '../artimon-card';
import * as artimonContractHelper from '../../services/artimon-contract-helper';
import { Artimon } from '../../models/Artimon';

const ArtidexSection = () => {
  const [artimons, setArtimons] = useState<Artimon[]>([]);

  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    artimonContractHelper.loadContract();

    const artimons = await artimonContractHelper.fetchAllArtimons();
    setArtimons(artimons);
  };

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
