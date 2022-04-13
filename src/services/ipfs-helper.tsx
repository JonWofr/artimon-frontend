import { create, IPFSHTTPClient } from 'ipfs-http-client';

let client: IPFSHTTPClient | undefined;

const main = () => {
  initIPFS();
};

const initIPFS = () => {
  const token = btoa(
    `${process.env.REACT_APP_INFURA_IPFS_PROJECT_ID}:${process.env.REACT_APP_INFURA_IPFS_PROJECT_SECRET}`
  );

  client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: `Basic ${token}`,
    },
  });
};

export const uploadFile = async (fileData: Blob) => {
  if (!client) throw new Error("IPFS client is undefined. Can't upload file!");
  const result = await client.add(fileData, {
    pin: true,
  });
  return result;
};

export const getFileData = async (cid: string) => {
  if (!client)
    throw new Error("IPFS client is undefined. Can't get file data!");
  const chunks = [];
  for await (const chunk of client.cat(cid)) {
    chunks.push(chunk);
  }
  const fileData = new Blob(chunks);
  return fileData;
};

export const parseIPFSURL = (cid: string) => {
  return `ipfs://${cid}`;
};

export const parseIPFSGatewayURL = (cid: string) => {
  return `https://infura-ipfs.io/ipfs/${cid}`;
};

export const parseCid = (IPFSURL: string) => {
  return IPFSURL.substring(7);
};

main();
