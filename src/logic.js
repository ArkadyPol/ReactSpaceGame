export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
export const generateAsteroid = () => {
  const x = randomInteger(20, 1164);
  const y = -200;
  const size = randomInteger(10, 100);
  const vX = randomInteger(-2, 2);
  const vY = randomInteger(4, 10);
  return {
    x,
    y,
    size,
    vX,
    vY,
  };
};
