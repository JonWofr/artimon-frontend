import React from 'react';
import ArtimonCard from '../artimon-card';
import Button from '../button';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Slide from '../slide';
import { ReactComponent as PickaxeIcon } from '../../assets/icons/pickaxe-icon.svg';
import { Artimon } from '../../models/Artimon';

interface Props {
  artimon: Artimon;
  onClickMintButton: () => void;
}

const MintingFirstSlide = ({ artimon, onClickMintButton }: Props) => {
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
          <Button
            label="Mint"
            Icon={PickaxeIcon}
            type="inverted-primary"
            onClick={onClickMintButton}
          />
        </div>
      </SectionBody>
    </Slide>
  );
};

export default MintingFirstSlide;
