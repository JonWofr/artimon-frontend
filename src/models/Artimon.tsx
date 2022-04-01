import { ArtimonType } from '../enums/ArtimonType';

export interface Artimon {
  name: string;
  type: ArtimonType;
  description: string;
  avatarUrl: string;
  trainer?: string;
}
