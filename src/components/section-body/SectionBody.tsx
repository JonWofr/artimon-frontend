import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const SectionBody = ({ children }: Props) => {
  return <div className="mt-12">{children}</div>;
};

export default SectionBody;
