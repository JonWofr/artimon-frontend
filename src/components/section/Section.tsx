import React from 'react';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  backgroundColor?: 'primary' | 'secondary';
  id?: string;
};

const Section = ({ children, backgroundColor = 'primary', id }: Props) => {
  return (
    <section
      id={id}
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
