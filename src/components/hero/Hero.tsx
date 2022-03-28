import React from 'react';
import Button from '../button';
import { ReactComponent as GearIcon } from '../../assets/icons/gear-icon.svg';
import ArtimonCard from '../artimon-card';
import { Artimon } from '../../models/Artimon';
import Gerodolon from '../../assets/images/pokemon-1.png';
import Barlow from '../../assets/images/pokemon-2.png';
import Quacksal from '../../assets/images/pokemon-3.png';

const artimons: Artimon[] = [
  {
    name: 'Gerodolon',
    type: 'fire',
    description:
      'Adipisicing ipsum nisi ea voluptate adipisicing ipsum cillum duis. Adipisicing elit aliquip anim occaecat quis do ea consequat nulla cillum minim. Ullamco proident mollit consectetur incididunt non mollit sit ut Lorem ex esse magna Lorem.',
    avatarUrl: Gerodolon,
  },
  {
    name: 'Barlow',
    type: 'leaf',
    description:
      'Quis commodo aute officia deserunt id. Non velit commodo magna labore fugiat incididunt nulla culpa Lorem nisi excepteur do excepteur magna. Non dolor mollit labore sit anim sunt incididunt adipisicing reprehenderit do.',
    avatarUrl: Barlow,
  },
  {
    name: 'Quacksal',
    type: 'water',
    description:
      'Voluptate in Lorem eiusmod enim dolore reprehenderit. In occaecat commodo nulla quis duis ex laborum eu culpa nulla culpa nulla pariatur. Officia aliquip non aliquip amet quis reprehenderit eiusmod incididunt quis voluptate officia qui.',
    avatarUrl: Quacksal,
  },
];

const Hero = () => {
  return (
    <div className="bg-primary h-screen ">
      <div className="container">
        <div className="aspect-square relative">
          <ArtimonCard
            artimon={artimons[0]}
            className="absolute inset-8 -mt-8 -mr-8"
          />
          <ArtimonCard
            artimon={artimons[1]}
            className="absolute inset-8 -mb-8 -ml-8"
          />
          <ArtimonCard artimon={artimons[2]} className="absolute inset-8" />
        </div>
        <div className="text-center flex flex-col items-center">
          <h1 className="text-primary text-5xl font-primary">
            <span className="font-bold">Generate</span> and{' '}
            <span className="font-bold">mint</span> your own Artimon
          </h1>
          <p className="text-secondary font-secondary mt-4 mb-8">
            Generate a unique, brandnew Artimon with the help of our generative
            AI and mint it as an NFT to show it to the world!
          </p>
          <Button
            label="KLicken"
            Icon={GearIcon}
            onClick={() => {
              console.log('hallo');
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
