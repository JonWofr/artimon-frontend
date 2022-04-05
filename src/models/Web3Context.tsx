export interface Web3Context {
  hasInitialisedWeb3: boolean;
  hasMetamask: boolean;
  isInstallingMetamask: boolean;
  isRightChain: boolean;
  account: any;
  onClickInstallMetamaskButton: () => void;
  onClickConnectWalletButton: () => void;
  onClickChangeChainButton: () => void;
}
