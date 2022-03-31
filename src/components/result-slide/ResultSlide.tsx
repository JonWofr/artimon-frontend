import React from 'react';
import { Artimon } from '../../models/Artimon';
import ArtimonCard from '../artimon-card';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Slide from '../slide';

interface Props {
  artimon: Artimon;
}

const ResultSlide = ({ artimon }: Props) => {
  return (
    <Slide>
      <SectionHeader title="Have a look on OpenSea" subtitle="Result" />
      <SectionBody className="flex flex-col gap-8">
        <div className="max-w-xs mx-auto">
          <ArtimonCard artimon={artimon} />
        </div>
        <div className="space-y-6">
          <p className="text-secondary font-secondary text-center">
            By clicking on the{' '}
            <span className="font-bold">underlined name</span> of any minted
            Artimon the corresponding NFT is shown on OpenSea.
          </p>
          <p className="text-secondary font-secondary text-center">
            By clicking on the{' '}
            <span className="font-bold">trainer address</span> that trainer and
            its Artimons are shown on OpenSea.
          </p>
        </div>
      </SectionBody>
    </Slide>
  );
};

export default ResultSlide;
