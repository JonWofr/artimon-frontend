import React from 'react';
import classNames from 'classnames';

interface Props {
  label: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  type?: 'normal' | 'inverted';
  className?: string;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  label,
  Icon,
  type = 'normal',
  className,
  isDisabled = false,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'flex gap-2 items-center py-2 px-6 relative before:absolute before:inset-0 before:rounded-full before:transition',
        {
          'before:bg-gradient-to-r before:from-accentFrom before:to-accentTo':
            type === 'normal',
          'before:bg-[linear-gradient(#262626,_#262626),_linear-gradient(to_right,_#79ACE6,_#79E684)] before:[background-clip:_padding-box,_border-box] before:border before:border-solid before:border-transparent':
            type === 'inverted',
          'before:brightness-[.4]': isDisabled,
          'hover:before:brightness-75': !isDisabled,
        },
        className
      )}
      disabled={isDisabled}
    >
      <Icon className="relative w-5 h-5" />
      <p
        className={classNames(
          'font-primary font-bold tracking-widest leading-normal relative',
          {
            'text-primary': type === 'normal',
            'bg-gradient-to-r from-accentFrom to-accentTo text-transparent bg-clip-text':
              type === 'inverted',
          }
        )}
      >
        {label}
      </p>
    </button>
  );
};

export default Button;
