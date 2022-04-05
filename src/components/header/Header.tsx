import React, { useContext } from 'react';
import { ReactComponent as LogoWithText } from '../../assets/icons/logo-with-text.svg';
import Button from '../button';
import { ReactComponent as KeyIcon } from '../../assets/icons/key-icon.svg';
import { ReactComponent as ReplaceIcon } from '../../assets/icons/replace-icon.svg';
import { ReactComponent as MetaMaskIcon } from '../../assets/icons/metamask-icon.svg';
import { Web3Context } from '../../App';
import * as blockies from 'ethereum-blockies';

const Header = () => {
  const {
    hasInitialisedWeb3,
    hasMetamask,
    isInstallingMetamask,
    isRightChain,
    account,
    onClickInstallMetamaskButton,
    onClickConnectWalletButton,
    onClickChangeChainButton,
  } = useContext(Web3Context);

  const renderHeaderContent = () => {
    if (!hasMetamask) {
      return (
        <Button
          label={
            isInstallingMetamask ? 'Installing Metamask...' : 'Install MetaMask'
          }
          Icon={MetaMaskIcon}
          type="inverted-secondary"
          onClick={onClickInstallMetamaskButton}
          isDisabled={isInstallingMetamask}
        />
      );
    }
    if (!account) {
      return (
        <Button
          label="Connect Wallet"
          Icon={KeyIcon}
          type="inverted-secondary"
          onClick={onClickConnectWalletButton}
        />
      );
    }
    if (!isRightChain) {
      return (
        <Button
          label="Change chain"
          Icon={ReplaceIcon}
          type="inverted-secondary"
          onClick={onClickChangeChainButton}
        />
      );
    }
    const identicon = blockies.create({ seed: account, size: 10 }).toDataURL();
    return (
      <div className="flex items-center gap-4">
        <p className="font-secondary font-bold text-secondary text-xs tracking-widest uppercase leading-none">
          Connected
        </p>
        <img
          src={identicon}
          alt=""
          title={account}
          className="w-10 h-10 rounded-full"
        />
      </div>
    );
  };

  return (
    <header className="fixed top inset-x-0 z-10 bg-secondary shadow-2xl h-16">
      <nav className="container flex justify-between items-center h-full">
        <LogoWithText />
        {hasInitialisedWeb3 && renderHeaderContent()}
      </nav>
    </header>
  );
};

export default Header;
