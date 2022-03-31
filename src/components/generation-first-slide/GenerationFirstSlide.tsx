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
        title="Generate a brandnew artimon"
        subtitle="Generation"
      />
      <SectionBody className="flex flex-col gap-8">
        <div className="max-w-xs mx-auto brightness-50">
          <ArtimonCard artimon={artimons[0]} />
        </div>
        <div className="space-y-6">
          <p className="text-secondary font-secondary text-center">
            This <span className="font-bold">creates a brandnew Artimon</span>.
            Though be careful it does not yet belong to you. For that you have
            to mint it in the next step.
          </p>
          <Button
            label="Generate"
            Icon={GearIconAccent}
            type="inverted-primary"
            className="mx-auto"
            onClick={onClickGenerateButton}
          />
        </div>
      </SectionBody>
    </Slide>
  );
};

export default GenerationFirstSlide;
