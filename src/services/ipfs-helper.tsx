import * as ipfs from 'ipfs-core';

export const uploadFile = async (fileData: Blob, path: string) => {
  const node = await ipfs.create();
  const result = await node.add({
    path,
    content: fileData,
  });
  return result;
};
