import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Slide = ({ children }: Props) => {
  return <div className="mt-14">{children}</div>;
};

export default Slide;
