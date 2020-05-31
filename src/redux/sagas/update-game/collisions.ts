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
  catchBox,
  CatchBoxAction,
} from '../../actions';
import { getAsteroids, getShots, getRocketX, getBoxes } from '../../selectors';
import { Asteroid, Shot, Box } from '../../../types';
import {
  collisionCircles,
  collisionCircleRectangle,
  collisionRectangles,
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
          const limit = Math.round(((size - 10) / 90) * 25) + 15;
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
  | PutEffect<DamageRocketAction>
  | PutEffect<CatchBoxAction>,
  void,
  readonly Asteroid[] & readonly Box[] & number
>;

export function* findCollisionsWithRocket(): FindCollisionsWithRocket {
  const asteroids: readonly Asteroid[] = yield select(getAsteroids);
  const boxes: readonly Box[] = yield select(getBoxes);
  const rocketX: number = yield select(getRocketX);
  for (let i = 0; i < asteroids.length; i++) {
    const { x, y, size, vY: speed } = asteroids[i];
    if (collisionCircleRectangle([x, y, size], [rocketX - 15, 627, 30, 85])) {
      yield put(destroyAsteroid(i));
      const damage = Math.floor((size / 2) * (speed / 10));
      yield put(damageRocket(damage));
    }
  }
  for (let i = 0; i < boxes.length; i++) {
    if (
      collisionRectangles(
        [boxes[i].x, boxes[i].y, 20, 20],
        [rocketX - 15, 627, 30, 85]
      )
    )
      yield put(catchBox(i, boxes[i].raw, boxes[i].count));
  }
}
