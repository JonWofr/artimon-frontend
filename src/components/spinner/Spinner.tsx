import React from 'react';
import styles from './Spinner.module.css';

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => {
  return (
    <div className={className}>
      <svg className={styles.spinner} viewBox="0 0 50 50">
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        ></circle>
      </svg>
    </div>
  );
};

export default Spinner;
