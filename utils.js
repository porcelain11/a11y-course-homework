export const getRandomInt = (max, min) => Math.floor(Math.random() * (max - min) + min);

export const sortProducts = (products, order) => {
  let result;

  switch (true) {
    case order === 0:
      result = products.sort((a, b) => a.price - b.price);
      break;
    case order === 1:
      result = products.sort((a, b) => b.price - a.price);
      break;
    case order === 2:
      result = products.sort((a, b) => a.likes - b.likes);
      break;
    default:
      result = products;
  }

  return result;
};
