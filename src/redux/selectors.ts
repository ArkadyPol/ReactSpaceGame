import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Star, Game, RestGameState, Asteroid } from '../types';
import { MoveState } from './reducers/game-reducer/move-reducer';
import { ShotsState } from './reducers/game-reducer/shots-reducer';

const getRestGame = (state: RootState): RestGameState => state.game.game;
const getPassedPath = (state: RootState): number => state.game.passedPath;
const getMove = (state: RootState): MoveState => state.game.move;
const getAsteroids = (state: RootState): readonly Asteroid[] =>
  state.game.asteroids;
const getHealth = (state: RootState): number => state.game.health;
const getShotsState = (state: RootState): ShotsState => state.game.shotsState;

export const getStars = (state: RootState): readonly Star[] => state.game.stars;

export const getGame = createSelector(
  getRestGame,
  getStars,
  getPassedPath,
  getMove,
  getAsteroids,
  getHealth,
  getShotsState,
  (game, stars, passedPath, move, asteroids, health, shotsState): Game => ({
    ...game,
    stars,
    passedPath,
    ...move,
    asteroids,
    health,
    ...shotsState,
  })
);
