import React from 'react';
import { ReactComponent as LogoWithText } from '../../assets/icons/logo-with-text.svg';
import Button from '../button';
import { ReactComponent as KeyIcon } from '../../assets/icons/key-icon.svg';

const Header = () => {
  return (
    <header className="fixed top inset-x-0 z-10 bg-secondary shadow-2xl">
      <nav className="container flex justify-between items-center py-3">
        <LogoWithText />
        <Button
          label="Connect Wallet"
          Icon={KeyIcon}
          type="inverted-secondary"
        />
      </nav>
    </header>
  );
};

export default Header;
