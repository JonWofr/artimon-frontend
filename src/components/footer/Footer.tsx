import React from 'react';
import { ReactComponent as LogoWithText } from '../../assets/icons/logo-with-text.svg';

const Footer = () => {
  return (
    <footer className="bg-primary">
      <div className="container">
        <div className="py-32 relative">
          <LogoWithText className="w-40 h-auto mx-auto" />
          <p className="text-xs text-secondary absolute bottom-4 left-1/2 -translate-x-1/2 text-center font-secondary md:left-[initial] md:translate-x-0 md:right-4">
            Designed and developed by{' '}
            <span className="bg-gradient-to-r from-accentFrom to-accentTo bg-clip-text text-transparent font-bold">
              Jonas Wolfram
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
