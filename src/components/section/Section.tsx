import React from 'react';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  backgroundColor?: 'primary' | 'secondary';
};

const Section = ({ children, backgroundColor = 'primary' }: Props) => {
  return (
    <section
      className={classNames({
        'bg-primary': backgroundColor === 'primary',
        'bg-secondary': backgroundColor === 'secondary',
      })}
    >
      <div className="container py-32">{children}</div>
    </section>
  );
};

export default Section;
