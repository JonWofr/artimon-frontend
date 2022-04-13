import React from 'react';
import ArtimonCard from '../artimon-card';
import SectionHeader from '../section-header';
import { artimons } from '../../assets/raw/artimons';
import Button from '../button';
import { ReactComponent as GearIconAccent } from '../../assets/icons/gear-icon-accent.svg';
import SectionBody from '../section-body';
import Slide from '../slide';

interface Props {
  onClickGenerateButton: () => void;
}

const GenerationFirstSlide = ({ onClickGenerateButton }: Props) => {
  return (
    <Slide>
      <SectionHeader
        title="Generate a brand new Artimon"
        subtitle="Generation"
      />
      <SectionBody className="flex flex-col gap-8 md:max-w-screen-md md:mx-auto md:flex-row md:items-center md:gap-12">
        <div className="max-w-xs mx-auto brightness-50 md:max-w-none md:mx-0 md:flex-1 pointer-events-none">
          <ArtimonCard artimon={artimons[0]} />
        </div>
        <div className="flex flex-col gap-6 items-center md:flex-1 md:items-start">
          <p className="text-secondary font-secondary text-center md:text-left">
            This <span className="font-bold">creates a brandnew Artimon</span>.
            Though be careful it does not yet belong to you. For that you have
            to mint it in the next step.
          </p>
          <Button
            label="Generate"
            Icon={GearIconAccent}
            type="inverted-primary"
            onClick={onClickGenerateButton}
          />
        </div>
      </SectionBody>
    </Slide>
  );
};

export default GenerationFirstSlide;
