import { ethers } from 'ethers';
import { ArtimonType } from '../enums/ArtimonType';
import { Artimon } from '../models/Artimon';
import { NFTMetadata } from '../models/NFTMetadata';
import Contract from '../utils/Artimon.json';
import * as ipfsHelper from './ipfs-helper';

export const CONTRACT_ADDRESS = '0x54Ec6EbeAf004Cb0a128725a330b314EE40c775f';
let contract: ethers.Contract | undefined;
let provider: ethers.providers.Web3Provider | undefined;

export const loadContract = () => {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, signer);
};

export const mintNFT = async (generatedArtimon: Artimon): Promise<Artimon> => {
  if (!contract) throw new Error("Can't mint NFT. Contract is undefined!");

  const metadataURI = await parseMetadataURI(generatedArtimon);
  console.log(`NFT metadata stored at: ${metadataURI}`);

  let nftTxn = await contract.makeNFT(metadataURI);

  console.log('Minting...please wait.');
  const txnReceipt = await nftTxn.wait();

  console.log(
    `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
  );

  const { to, tokenId } = txnReceipt.events[0].args;

  return {
    ...generatedArtimon,
    trainer: to,
    tokenId,
  };
};

const parseMetadataURI = async (artimon: Artimon) => {
  const avatarBlob = parseBlob(artimon.avatarUrl, 'image/png');
  const { cid: avatarCid } = await ipfsHelper.uploadFile(avatarBlob);

  const metadata: NFTMetadata = {
    name: artimon.name,
    description: artimon.description,
    image: `ipfs://${avatarCid.toString()}`,
    attributes: [
      {
        trait_type: 'Type',
        value: artimon.type,
      },
    ],
  };

  const metadataJSON = JSON.stringify(metadata);
  const metadataBlob = new Blob([metadataJSON], { type: 'application/json' });
  const { cid: metadataCid } = await ipfsHelper.uploadFile(metadataBlob);

  const metadataURI = `ipfs://${metadataCid.toString()}`;
  return metadataURI;
};

const parseBlob = (dataURL: string, type: string) => {
  const dataString = atob(dataURL.split(',')[1]);
  const bufferView = new Uint8Array(dataString.length);

  for (let i = 0; i < dataString.length; i++) {
    bufferView[i] = dataString.charCodeAt(i);
  }

  return new Blob([bufferView], { type });
};

export const fetchAllArtimons = async () => {
  if (!contract)
    throw new Error("Can't fetch Artimons. Contract is undefined!");

  const mintEventFilter = contract.filters.Transfer(
    ethers.constants.AddressZero
  );
  const mintEvents = await contract.queryFilter(mintEventFilter);
  const artimons = await Promise.all(
    mintEvents.map<Promise<Artimon>>(async (mintEvent) => {
      const { tokenId } = mintEvent.args!;
      const [owner, tokenURI] = await Promise.all([
        contract?.ownerOf(tokenId),
        contract?.tokenURI(tokenId),
      ]);
      const artimon = await parseArtimon(tokenURI);
      return {
        ...artimon,
        trainer: owner,
        tokenId,
      };
    })
  );
  return artimons;
};

const parseArtimon = async (metadataURI: string): Promise<Artimon> => {
  const metadataBlob = await ipfsHelper.getFileData(metadataURI.substring(7));
  const metadataJSON = await metadataBlob.text();
  const metadata: NFTMetadata = JSON.parse(metadataJSON);
  console.log(metadata.image);
  return {
    name: metadata.name,
    description: metadata.description,
    avatarUrl: parseIPFSGatewayURL(metadata.image.substring(7)),
    type: metadata.attributes ? metadata.attributes[0].value : ArtimonType.FIRE,
  };
};

const parseIPFSGatewayURL = (cid: string) => {
  return `https://infura-ipfs.io/ipfs/${cid}`;
};
