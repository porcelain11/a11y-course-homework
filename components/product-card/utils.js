export const getProperCurrencyMode = (price) => {
  if (typeof price !== 'number') {
    return '';
  }

  const priceStr = price.toString();
  const priceEnd = priceStr[priceStr.length - 1];

  let result;
  switch (true) {
    case Number(priceEnd) === 1:
      result = 'рубль';
      break;
    case Number(priceEnd) === 2:
    case Number(priceEnd) === 3:
    case Number(priceEnd) === 4:
      result = 'рубля';
      break;
    default:
      result = 'рублей';
  }

  return result;
};
