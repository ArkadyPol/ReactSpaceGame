import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Star, Game, RestGameState, Asteroid } from '../types';
import { MoveState } from './reducers/game-reducer/move-reducer';

const getRestGame = (state: RootState): RestGameState => state.game.game;
const getPassedPath = (state: RootState): number => state.game.passedPath;
const getMove = (state: RootState): MoveState => state.game.move;
const getAsteroids = (state: RootState): Asteroid[] => state.game.asteroids;

export const getStars = (state: RootState): readonly Star[] => state.game.stars;

export const getGame = createSelector(
  getRestGame,
  getStars,
  getPassedPath,
  getMove,
  getAsteroids,
  (game, stars, passedPath, move, asteroids): Game => ({
    ...game,
    stars,
    passedPath,
    ...move,
    asteroids,
  })
);
