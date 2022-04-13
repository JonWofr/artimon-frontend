import React from 'react';
import { Artimon } from '../../models/Artimon';
import ArtimonCard from '../artimon-card';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Slide from '../slide';

interface Props {
  artimon: Artimon;
}

const ResultSlide = ({ artimon }: Props) => {
  return (
    <Slide>
      <SectionHeader title="Have a look on OpenSea" subtitle="Result" />
      <SectionBody className="flex flex-col gap-8 md:max-w-screen-md md:mx-auto md:flex-row md:items-center md:gap-12">
        <div className="max-w-xs mx-auto md:max-w-none md:mx-0 md:flex-1">
          <ArtimonCard artimon={artimon} />
        </div>
        <div className="text-secondary font-secondary text-center space-y-4 md:flex-1 md:text-left">
          <p>
            By clicking on the{' '}
            <span className="font-bold">underlined name</span> of any minted
            Artimon the corresponding NFT is shown on OpenSea.
          </p>
          <p>
            By clicking on the{' '}
            <span className="font-bold">trainer address</span> that trainer and
            its Artimons are shown on OpenSea.
          </p>
          <p>
            It can take a while until the content is correctly displayed on
            OpenSea. However your Artimon already got an{' '}
            <span className="font-bold">entry inside the Artidex</span> down
            below!
          </p>
        </div>
      </SectionBody>
    </Slide>
  );
};

export default ResultSlide;
