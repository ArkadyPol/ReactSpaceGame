import { ForkEffect } from 'redux-saga/effects';

export type Asteroid = {
  x: number;
  y: number;
  size: number;
  vX: number;
  vY: number;
};
export type Box = {
  x: number;
  y: number;
  color: string;
};
export type DropBox = {
  x: number;
  y: number;
  size: number;
};
export type Game = {
  stars: readonly Star[];
  passedPath: number;
  move: {
    rocketX: number;
    velocity: number;
  };
  asteroids: readonly Asteroid[];
  health: number;
  shotsState: {
    readyToShoot: boolean;
    shotMagazine: number;
    shots: readonly Shot[];
  };
  boxes: readonly Box[];
};

export type RequiredState = {
  arrowLeft: boolean;
  arrowRight: boolean;
  space: boolean;
  rocketX: number;
};
export type Save = {
  game: Game;
  saveName: string;
};
export type Shot = readonly [number, number];
export type Star = readonly [number, number, number];
export type WatcherSaga = Generator<ForkEffect<never>, void, unknown>;
