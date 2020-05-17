import { createSelector } from "reselect";

const getRestGame = (state) => state.game.game;
const getStars = (state) => state.game.stars;
const getPassedPath = (state) => state.game.passedPath;
const getMove = (state) => state.game.move;

const getGame = createSelector(
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

export default getGame;
