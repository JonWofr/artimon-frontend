import React, { useContext } from 'react';
import ArtimonCard from '../artimon-card';
import Button from '../button';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Slide from '../slide';
import { ReactComponent as PickaxeIcon } from '../../assets/icons/pickaxe-icon.svg';
import { Artimon } from '../../models/Artimon';
import { Web3Context } from '../../App';

interface Props {
  artimon: Artimon;
  onClickMintButton: () => void;
}

const MintingFirstSlide = ({ artimon, onClickMintButton }: Props) => {
  const {
    hasInitialisedWeb3,
    isMobileOrTablet,
    hasMetamask,
    account,
    isRightChain,
  } = useContext(Web3Context);

  const renderNote = () => {
    if (!hasMetamask && !isMobileOrTablet) {
      return 'You need to have MetaMask installed. Click on the button in the header to install MetaMask!';
    }
    if (!hasMetamask && isMobileOrTablet) {
      return "This Dapp only works within the MetaMask app. Click on the button in the header to open the app or initiate installation if you don't have the app yet!";
    }
    if (!account) {
      return 'Your MetaMask wallet has to be connected. Click on the button in the header to connect!';
    }
    if (!isRightChain) {
      return 'You are currently connected to a wrong chain. Click on the button in the header to connect to the right chain!';
    }
  };

  return (
    <Slide>
      <SectionHeader title="Mint the generated Artimon" subtitle="Minting" />
      <SectionBody className="flex flex-col gap-8 md:max-w-screen-md md:mx-auto md:flex-row md:items-center md:gap-12">
        <div className="max-w-xs mx-auto md:max-w-none md:mx-0 md:flex-1">
          <ArtimonCard artimon={artimon} />
        </div>
        <div className="flex flex-col gap-6 items-center md:flex-1 md:items-start">
          <p className="text-secondary font-secondary text-center md:text-left">
            Make {artimon.name} truely{' '}
            <span className="font-bold">yours by minting it</span>. As soon as
            it's minted it lives on the blockchain and you own it.
          </p>
          <div className="flex flex-col gap-2 items-center md:items-start">
            <Button
              label="Mint"
              Icon={PickaxeIcon}
              type="inverted-primary"
              onClick={onClickMintButton}
              isDisabled={
                !(hasInitialisedWeb3 && hasMetamask && account && isRightChain)
              }
            />
            <p className="font-secondary font-bold text-xs text-red-500 text-center md:text-left">
              {hasInitialisedWeb3 && renderNote()}
            </p>
          </div>
        </div>
      </SectionBody>
    </Slide>
  );
};

export default MintingFirstSlide;
