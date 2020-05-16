export const calculateVelocity = ({ velocity, arrowLeft, arrowRight }) => {
  let newVelocity = velocity;
  if (Math.abs(newVelocity) < 0.12) newVelocity = 0;
  if (newVelocity > 0) newVelocity -= 0.12;
  if (newVelocity < 0) newVelocity += 0.12;
  if (arrowLeft) {
    newVelocity -= 0.3;
  }
  if (arrowRight) {
    newVelocity += 0.3;
  }
  return newVelocity;
};
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
