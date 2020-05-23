import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Star, Game, Asteroid, Box } from '../types';
import { MoveState } from './reducers/game-reducer/move-reducer';
import { ShotsState } from './reducers/game-reducer/shots-reducer';

const getPassedPath = (state: RootState): number => state.game.passedPath;
const getMove = (state: RootState): MoveState => state.game.move;
const getAsteroids = (state: RootState): readonly Asteroid[] =>
  state.game.asteroids;
const getHealth = (state: RootState): number => state.game.health;
const getShotsState = (state: RootState): ShotsState => state.game.shotsState;
const getBoxes = (state: RootState): Box[] => state.game.boxes;

export const getStars = (state: RootState): readonly Star[] => state.game.stars;

export const getGame = createSelector(
  getStars,
  getPassedPath,
  getMove,
  getAsteroids,
  getHealth,
  getShotsState,
  getBoxes,
  (stars, passedPath, move, asteroids, health, shotsState, boxes): Game => ({
    stars,
    passedPath,
    ...move,
    asteroids,
    health,
    ...shotsState,
    boxes,
  })
);
