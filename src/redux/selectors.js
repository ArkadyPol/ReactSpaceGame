import { createSelector } from "reselect";

const getRestGame = (state) => state.game.game;
const getPassedPath = (state) => state.game.passedPath;
const getMove = (state) => state.game.move;

export const getStars = (state) => state.game.stars;

export const getGame = createSelector(
  getRestGame,
  getStars,
  getPassedPath,
  getMove,
  (game, stars, passedPath, move) => ({
    ...game,
    stars,
    passedPath,
    ...move,
  })
);
