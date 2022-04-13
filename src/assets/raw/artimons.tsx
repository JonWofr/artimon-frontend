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
      'Enim irure magna aliqua voluptate proident. Fugiat aliqua elit nulla cupidatat excepteur ea adipisicing reprehenderit proident. In officia ex adipisicing culpa.',
    avatarUrl: Gerodolon,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
    tokenId: '1',
  },
  {
    name: 'Barlow',
    type: ArtimonType.LEAF,
    description:
      'Incididunt cupidatat nisi exercitation dolor quis. Ipsum aliqua veniam non ut dolor dolore quis culpa minim aute. In labore ad magna minim quis amet in.',
    avatarUrl: Barlow,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
    tokenId: '2',
  },
  {
    name: 'Quacksal',
    type: ArtimonType.WATER,
    description:
      'Non laborum reprehenderit id mollit sit est occaecat. Consequat magna culpa exercitation officia eu. Ex ad ea mollit veniam velit reprehenderit adipisicing.',
    avatarUrl: Quacksal,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
    tokenId: '3',
  },
];
