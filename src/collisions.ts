import { Dispatch } from 'redux';
import { Asteroid } from './types';
import { destroyAsteroid, damageRocket } from './redux/actions';

type Circle = [number, number, number];
type Rectangle = [number, number, number, number];

const findSquareDistance = (
  x: number,
  y: number,
  x2: number,
  y2: number
): number => {
  const dx = x - x2;
  const dy = y - y2;
  const sqDistance = dx * dx + dy * dy;
  return sqDistance;
};

export const collisionCircles = (
  [x, y, r]: Circle,
  [x2, y2, r2]: Circle
): boolean => {
  const sqDistance = findSquareDistance(x, y, x2, y2);
  return sqDistance < (r + r2) ** 2;
};

const collisionCircleRectangle = (
  [x, y, r]: Circle,
  [x2, y2, width, height]: Rectangle
): boolean => {
  if (x < x2) {
    if (y < y2) {
      const sqDistance = findSquareDistance(x, y, x2, y2);
      return sqDistance < r * r;
    }
    if (y > y2 + height) {
      const sqDistance = findSquareDistance(x, y, x2, y2 + height);
      return sqDistance < r * r;
    }
    return x2 - x < r;
  }
  if (x > x2 + width) {
    if (y < y2) {
      const sqDistance = findSquareDistance(x, y, x2 + width, y2);
      return sqDistance < r * r;
    }
    if (y > y2 + height) {
      const sqDistance = findSquareDistance(x, y, x2 + width, y2 + height);
      return sqDistance < r * r;
    }
    return x - (x2 + width) < r;
  }
  if (y < y2) {
    return y2 - y < r;
  }
  if (y > y2 + height) {
    return y - (y2 + height) < r;
  }
  return true;
};

export const findCollisionsWithRocket = (
  asteroids: readonly Asteroid[],
  rocketX: number,
  dispatch: Dispatch
): void => {
  asteroids.forEach((asteroid, indexAsteroid) => {
    const { x, y, size, vY: speed } = asteroid;
    if (collisionCircleRectangle([x, y, size], [rocketX - 15, 627, 30, 85])) {
      dispatch(destroyAsteroid(indexAsteroid));
      const damage = Math.floor((size / 2) * (speed / 10));
      dispatch(damageRocket(damage));
    }
  });
};
