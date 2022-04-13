import { Artimon } from '../../models/Artimon';
import Gerodolon from '../../assets/images/pokemon-1.png';
import Barlow from '../../assets/images/pokemon-2.png';
import Quacksal from '../../assets/images/pokemon-3.png';
import { ArtimonType } from '../../enums/ArtimonType';

export const artimons: Artimon[] = [
  {
    name: 'Gerodolon',
    type: ArtimonType.FIRE,
    description:
      "Gerodolon usually lives in the steppe. Its diet is mostly meat based and it particularly likes to devour small birds. Out of all of Gerodolon's traits the one that stands out the most is that it is extremely hot heated.",
    avatarUrl: Gerodolon,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
    tokenId: '1',
  },
  {
    name: 'Barlow',
    type: ArtimonType.GRASS,
    description:
      "Sorucomer usually lives in the jungle. Its diet is mostly plant based and it particularly likes to devour seeds. Out of all of Sorucomer's traits the one that stands out the most is that it is extremely omnious.",
    avatarUrl: Barlow,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
    tokenId: '2',
  },
  {
    name: 'Quacksal',
    type: ArtimonType.WATER,
    description:
      "Quacksal usually lives in oceans' depths. Its diet is mostly mixed and it particularly likes to devour algae. Out of all of Quacksal's traits the one that stands out the most is that it is extremely mysterious.",
    avatarUrl: Quacksal,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
    tokenId: '3',
  },
];
