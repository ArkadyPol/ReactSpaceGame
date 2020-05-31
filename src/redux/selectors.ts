// import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Star, Game, Asteroid, Shot, Box } from '../types';

export const getStars = (state: RootState): readonly Star[] => state.game.stars;
export const getAsteroids = (state: RootState): readonly Asteroid[] =>
  state.game.asteroids;
export const getShots = (state: RootState): readonly Shot[] =>
  state.game.shotsState.shots;
export const getRocketX = (state: RootState): number => state.game.move.rocketX;
export const getPassedPath = (state: RootState): number =>
  state.game.passedPath;
export const getHealth = (state: RootState): number => state.game.health;
export const getShotMagazine = (state: RootState): number =>
  state.game.shotsState.shotMagazine;
export const getReadyToShoot = (state: RootState): boolean =>
  state.game.shotsState.readyToShoot;
export const getArrowLeft = (state: RootState): boolean =>
  state.keyboard.arrowLeft;
export const getArrowRight = (state: RootState): boolean =>
  state.keyboard.arrowRight;
export const getSpace = (state: RootState): boolean => state.keyboard.space;
export const getBoxes = (state: RootState): readonly Box[] => state.game.boxes;

export const getGame = (state: RootState): Game => state.game;
