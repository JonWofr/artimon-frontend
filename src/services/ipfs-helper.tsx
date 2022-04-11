import { create, IPFSHTTPClient } from 'ipfs-http-client';

const main = () => {
  initIPFS();
};

let client: IPFSHTTPClient;

const initIPFS = () => {
  // const token = btoa(
  //   `${process.env.REACT_APP_INFURA_PROJECT_ID}:${process.env.REACT_APP_INFURA_PROJECT_SECRET}`
  // );

  // client = create({
  //   host: 'ipfs.infura.io',
  //   port: 5001,
  //   protocol: 'https',
  //   headers: {
  //     authorization: `Basic ${token}`,
  //   },
  // });
  client = create({ url: 'https://ipfs.infura.io:5001/api/v0' });
};

export const uploadFile = async (fileData: Blob) => {
  const result = await client.add(fileData, {
    pin: true,
  });
  return result;
};

export const list = async (path: string) => {
  const items = [];
  for await (const item of client.ls(path)) {
    items.push(item);
  }
  return items;
};

export const getFileContent = async (path: string) => {
  let content = '';
  for await (const chunk of client.cat(path)) {
    content += chunk.toString();
  }
  return content;
};

main();
