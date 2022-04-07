import React, { useState, useEffect, useContext } from 'react';
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
import * as tf from '@tensorflow/tfjs';
import * as artimonGenerator from '../../services/artimon-generator';
import { ethers } from 'ethers';
import { Web3Context } from '../../App';
import ArtimonContract from '../../utils/Artimon.json';
import * as ipfsHelper from '../../services/ipfs-helper';

const GenerationSection = () => {
  const {
    hasInitialisedWeb3,
    hasMetamask,
    isInstallingMetamask,
    account,
    isRightChain,
  } = useContext(Web3Context);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [generatedArtimon, setGeneratedArtimon] = useState<Artimon>();
  const [generatorModel, setGeneratorModel] = useState<tf.LayersModel>();
  const [artimonBlob, setArtimonBlob] = useState<Blob>();

  const CONTRACT_ADDRESS = '0x5F492f4D8b09AADeA7a2Ca841fFd37E8518d10e7';

  useEffect(() => {
    try {
      loadGeneratorModel();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadGeneratorModel = async () => {
    setShouldShowSpinner(true);
    const generatorModel = await tf.loadLayersModel(
      '/assets/generator-model/model.json'
    );
    setGeneratorModel(generatorModel);
    setShouldShowSpinner(false);
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
    if (!generatedArtimon) return;
    setShouldShowSpinner(true);
    await mintNFT(generatedArtimon);
    setShouldShowSpinner(false);
    nextSlide();
    setIsNextButtonDisabled(false);
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
      if (!generatorModel)
        throw new Error(
          "Can't generate Artimon. Generator model is undefined."
        );
      const generatedArtimon = await artimonGenerator.generate(generatorModel);
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

  const mintNFT = async (generatedArtimon: Artimon) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const artimonContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ArtimonContract.abi,
        signer
      );

      const generatedArtimonAvatarBlob = parseBlob(
        generatedArtimon.avatarUrl,
        'image/png'
      );
      const result = await ipfsHelper.uploadFile(
        generatedArtimonAvatarBlob,
        `${generatedArtimon.name}.png`
      );
      console.log({ ...result, cid: result.cid.toString() });

      // const json = JSON.stringify({
      //   name: generatedArtimon.name,
      //   description: generatedArtimon.description,
      //   image:
      // });
      // const encodedJson = btoa(json);

      // const tokenURI = `data:application/json;base64,${encodedJson}`;
      // let nftTxn = await artimonContract.makeNFT(tokenURI);

      // console.log('Mining...please wait.');
      // await nftTxn.wait();

      // console.log(
      //   `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
      // );
    } catch (error) {
      console.log(error);
    }
  };

  const parseBlob = (dataURL: string, type: string) => {
    const dataString = atob(dataURL.split(',')[1]);
    const bufferView = new Uint8Array(dataString.length);

    for (let i = 0; i < dataString.length; i++) {
      bufferView[i] = dataString.charCodeAt(i);
    }

    return new Blob([bufferView], { type });
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
