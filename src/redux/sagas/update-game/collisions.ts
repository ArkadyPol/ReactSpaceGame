import { put, select, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  destroyShot,
  destroyAsteroid,
  addAsteroid,
  DestroyAsteroidAction,
  DestroyShotAction,
  AddAsteroidAction,
  damageRocket,
  DamageRocketAction,
  DropBoxAction,
  dropBox,
} from '../../actions';
import { getAsteroids, getShots, getRocketX } from '../../selectors';
import { Asteroid, Shot } from '../../../types';
import {
  collisionCircles,
  collisionCircleRectangle,
} from '../../../collisions';
import randomInteger from '../../../logic';

type FindCollisionsWithShots = Generator<
  | SelectEffect
  | PutEffect<DestroyAsteroidAction>
  | PutEffect<DestroyShotAction>
  | PutEffect<AddAsteroidAction>
  | PutEffect<DropBoxAction>,
  void,
  readonly Asteroid[] & readonly Shot[]
>;

export function* findCollisionsWithShots(): FindCollisionsWithShots {
  const asteroids: readonly Asteroid[] = yield select(getAsteroids);
  const shots: readonly Shot[] = yield select(getShots);
  for (let i = 0; i < asteroids.length; i++) {
    const { x, y, size, vY } = asteroids[i];
    for (let j = 0; j < shots.length; j++) {
      if (collisionCircles([x, y, size], [shots[j][0], shots[j][1], 5])) {
        yield put(destroyShot(j));
        yield put(destroyAsteroid(i));
        if (size >= 10) {
          const newSize = Math.floor(size / 2);
          const newVY = 0.8 * vY;
          yield put(
            addAsteroid({
              x,
              y,
              size: newSize,
              vX: newVY,
              vY: newVY,
            })
          );
          yield put(
            addAsteroid({
              x,
              y,
              size: newSize,
              vX: -newVY,
              vY: newVY,
            })
          );
          const percent = randomInteger(0, 99);
          const limit = Math.round(((size - 10) / 90) * 23) + 10;
          if (percent < limit) {
            yield put(dropBox({ x, y, size }));
          }
        }
      }
    }
  }
}

type FindCollisionsWithRocket = Generator<
  | SelectEffect
  | PutEffect<DestroyAsteroidAction>
  | PutEffect<DamageRocketAction>,
  void,
  readonly Asteroid[] & number
>;

export function* findCollisionsWithRocket(): FindCollisionsWithRocket {
  const asteroids: readonly Asteroid[] = yield select(getAsteroids);
  const rocketX: number = yield select(getRocketX);
  for (let i = 0; i < asteroids.length; i++) {
    const { x, y, size, vY: speed } = asteroids[i];
    if (collisionCircleRectangle([x, y, size], [rocketX - 15, 627, 30, 85])) {
      yield put(destroyAsteroid(i));
      const damage = Math.floor((size / 2) * (speed / 10));
      yield put(damageRocket(damage));
    }
  }
}
