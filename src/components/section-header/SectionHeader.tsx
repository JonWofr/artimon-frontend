import React from 'react';

type Props = {
  title: string;
  subtitle: string;
};

const SectionHeader = ({ title, subtitle }: Props) => {
  return (
    <header className="font-bold text-center">
      <p className="font-secondary font-bold  text-xs tracking-widest uppercase">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentFrom to-accentTo">
          {subtitle}
        </span>
      </p>
      <h3 className="font-primary  text-4xl text-primary mt-1">{title}</h3>
    </header>
  );
};

export default SectionHeader;
