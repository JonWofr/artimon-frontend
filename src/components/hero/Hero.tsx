import React from 'react';
import Button from '../button';
import { ReactComponent as GearIcon } from '../../assets/icons/gear-icon.svg';
import ArtimonCard from '../artimon-card';
import Section from '../section';
import { artimons } from '../../assets/raw/artimons';

const Hero = () => {
  return (
    <Section>
      <div className="relative max-w-[300px] mx-auto">
        <ArtimonCard
          artimon={artimons[0]}
          className="absolute scale-75 origin-top-right w-full"
        />
        <ArtimonCard
          artimon={artimons[1]}
          className="absolute scale-75 origin-bottom-left w-full"
        />
        <ArtimonCard artimon={artimons[2]} className="relative scale-75" />
      </div>
      <div className="text-center flex flex-col items-center mt-8">
        <h1 className="text-primary text-5xl font-primary">
          <span className="font-bold">Generate</span> and{' '}
          <span className="font-bold">mint</span> your own Artimon
        </h1>
        <p className="text-secondary font-secondary mt-4 mb-8">
          Generate a unique, brandnew Artimon with the help of our generative AI
          and mint it as an NFT to show it to the world!
        </p>
        <Button
          label="Generate"
          Icon={GearIcon}
          onClick={() => {
            console.log('hallo');
          }}
        ></Button>
      </div>
    </Section>
  );
};

export default Hero;
