import React from 'react';
import { Artimon } from '../../models/Artimon';
import ArtimonCard from '../artimon-card';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Slide from '../slide';

interface Props {
  artimon: Artimon;
}

const MintingSecondSlide = ({ artimon }: Props) => {
  return (
    <Slide>
      <SectionHeader title="Mint the generated Artimon" subtitle="Minting" />
      <SectionBody className="flex flex-col gap-8 md:max-w-screen-md md:mx-auto md:flex-row md:items-center md:gap-12">
        <div className="max-w-xs mx-auto md:max-w-none md:mx-0 md:flex-1">
          <ArtimonCard artimon={artimon} />
        </div>
        <p className="text-secondary font-secondary text-center md:flex-1 md:text-left">
          Hooray, you{' '}
          <span className="font-bold">successfully minted {artimon.name}</span>{' '}
          as an NFT. Everyone in the world can now see that you're its rightful
          trainer.
        </p>
      </SectionBody>
    </Slide>
  );
};

export default MintingSecondSlide;
