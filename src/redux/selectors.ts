// import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Star, Game, Asteroid, Shot } from '../types';

export const getStars = (state: RootState): readonly Star[] => state.game.stars;
export const getAsteroids = (state: RootState): readonly Asteroid[] =>
  state.game.asteroids;
export const getShots = (state: RootState): readonly Shot[] =>
  state.game.shotsState.shots;
export const getRocketX = (state: RootState): number => state.game.move.rocketX;

export const getGame = (state: RootState): Game => state.game;
