import { ArtimonType } from '../enums/ArtimonType';

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: [
    {
      trait_type: string;
      value: ArtimonType;
    }
  ];
}
