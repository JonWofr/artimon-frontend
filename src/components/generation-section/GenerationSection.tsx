import React, { useState, useEffect } from 'react';
import GenerationFirstSlide from '../generation-first-slide';
import GenerationProgressBar from '../generation-progress-bar';
import GenerationSecondSlide from '../generation-second-slide';
import Section from '../section';
import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right-icon.svg';
import Button from '../button';
import Spinner from '../spinner';
import MintingFirstSlide from '../minting-first-slide';
import MintingSecondSlide from '../minting-second-slide';
import ResultSlide from '../result-slide';
import { ReactComponent as RefreshIcon } from '../../assets/icons/refresh-icon.svg';
import classNames from 'classnames';
import { Artimon } from '../../models/Artimon';
import * as artimonGenerator from '../../services/artimon-generator';
import { ArtimonContractHelper } from '../../services/artimon-contract-helper';
import { ProviderType } from '../../enums/ProviderType';

const GenerationSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [generatedArtimon, setGeneratedArtimon] = useState<Artimon>();
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [spinnerNote, setSpinnerNote] = useState('');

  useEffect(() => {
    try {
      onInit();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onInit = async () => {
    try {
      setShouldShowSpinner(true);
      setSpinnerNote('Generator warming up.\nThis might take a while...');
      await artimonGenerator.loadModel();
    } catch (error) {
      console.error(error);
    } finally {
      setShouldShowSpinner(false);
      setSpinnerNote('');
    }
  };

  const getCurrentLevel = () => {
    if (currentSlideIndex <= 1) {
      return 1;
    } else if (currentSlideIndex <= 3) {
      return 2;
    }
    return 3;
  };

  const onClickGenerateButton = async () => {
    await generateArtimon();
    nextSlide();
    setIsNextButtonDisabled(false);
  };

  const onClickGenerateAgainButton = async () => {
    setIsNextButtonDisabled(true);
    await generateArtimon();
    setIsNextButtonDisabled(false);
  };

  const onClickMintButton = async () => {
    try {
      setShouldShowSpinner(true);
      setSpinnerNote('Minting in progress.\nThis might take a while...');
      if (!generatedArtimon)
        throw new Error("Can't mint. No Artimon has been generated before.");
      const artimonContractHelper = new ArtimonContractHelper(
        ProviderType.META_MASK
      );
      const mintedArtimon = await artimonContractHelper.mintNFT(
        generatedArtimon
      );
      setGeneratedArtimon(mintedArtimon);
      nextSlide();
      setIsNextButtonDisabled(false);
    } catch (error) {
      console.error(error);
    } finally {
      setShouldShowSpinner(false);
      setSpinnerNote('');
    }
  };

  const onClickNextButton = () => {
    nextSlide();
    setIsNextButtonDisabled(true);
  };

  const onClickRedoButton = () => {
    toSlide(0);
  };

  const generateArtimon = async () => {
    try {
      setShouldShowSpinner(true);
      const generatedArtimon = await artimonGenerator.generate();
      setGeneratedArtimon(generatedArtimon);
    } catch (error) {
      console.error(error);
    } finally {
      setShouldShowSpinner(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const toSlide = (slideIndex: number) => {
    setCurrentSlideIndex(slideIndex);
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
          <div className="absolute top-1/2 -translate-y-1/2 inset-x-0">
            <Spinner />
            {spinnerNote && (
              <p className="absolute top-full left-1/2 -translate-x-1/2 font-secondary text-secondary whitespace-pre text-center  mt-4">
                {spinnerNote}
              </p>
            )}
          </div>
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
