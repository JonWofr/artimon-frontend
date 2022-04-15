import React from 'react';
import Button from '../button';
import { ReactComponent as GearIcon } from '../../assets/icons/gear-icon.svg';
import ArtimonCard from '../artimon-card';
import Section from '../section';
import { artimons } from '../../assets/raw/artimons';

const Hero = () => {
  const onClickGenerateButton = () => {
    document.getElementById('generation-section')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Section>
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-16">
        <div className="relative w-full max-w-[400px] mx-auto h-72 md:max-w-[500px] md:mx-0 md:order-2 md:h-[500px] md:flex-1 pointer-events-none">
          <ArtimonCard
            artimon={artimons[0]}
            className="absolute w-full max-w-[300px] top-1/2 left-0 -translate-y-[70%] scale-75 origin-bottom-left animate-fist-artimon-card md:scale-100"
          />
          <ArtimonCard
            artimon={artimons[1]}
            className="absolute w-full max-w-[300px] top-1/2 right-0 -translate-y-[55%] scale-75 origin-right animate-second-artimon-card md:scale-100"
          />
          <ArtimonCard
            artimon={artimons[2]}
            className="absolute w-full max-w-[300px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[30%] scale-75 origin-top animate-third-artimon-card md:scale-100"
          />
        </div>
        <div className="text-center flex flex-col items-center md:order-1 md:text-left md:items-start md:flex-1 md:max-w-[600px]">
          <h1 className="text-primary text-5xl font-primary lg:text-6xl lg:leading-tight">
            <span className="font-bold">Generate</span> and{' '}
            <span className="font-bold">mint</span> your own Artimon
          </h1>
          <p className="text-secondary font-secondary mt-4 mb-8 lg:text-xl">
            Create a unique, brand new Artimon with the help of our generative
            AI and mint it as an NFT to show it to the world!
          </p>
          <Button
            label="Generate"
            Icon={GearIcon}
            onClick={onClickGenerateButton}
          ></Button>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
