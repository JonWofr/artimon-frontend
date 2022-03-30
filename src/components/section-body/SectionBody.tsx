import React from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const SectionBody = ({ children, className }: Props) => {
  return <div className={`mt-12 ${className}`}>{children}</div>;
};

export default SectionBody;
