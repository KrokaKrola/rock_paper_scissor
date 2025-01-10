const getRandomInt = (min: number, max: number): number => {
  if (min > max) {
    throw new Error('The min value must be less than or equal to the max value.');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getRandomInt };
