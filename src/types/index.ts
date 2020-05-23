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
export type Game = {
  stars: readonly Star[];
  passedPath: number;
  rocketX: number;
  velocity: number;
  asteroids: readonly Asteroid[];
  boxes: Box[];
  health: number;
  readyToShoot: boolean;
  shotMagazine: number;
  shots: readonly Shot[];
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
