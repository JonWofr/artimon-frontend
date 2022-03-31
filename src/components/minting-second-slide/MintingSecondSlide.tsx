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
      <SectionBody className="flex flex-col gap-8">
        <div className="max-w-xs mx-auto">
          <ArtimonCard artimon={artimon} />
        </div>
        <p className="text-secondary font-secondary text-center">
          Hooray, you{' '}
          <span className="font-bold">successfully minted {artimon.name}</span>{' '}
          as an NFT. Everyone in the world can now see that you're it's rightful
          trainer.
        </p>
      </SectionBody>
    </Slide>
  );
};

export default MintingSecondSlide;
