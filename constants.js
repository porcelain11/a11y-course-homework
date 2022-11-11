import { v4 as uuidv4 } from 'uuid';
import { getRandomInt } from './utils';

export const DEFAULT_SORT_ORDER = 3;

export const productData = new Array(3)
  .fill({})
  .map((i) => ({
    id: uuidv4(),
    imgSrc: 'kitten.png',
    imgAlt: 'Серый котенок на синем коврике',
    productName: 'Коврик для кота',
    price: getRandomInt(50, 150),
    likes: getRandomInt(0, 10),
  }))
  .concat(
    new Array(2).fill({}).map((i) => ({
      id: uuidv4(),
      imgSrc: 'kitten.png',
      imgAlt: 'Серый котенок на синем коврике',
      productName: 'Игрушка для кота',
      price: getRandomInt(50, 150),
      oldPrice: getRandomInt(200, 300),
      likes: getRandomInt(0, 10),
    }))
  );

export const SortOrder = {
  ASC_PRICE: 0,
  DESC_PRICE: 1,
  POPULARITY: 2,
  NO_SORT: 3,
};
