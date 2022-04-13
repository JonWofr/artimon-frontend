import { ethers } from 'ethers';
import { ArtimonType } from '../enums/ArtimonType';
import { ProviderType } from '../enums/ProviderType';
import { Artimon } from '../models/Artimon';
import { NFTMetadata } from '../models/NFTMetadata';
import Contract from '../utils/Artimon.json';
import * as ipfsHelper from './ipfs-helper';

export class ArtimonContractHelper {
  public static readonly CONTRACT_ADDRESS =
    '0xcFAeCe5A49C2AC271bE94a56dee2f311ed3A9307';
  public static readonly NETWORK_ID = 4;

  private contract: ethers.Contract;

  constructor(providerType: ProviderType) {
    switch (providerType) {
      case ProviderType.META_MASK: {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        this.contract = new ethers.Contract(
          ArtimonContractHelper.CONTRACT_ADDRESS,
          Contract.abi,
          signer
        );
        break;
      }
      case ProviderType.INFURA: {
        const provider = new ethers.providers.InfuraProvider(
          ArtimonContractHelper.NETWORK_ID,
          process.env.REACT_APP_INFURA_ETHEREUM_PROJECT_ID
        );
        this.contract = new ethers.Contract(
          ArtimonContractHelper.CONTRACT_ADDRESS,
          Contract.abi,
          provider
        );
        break;
      }
      default: {
        const provider = ethers.providers.getDefaultProvider();
        this.contract = new ethers.Contract(
          ArtimonContractHelper.CONTRACT_ADDRESS,
          Contract.abi,
          provider
        );
      }
    }
  }

  public mintNFT = async (generatedArtimon: Artimon): Promise<Artimon> => {
    const metadataURI = await this.parseMetadataURI(generatedArtimon);
    console.log(`NFT metadata stored at: ${metadataURI}`);

    let nftTxn = await this.contract.makeNFT(metadataURI);

    console.log('Minting...please wait.');
    const txnReceipt = await nftTxn.wait();

    console.log(
      `Minted, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
    );

    const { to, tokenId } = txnReceipt.events[0].args;

    return {
      ...generatedArtimon,
      trainer: to,
      tokenId,
    };
  };

  private parseMetadataURI = async (generatedArtimon: Artimon) => {
    const avatarBlob = this.parseBlob(generatedArtimon.avatarUrl, 'image/png');
    const { cid: avatarCid } = await ipfsHelper.uploadFile(avatarBlob);

    const metadata: NFTMetadata = {
      name: generatedArtimon.name,
      description: generatedArtimon.description,
      image: ipfsHelper.parseIPFSURL(avatarCid.toString()),
      attributes: [
        {
          trait_type: 'Type',
          value: generatedArtimon.type,
        },
      ],
    };

    const metadataJSON = JSON.stringify(metadata);
    const metadataBlob = new Blob([metadataJSON], { type: 'application/json' });
    const { cid: metadataCid } = await ipfsHelper.uploadFile(metadataBlob);

    const metadataURI = ipfsHelper.parseIPFSURL(metadataCid.toString());
    return metadataURI;
  };

  private parseBlob = (dataURL: string, type: string) => {
    const dataString = atob(dataURL.split(',')[1]);
    const bufferView = new Uint8Array(dataString.length);

    for (let i = 0; i < dataString.length; i++) {
      bufferView[i] = dataString.charCodeAt(i);
    }

    return new Blob([bufferView], { type });
  };

  public fetchAllArtimons = async () => {
    const mintEventFilter = this.contract.filters.Transfer(
      ethers.constants.AddressZero
    );
    const mintEvents = await this.contract.queryFilter(mintEventFilter);
    const artimons = await Promise.all(
      mintEvents.map<Promise<Artimon>>(async (mintEvent) => {
        const { tokenId } = mintEvent.args!;
        const [owner, tokenURI] = await Promise.all([
          this.contract.ownerOf(tokenId),
          this.contract.tokenURI(tokenId),
        ]);
        const artimon = await this.parseArtimon(tokenURI);
        return {
          ...artimon,
          trainer: owner,
          tokenId: tokenId.toNumber(),
        };
      })
    );
    return artimons;
  };

  private parseArtimon = async (metadataURI: string): Promise<Artimon> => {
    const metadataBlob = await ipfsHelper.getFileData(
      ipfsHelper.parseCid(metadataURI)
    );
    const metadataJSON = await metadataBlob.text();
    const metadata: NFTMetadata = JSON.parse(metadataJSON);
    return {
      name: metadata.name,
      description: metadata.description,
      avatarUrl: ipfsHelper.parseIPFSGatewayURL(
        ipfsHelper.parseCid(metadata.image)
      ),
      type: metadata.attributes
        ? metadata.attributes[0].value
        : ArtimonType.FIRE,
    };
  };

  onNewArtimon = (callback: (artimon: Artimon) => void) => {
    const mintEventFilter = this.contract.filters.Transfer(
      ethers.constants.AddressZero
    );
    this.contract.on(mintEventFilter, async (_, to, tokenId) => {
      const tokenURI = await this.contract.tokenURI(tokenId);
      const artimon = await this.parseArtimon(tokenURI);
      callback({
        ...artimon,
        trainer: to,
        tokenId: tokenId.toNumber(),
      });
    });
  };
}
