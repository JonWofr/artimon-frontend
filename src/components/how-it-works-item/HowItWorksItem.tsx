import React from 'react';
import { useInViewOnce } from '../../utils/useInViewOnce';
import classNames from 'classnames';

type Props = {
  title: string;
  description: string;
  iconUrl: string;
};

const HowItWorksItem = ({ title, description, iconUrl }: Props) => {
  const [ref, isVisible] = useInViewOnce();

  return (
    <li
      ref={ref}
      className={classNames(
        'flex items-center gap-8 opacity-0 transition-opacity duration-500',
        {
          'opacity-100': isVisible,
        }
      )}
    >
      <img src={iconUrl} alt="" className="w-16 h-16 object-cover" />
      <div className="flex-1">
        <h3 className="font-primary font-bold text-xl text-primary">{title}</h3>
        <p className="font-secondary text-secondary mt-1">{description}</p>
      </div>
    </li>
  );
};

export default HowItWorksItem;
