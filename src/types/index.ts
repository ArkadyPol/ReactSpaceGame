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
  asteroids: Asteroid[];
  boxes: Box[];
  health: number;
  readyToShoot: boolean;
  shotMagazine: number;
  shots: Shot[];
};
export type Move = {
  arrowLeft: boolean;
  arrowRight: boolean;
};
export type RestGameState = {
  boxes: Box[];
  health: number;
  readyToShoot: boolean;
  shotMagazine: number;
  shots: Shot[];
};
export type Save = {
  game: Game;
  saveName: string;
};
export type Shot = readonly [number, number];
export type Star = readonly [number, number, number];
