import { Artimon } from '../models/Artimon';
import Jabber from 'jabber';
import { ArtimonType } from '../enums/ArtimonType';
import * as tf from '@tensorflow/tfjs';
import * as descriptionData from '../assets/raw/artimon-description-data';

export const generate = async (
  generatorModel: tf.LayersModel
): Promise<Artimon> => {
  const name = generateName();
  const avatar = generateAvatar(generatorModel);
  const meanPixelRGB = calcMeanRGBValue(avatar);
  const type = generateType(meanPixelRGB);
  const description = generateDescription(name, type);
  const avatarURL = parseAvatarURL(avatar);
  return {
    name,
    type,
    description,
    avatarUrl: avatarURL,
  };
};

const generateName = (minLength = 5, maxLength = 10) => {
  let length = randomNumber(maxLength + 1);
  while (length < minLength) {
    length = randomNumber(maxLength + 1);
  }
  const jabber = new Jabber();
  return jabber.createWord(length, true);
};

const randomNumber = (to: number) => {
  return Math.floor(Math.random() * to);
};

const generateDescription = (name: string, type: ArtimonType) => {
  const habitatSentence = `${name} usually lives ${
    descriptionData.habitat[type][randomNumber(5)]
  }.`;
  const dietSentence = `Its diet is mostly ${
    descriptionData.dietType[type]
  } and it particularly likes to devour ${
    descriptionData.diets[type][randomNumber(5)]
  }.`;
  const traitsSentence = `Out of all of ${name}'s traits the one that stands out the most is that it is extremely ${
    descriptionData.traits[type][randomNumber(5)]
  }.`;
  const description = `${habitatSentence} ${dietSentence} ${traitsSentence}`;
  return description;
};

const generateAvatar = (generatorModel: tf.LayersModel) => {
  const prediction = generatorModel.predict(
    tf.randomNormal([1, 100], 0, 1)
  ) as tf.Tensor4D;
  // Result is between -1 and 1 and has to be rescaled and shifted first
  const avatar = tf
    .add<tf.Tensor4D>(
      tf.mul<tf.Tensor4D>(prediction, tf.scalar(127.5)),
      tf.scalar(127.5)
    )
    .toInt();
  return avatar;
};

const calcMeanRGBValue = (avatar: tf.Tensor4D) => {
  const meanRGBValue = tf
    .mean<tf.Tensor2D>(tf.mean<tf.Tensor3D>(avatar, 1), 1)
    .toInt()
    .flatten()
    .arraySync();
  return meanRGBValue;
};

const generateType = (meanRGBValue: number[]): ArtimonType => {
  const predominantChannelIndex = meanRGBValue.indexOf(
    Math.max(...meanRGBValue)
  );
  return Object.values(ArtimonType)[predominantChannelIndex];
};

const parseAvatarURL = (avatar: tf.Tensor4D) => {
  const flattenedAvatar = avatar.flatten().arraySync();
  const width = 64;
  const height = 64;
  const flattenedAvatarWithAlpha = addAlphaChannel(
    flattenedAvatar,
    width,
    height
  );
  const avatarURL = parseDataURL(flattenedAvatarWithAlpha, width, height);
  return avatarURL;
};

const addAlphaChannel = (
  flattenedRGB: number[],
  width: number,
  height: number
) => {
  const flattenedRGBA = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const oldIndex = (y * width + x) * 3;
      // Additional alpha channel must be included
      const newIndex = (y * width + x) * 4;
      flattenedRGBA[newIndex] = flattenedRGB[oldIndex];
      flattenedRGBA[newIndex + 1] = flattenedRGB[oldIndex + 1];
      flattenedRGBA[newIndex + 2] = flattenedRGB[oldIndex + 2];
      flattenedRGBA[newIndex + 3] = 255;
    }
  }
  return flattenedRGBA;
};

const parseDataURL = (data: Uint8Array, width: number, height: number) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) throw new Error('Cannot create 2d canvas context');

  canvas.width = width;
  canvas.height = height;

  const imageData = context.createImageData(width, height);
  imageData.data.set(data);

  context.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
};
