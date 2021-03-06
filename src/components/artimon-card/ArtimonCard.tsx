import React from 'react';
import { Artimon } from '../../models/Artimon';
import classNames from 'classnames';
import RainDropIcon from '../../assets/icons/rain-drop-icon.svg';
import FlameIcon from '../../assets/icons/flame-icon.svg';
import LeafIcon from '../../assets/icons/leaf-icon.svg';
import { ArtimonType } from '../../enums/ArtimonType';
import { ArtimonContractHelper } from '../../services/artimon-contract-helper';

interface Props {
  artimon: Artimon;
  className?: string;
}

const ArtimonCard = ({ artimon, className }: Props) => {
  return (
    <article
      className={classNames(
        'p-6 rounded-2xl bg-gradient-to-b space-y-3',
        {
          'from-fireFrom to-fireTo': artimon.type === ArtimonType.FIRE,
          'from-waterFrom to-waterTo': artimon.type === ArtimonType.WATER,
          'from-grassFrom to-grassTo': artimon.type === ArtimonType.GRASS,
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
          {artimon.tokenId ? (
            <a
              className="font-primary font-bold text-xl text-primary underline"
              href={`https://testnets.opensea.io/assets/${ArtimonContractHelper.CONTRACT_ADDRESS}/${artimon.tokenId}`}
              target="_blank"
              rel="noreferrer"
            >
              {artimon.name}
            </a>
          ) : (
            <h3 className="font-primary font-bold text-xl text-primary">
              {artimon.name}
            </h3>
          )}
        </div>
        <img
          src={
            { fire: FlameIcon, water: RainDropIcon, grass: LeafIcon }[
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
          <a
            className="underline break-all lining-nums"
            href={`https://testnets.opensea.io/${artimon.trainer}`}
            target="_blank"
            rel="noreferrer"
          >
            {artimon.trainer}
          </a>
        </p>
      )}
    </article>
  );
};

export default ArtimonCard;
