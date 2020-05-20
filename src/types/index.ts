export type AsteroidType = {
  x: number;
  y: number;
  size: number;
  vX: number;
  vY: number;
};
export type BoxType = {
  x: number;
  y: number;
  color: string;
};
export type MoveType = {
  arrowLeft: boolean;
  arrowRight: boolean;
};
export type GameType = {
  stars: StarType[];
  passedPath: number;
  rocketX: number;
  velocity: number;
  asteroids: AsteroidType[];
  boxes: BoxType[];
  health: number;
  readyToShoot: boolean;
  shotMagazine: number;
  shots: ShotType[];
};
export type ShotType = [number, number];
export type StarType = [number, number, number];