import React from 'react';
import HowItWorksItemModel from '../../models/HotItWorksItem';
import HowItWorksItem from '../how-it-works-item';
import SectionHeader from '../section-header';
import GearIconAccent from '../../assets/icons/gear-icon-accent.svg';
import PickaxeIcon from '../../assets/icons/pickaxe-icon.svg';
import KeyIcon from '../../assets/icons/key-icon.svg';
import SectionBody from '../section-body';
import Section from '../section';

const items: HowItWorksItemModel[] = [
  {
    title: 'Artimon generation',
    description:
      'Our AI generates a new, previously unseen Artimon in real time with a click of a button.',
    iconUrl: GearIconAccent,
  },
  {
    title: 'NFT minting',
    description:
      "If you're happy with the Artimon our AI generated for you you can mint it as an NFT which brings the Pokémon onto the blockchain where it lives forever.",
    iconUrl: PickaxeIcon,
  },
  {
    title: 'True ownership',
    description:
      'You are the only and true owner of your newly generated and minted Artimon.',
    iconUrl: KeyIcon,
  },
];

const HowItWorksSection = () => {
  return (
    <Section backgroundColor="secondary">
      <SectionHeader title="How it works" subtitle="Technique" />
      <SectionBody>
        <ul className="space-y-8 max-w-screen-md mx-auto">
          {items.map((item, index) => (
            <HowItWorksItem key={index} {...item} />
          ))}
        </ul>
      </SectionBody>
    </Section>
  );
};

export default HowItWorksSection;
