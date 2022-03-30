import React from 'react';
import { Artimon } from '../../models/Artimon';
import classNames from 'classnames';
import RainDropIcon from '../../assets/icons/rain-drop-icon.svg';
import FlameIcon from '../../assets/icons/flame-icon.svg';
import LeafIcon from '../../assets/icons/leaf-icon.svg';

interface Props {
  artimon: Artimon;
  className?: string;
}

const ArtimonCard = ({ artimon, className }: Props) => {
  return (
    <article
      className={classNames(
        'p-6 rounded-2xl shadow-md bg-gradient-to-b space-y-3',
        {
          'from-fireFrom to-fireTo': artimon.type === 'fire',
          'from-waterFrom to-waterTo': artimon.type === 'water',
          'from-leafFrom to-leafTo': artimon.type === 'leaf',
        },
        className
      )}
    >
      <header className="flex gap-3">
        <img
          src={artimon.avatarUrl}
          alt=""
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1 self-end">
          <p className="font-secondary font-bold  text-xs tracking-widest uppercase text-secondary">
            {artimon.type}
          </p>
          <h3 className="font-primary font-bold text-xl text-primary underline">
            {artimon.name}
          </h3>
        </div>
        <img
          src={
            { fire: FlameIcon, water: RainDropIcon, leaf: LeafIcon }[
              artimon.type
            ]
          }
          alt=""
          className="w-6 h-6 object-cover"
        />
      </header>
      <p className="font-secondary text-secondary">{artimon.description}</p>
      {artimon.trainer && (
        <p className="font-secondary text-secondary text-xs">
          Trainer:{' '}
          <span className="underline break-all lining-nums">
            {artimon.trainer}
          </span>
        </p>
      )}
    </article>
  );
};

export default ArtimonCard;
