import { createSelector } from "reselect";
import { RootStateType } from "./reducers";
import { StarType, GameType, RestGameStateType, AsteroidType } from "../types";
import { MoveStateType } from "./reducers/game-reducer/move-reducer";

const getRestGame = (state: RootStateType): RestGameStateType =>
  state.game.game;
const getPassedPath = (state: RootStateType): number => state.game.passedPath;
const getMove = (state: RootStateType): MoveStateType => state.game.move;
const getAsteroids = (state: RootStateType): AsteroidType[] =>
  state.game.asteroids;

export const getStars = (state: RootStateType): StarType[] => state.game.stars;

export const getGame = createSelector(
  getRestGame,
  getStars,
  getPassedPath,
  getMove,
  getAsteroids,
  (game, stars, passedPath, move, asteroids): GameType => ({
    ...game,
    stars,
    passedPath,
    ...move,
    asteroids,
  })
);
