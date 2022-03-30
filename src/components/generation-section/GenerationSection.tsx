import React, { useState } from 'react';
import GenerationFirstSlide from '../generation-first-slide';
import GenerationProgressBar from '../generation-progress-bar';
import GenerationSecondSlide from '../generation-second-slide';
import Section from '../section';
import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right-icon.svg';
import Button from '../button';
import { artimons } from '../../assets/raw/artimons';
import Spinner from '../spinner';

const GenerationSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const getCurrentLevel = () => {
    if (currentSlideIndex <= 1) {
      return 1;
    } else if (currentSlideIndex <= 3) {
      return 2;
    }
    return 3;
  };

  const onClickGenerateButton = async () => {
    setShouldShowSpinner(true);
    await generateArtimon();
    setShouldShowSpinner(false);
    nextSlide();
    setIsNextButtonDisabled(false);
  };

  const generateArtimon = async () => {
    await timeout(2000);
  };

  const timeout = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const nextSlide = () => {
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const slides = [
    <GenerationFirstSlide onClickGenerateButton={onClickGenerateButton} />,
    <GenerationSecondSlide
      artimon={artimons[1]}
      onClickGenerateAgainButton={onClickGenerateButton}
    />,
  ];

  return (
    <Section>
      <GenerationProgressBar currentLevel={getCurrentLevel()} />
      <div className="relative">
        {slides[currentSlideIndex]}
        {shouldShowSpinner && (
          <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
      <Button
        label="Next"
        Icon={ArrowRightIcon}
        className="mx-auto mt-12"
        isDisabled={isNextButtonDisabled}
      />
    </Section>
  );
};

export default GenerationSection;
