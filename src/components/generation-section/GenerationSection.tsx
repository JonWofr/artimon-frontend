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
import * as tf from '@tensorflow/tfjs';
import * as artimonGenerator from '../../services/artimon-generator';
import { ethers } from 'ethers';
import ArtimonContract from '../../utils/Artimon.json';
import * as ipfsHelper from '../../services/ipfs-helper';

const GenerationSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [generatedArtimon, setGeneratedArtimon] = useState<Artimon>();
  const [generatorModel, setGeneratorModel] = useState<tf.LayersModel>();

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
    try {
      setShouldShowSpinner(true);
      if (!generatedArtimon)
        throw new Error("Can't mint. No Artimon has been generated before.");
      await mintNFT(generatedArtimon);
      nextSlide();
      setIsNextButtonDisabled(false);
    } catch (error) {
      console.log(error);
    } finally {
      setShouldShowSpinner(false);
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const artimonContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ArtimonContract.abi,
      signer
    );

    const transferEventFilter = artimonContract.filters.Transfer(
      ethers.constants.AddressZero
    );
    const mintEvents = await artimonContract.queryFilter(transferEventFilter);
    Promise.all(
      mintEvents.map(
        async (mintEvent) =>
          await artimonContract.tokenURI(mintEvent.args!.tokenId)
      )
    ).then((tokenURIs) => tokenURIs.map((tokenUri) => console.log(tokenUri)));
    return;

    const generatedArtimonAvatarBlob = parseBlob(
      generatedArtimon.avatarUrl,
      'image/png'
    );
    const { cid: avatarCid } = await ipfsHelper.uploadFile(
      generatedArtimonAvatarBlob
    );

    const json = JSON.stringify({
      name: generatedArtimon.name,
      description: generatedArtimon.description,
      image: `ipfs://${avatarCid.toString()}`,
    });

    const jsonBlob = new Blob([json], { type: 'application/json' });
    const { cid: jsonCid } = await ipfsHelper.uploadFile(jsonBlob);

    const nftURI = `ipfs://${jsonCid.toString()}`;
    console.log(`NFT metadata stored at: ${nftURI}`);

    let nftTxn = await artimonContract.makeNFT(nftURI);

    console.log('Mining...please wait.');
    await nftTxn.wait();

    console.log(
      `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
    );
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
