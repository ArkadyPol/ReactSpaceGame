import { createSelector } from "reselect";
import { RootStateType } from "./reducers";
import { StarType, GameType } from "../types";
import { MoveStateType } from "./reducers/game-reducer/move-reducer";
import { RestGameStateType } from "./reducers/game-reducer";

const getRestGame = (state: RootStateType): RestGameStateType =>
  state.game.game;
const getPassedPath = (state: RootStateType): number => state.game.passedPath;
const getMove = (state: RootStateType): MoveStateType => state.game.move;

export const getStars = (state: RootStateType): StarType[] => state.game.stars;

export const getGame = createSelector(
  getRestGame,
  getStars,
  getPassedPath,
  getMove,
  (game, stars, passedPath, move): GameType => ({
    ...game,
    stars,
    passedPath,
    ...move,
  })
);
