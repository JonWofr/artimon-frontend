import React from 'react';
import { artimons } from '../../assets/raw/artimons';
import ArtimonCard from '../artimon-card';
import Button from '../button';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Slide from '../slide';
import { ReactComponent as RefreshIcon } from '../../assets/icons/refresh-icon.svg';
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
      <SectionBody className="flex flex-col gap-8">
        <div className="max-w-xs mx-auto">
          <ArtimonCard artimon={artimon} />
        </div>
        <div className="space-y-6">
          <p className="text-secondary font-secondary text-center">
            Hooray, <span className="font-bold">Solomonan got created!</span>{' '}
            Though be careful it does not yet belong to you. For that you have
            to mint it in the next step. You can also indefinitely repeat the
            generation to get an entirely different Artimon each time.
          </p>
          <Button
            label="Generate again"
            Icon={RefreshIcon}
            type="inverted"
            className="mx-auto"
            onClick={onClickGenerateAgainButton}
          />
        </div>
      </SectionBody>
    </Slide>
  );
};

export default GenerationSecondSlide;