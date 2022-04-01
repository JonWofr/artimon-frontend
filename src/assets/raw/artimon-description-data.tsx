import { ArtimonType } from '../../enums/ArtimonType';

export const habitat = {
  [ArtimonType.FIRE]: [
    'on vulcanos',
    'in burned forests',
    'in deserts',
    "near the Earth's core",
    'in the steppe',
  ],
  [ArtimonType.LEAF]: [
    'in forests',
    'in the jungle',
    'in tall grass',
    'near mammoth trees',
    'in treetops',
  ],
  [ArtimonType.WATER]: [
    'in swamps',
    'in lakes',
    "in oceans' shallows",
    'in ponds',
    "in oceans' depths",
  ],
};

export const dietType = {
  [ArtimonType.FIRE]: 'meat based',
  [ArtimonType.LEAF]: 'plant based',
  [ArtimonType.WATER]: 'mixed',
};

export const diets = {
  [ArtimonType.FIRE]: [
    'small mammals',
    'critters',
    'insects',
    'small birds',
    'small reptiles',
  ],
  [ArtimonType.LEAF]: ['nuts', 'seeds', 'roots', 'leafes', 'petals'],
  [ArtimonType.WATER]: [
    'plankton',
    'seaweed',
    'algae',
    'shellfish',
    'small fish',
  ],
};

export const traits = {
  [ArtimonType.FIRE]: [
    'brave',
    'hot heated',
    'strong',
    'short sighted',
    'dumb',
  ],
  [ArtimonType.LEAF]: ['slow', 'wise', 'trustworthy', 'reliable', 'omnious'],
  [ArtimonType.WATER]: [
    'intelligent',
    'cheeky',
    'swift',
    'mysterious',
    'envious',
  ],
};
