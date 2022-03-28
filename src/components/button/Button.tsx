import React from 'react';
import styles from './Button.module.css';

interface Props {
  label: string;
  Icon: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ label, Icon, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full flex gap-2 items-center py-2 px-6 ${styles.button}`}
    >
      <Icon />
      <p className="text-primary font-primary font-bold tracking-widest leading-normal">
        {label}
      </p>
    </button>
  );
};

export default Button;
