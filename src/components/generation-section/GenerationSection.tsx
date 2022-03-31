import React, { useState } from 'react';
import GenerationFirstSlide from '../generation-first-slide';
import GenerationProgressBar from '../generation-progress-bar';
import GenerationSecondSlide from '../generation-second-slide';
import Section from '../section';
import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right-icon.svg';
import Button from '../button';
import { artimons } from '../../assets/raw/artimons';
import Spinner from '../spinner';
import MintingFirstSlide from '../minting-first-slide';
import MintingSecondSlide from '../minting-second-slide';
import ResultSlide from '../result-slide';
import { ReactComponent as RefreshIcon } from '../../assets/icons/refresh-icon.svg';
import classNames from 'classnames';
import { Artimon } from '../../models/Artimon';

const GenerationSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [generatedArtimon, setGeneratedArtimon] = useState<Artimon>();

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
    setIsNextButtonDisabled(false);
    nextSlide();
  };

  const onClickGenerateAgainButton = async () => {
    setIsNextButtonDisabled(true);
    setShouldShowSpinner(true);
    await generateArtimon();
    setShouldShowSpinner(false);
    setIsNextButtonDisabled(false);
  };

  const onClickMintButton = async () => {
    setShouldShowSpinner(true);
    await mintNFT();
    setShouldShowSpinner(false);
    setIsNextButtonDisabled(false);
    nextSlide();
  };

  const onClickNextButton = () => {
    nextSlide();
    setIsNextButtonDisabled(true);
  };

  const onClickRedoButton = () => {
    toSlide(0);
  };

  const generateArtimon = async () => {
    await timeout(2000);
    setGeneratedArtimon(artimons[Math.floor(Math.random() * artimons.length)]);
  };

  const timeout = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const nextSlide = () => {
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const toSlide = (slideIndex: number) => {
    setCurrentSlideIndex(slideIndex);
  };

  const mintNFT = async () => {
    await timeout(2000);
  };

  const slides = [
    <GenerationFirstSlide onClickGenerateButton={onClickGenerateButton} />,
    <>
      {generatedArtimon && (
        <GenerationSecondSlide
          artimon={generatedArtimon}
          onClickGenerateAgainButton={onClickGenerateAgainButton}
        />
      )}
    </>,
    <>
      {generatedArtimon && (
        <MintingFirstSlide
          artimon={generatedArtimon}
          onClickMintButton={onClickMintButton}
        />
      )}
    </>,
    <>
      {generatedArtimon && <MintingSecondSlide artimon={generatedArtimon} />}
    </>,
    <>{generatedArtimon && <ResultSlide artimon={generatedArtimon} />}</>,
  ];

  return (
    <Section>
      <GenerationProgressBar currentLevel={getCurrentLevel()} />
      <div className="relative">
        <div
          className={classNames('transition', {
            'brightness-50 pointer-events-none': shouldShowSpinner,
          })}
        >
          {slides[currentSlideIndex]}
        </div>
        {shouldShowSpinner && (
          <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
      {currentSlideIndex <= 3 ? (
        <Button
          label="Next"
          Icon={ArrowRightIcon}
          className="mx-auto mt-12"
          isDisabled={isNextButtonDisabled}
          onClick={onClickNextButton}
        />
      ) : (
        <Button
          label="Redo"
          Icon={RefreshIcon}
          className="mx-auto mt-12"
          onClick={onClickRedoButton}
        />
      )}
    </Section>
  );
};

export default GenerationSection;
