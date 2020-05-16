const getGame = (state) => {
  const { game } = state.game;
  game.stars = state.game.stars;
  game.passedPath = state.game.passedPath;
  return game;
};
export default getGame;
