import React from 'react';
import ArtimonCard from '../artimon-card';
import Button from '../button';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Slide from '../slide';
import { ReactComponent as RefreshIconAccent } from '../../assets/icons/refresh-icon-accent.svg';
import { Artimon } from '../../models/Artimon';

interface Props {
  artimon: Artimon;
  onClickGenerateAgainButton: () => void;
}

const GenerationSecondSlide = ({
  artimon,
  onClickGenerateAgainButton,
}: Props) => {
  return (
    <Slide>
      <SectionHeader
        title="Generate a brandnew artimon"
        subtitle="Generation"
      />
      <SectionBody className="flex flex-col gap-8 md:max-w-screen-md md:mx-auto md:flex-row md:items-center md:gap-12">
        <div
          key={artimon.name}
          className="max-w-xs mx-auto animate-fade-in md:max-w-none md:mx-0 md:flex-1"
        >
          <ArtimonCard artimon={artimon} />
        </div>
        <div className="flex flex-col gap-6 items-center md:flex-1 md:items-start">
          <p className="text-secondary font-secondary text-center md:text-left">
            Hooray,{' '}
            <span className="font-bold">{artimon.name} got created!</span>{' '}
            Though be careful it does not yet belong to you. For that you have
            to mint it in the next step. You can also indefinitely repeat the
            generation to get an entirely different Artimon each time.
          </p>
          <Button
            label="Generate again"
            Icon={RefreshIconAccent}
            type="inverted-primary"
            onClick={onClickGenerateAgainButton}
          />
        </div>
      </SectionBody>
    </Slide>
  );
};

export default GenerationSecondSlide;
