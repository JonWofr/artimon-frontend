import React from 'react';
import { Artimon } from '../../models/Artimon';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import ArtimonCard from '../artimon-card';
import classNames from 'classnames';

interface Props {
  artimon: Artimon;
  className?: string;
}

const FadeInArtimonCard = (props: Props) => {
  const [ref, isVisible] = useInViewOnce();

  return (
    <div
      ref={ref}
      className={classNames('opacity-0 transition-opacity duration-500', {
        'opacity-100': isVisible,
      })}
    >
      <ArtimonCard {...props} />
    </div>
  );
};

export default FadeInArtimonCard;
