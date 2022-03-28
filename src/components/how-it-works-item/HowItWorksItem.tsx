import React from 'react';

type Props = {
  title: string;
  description: string;
  iconUrl: string;
};

const HowItWorksItem = ({ title, description, iconUrl }: Props) => {
  return (
    <li className="flex items-center gap-8">
      <img src={iconUrl} alt="" className="w-16 h-16 object-cover" />
      <div className="flex-1">
        <h3 className="font-primary font-bold text-xl text-primary">{title}</h3>
        <p className="font-secondary text-secondary mt-1">{description}</p>
      </div>
    </li>
  );
};

export default HowItWorksItem;
