import React, { useEffect, useState, createContext } from 'react';
import ArtidexSection from './components/artidex-section';
import Footer from './components/footer';
import GenerationSection from './components/generation-section';
import Header from './components/header';
import Hero from './components/hero';
import HowItWorksSection from './components/how-it-works-section';
import MetaMaskOnboarding from '@metamask/onboarding';
import { Web3Context as Web3ContextModel } from './models/Web3Context';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const Web3Context = createContext<Web3ContextModel>({
  hasInitialisedWeb3: false,
  hasMetamask: false,
  isInstallingMetamask: false,
  account: undefined,
  isRightChain: false,
  onClickInstallMetamaskButton: () => {},
  onClickConnectWalletButton: () => {},
  onClickChangeChainButton: () => {},
});

const App = () => {
  const [hasInitialisedWeb3, setHasInitialisedWeb3] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isInstallingMetamask, setIsInstallingMetamask] = useState(false);
  const [account, setAccount] = useState(undefined);
  const [isRightChain, setIsRightChain] = useState(false);

  const { ethereum } = window;
  // Rinkeby chain id
  const chainId = '0x4';

  useEffect(() => {
    initWeb3()
      .then(() => setHasInitialisedWeb3(true))
      .catch((error) => console.error(error));
  }, []);

  const initWeb3 = async () => {
    const hasMetamask = isMetamaskInstalled();
    if (!hasMetamask) {
      console.warn('MetaMask is not installed');
      return;
    }
    setHasMetamask(hasMetamask);

    const account = await getConnectedAccount();
    if (!account) {
      console.warn('MetaMask is not connected');
      return;
    }
    setAccount(account);

    const isRightChain = await isConnectedToTheRightChain(chainId);
    if (!isRightChain) {
      console.warn('MetaMask is connected to a wrong chain');
      return;
    }
    setIsRightChain(isRightChain);
  };

  const isMetamaskInstalled = () => {
    return ethereum && ethereum.isMetaMask;
  };

  const getConnectedAccount = async (): Promise<any | undefined> => {
    const accounts: any = await ethereum.request({
      method: 'eth_accounts',
    });
    return accounts.length !== 0 ? accounts[0] : undefined;
  };

  const isConnectedToTheRightChain = async (chainId: string) => {
    let connectedChainId = await ethereum.request({ method: 'eth_chainId' });

    // Rinkeby test network chainId
    return connectedChainId === chainId;
  };

  const onClickInstallMetamaskButton = () => {
    installMetaMask();
  };

  const onClickConnectWalletButton = async () => {
    try {
      const account = await connectAccount();
      setAccount(account);

      const isRightChain = await isConnectedToTheRightChain(chainId);
      setIsRightChain(isRightChain);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickChangeChainButton = async () => {
    try {
      await changeChain(chainId);
      setIsRightChain(true);
    } catch (error) {
      console.error(error);
    }
  };

  const installMetaMask = () => {
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
    setIsInstallingMetamask(true);
  };

  const connectAccount = async () => {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    return (accounts as any)[0];
  };

  const changeChain = async (chainId: string) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if ((error as any).code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId,
              rpcUrls: [
                'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
              ],
            },
          ],
        });
      } else {
        throw error;
      }
    }
  };

  return (
    <Web3Context.Provider
      value={{
        hasInitialisedWeb3,
        hasMetamask,
        isInstallingMetamask,
        account,
        isRightChain,
        onClickInstallMetamaskButton,
        onClickConnectWalletButton,
        onClickChangeChainButton,
      }}
    >
      <Header />
      <Hero />
      <HowItWorksSection />
      <GenerationSection />
      <ArtidexSection />
      <Footer />
    </Web3Context.Provider>
  );
};

export default App;
