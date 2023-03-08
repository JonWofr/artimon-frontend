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
    opera: any;
  }
}

export const Web3Context = createContext<Web3ContextModel>({
  hasInitialisedWeb3: false,
  isMobileOrTablet: false,
  hasMetamask: false,
  account: undefined,
  isRightChain: false,
  onClickInstallMetamaskButton: () => {},
  onClickConnectWalletButton: () => {},
  onClickChangeChainButton: () => {},
});

const App = () => {
  const [hasInitialisedWeb3, setHasInitialisedWeb3] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [account, setAccount] = useState(undefined);
  const [isRightChain, setIsRightChain] = useState(false);

  const { ethereum } = window;
  // Sepolia chain id
  const chainId = '0xaa36a7';

  useEffect(() => {
    initWeb3()
      .then(() => setHasInitialisedWeb3(true))
      .catch((error) => console.error(error));
    return () => {
      removeEventListeners();
    };
  }, []);

  const initWeb3 = async () => {
    const isMobileOrTablet = checkMobileOrTablet();
    setIsMobileOrTablet(isMobileOrTablet);

    await checkMetaMask(1);
    if (isMetamaskInstalled()) {
      addEventListeners();
    }
  };

  // Code snippet to detect if the device is a phone or tablet from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  const checkMobileOrTablet = () => {
    let isMobileOrTablet = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        isMobileOrTablet = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return isMobileOrTablet;
  };

  const checkMetaMask = async (startLevel: 1 | 2 | 3) => {
    if (startLevel === 1) {
      const hasMetamask = isMetamaskInstalled();
      setHasMetamask(hasMetamask);
      if (!hasMetamask) {
        console.warn('MetaMask is not installed');
        return;
      }
    }

    if (startLevel < 3) {
      const account = await getConnectedAccount();
      setAccount(account);
      if (!account) {
        console.warn('MetaMask is not connected');
        return;
      }
    }

    const isRightChain = await isConnectedToTheRightChain(chainId);
    setIsRightChain(isRightChain);
    if (!isRightChain) {
      console.warn('MetaMask is connected to a wrong chain');
    }
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

    return connectedChainId === chainId;
  };

  const addEventListeners = () => {
    ethereum.on('accountsChanged', onAccountsChanged);
    ethereum.on('chainChanged', onChainChanged);
  };

  const removeEventListeners = () => {
    ethereum.removeListener('accountsChanged', onAccountsChanged);
    ethereum.removeListener('chainChanged', onChainChanged);
  };

  const onAccountsChanged = async () => {
    console.log('accounts changed');
    checkMetaMask(2);
  };

  const onChainChanged = async () => {
    console.log('chain changed');
    checkMetaMask(3);
  };

  const onClickInstallMetamaskButton = () => {
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
  };

  const onClickConnectWalletButton = async () => {
    try {
      await connectAccount();
    } catch (error) {
      console.error(error);
    }
  };

  const onClickChangeChainButton = async () => {
    try {
      await changeChain(chainId);
    } catch (error) {
      console.error(error);
    }
  };

  const connectAccount = async () => {
    await ethereum.request({
      method: 'eth_requestAccounts',
    });
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
              rpcUrls: ['https://sepolia.infura.io/v3/'],
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
        isMobileOrTablet,
        hasMetamask,
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
