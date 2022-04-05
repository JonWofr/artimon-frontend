import React, { useContext } from "react";
import { ReactComponent as LogoWithText } from "../../assets/icons/logo-with-text.svg";
import Button from "../button";
import { ReactComponent as KeyIcon } from "../../assets/icons/key-icon.svg";
import { Web3Context } from "../../App";

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
            isInstallingMetamask ? "Installing Metamask..." : "Install MetaMask"
          }
          Icon={KeyIcon}
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
          Icon={KeyIcon}
          type="inverted-secondary"
          onClick={onClickChangeChainButton}
        />
      );
    }
    return <p>connected {account}</p>;
  };

  return (
    <header className="fixed top inset-x-0 z-10 bg-secondary shadow-2xl">
      <nav className="container flex justify-between items-center py-3">
        <LogoWithText />
        {hasInitialisedWeb3 && renderHeaderContent()}
      </nav>
    </header>
  );
};

export default Header;
