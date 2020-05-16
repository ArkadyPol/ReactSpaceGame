const getGame = (state) => {
  const { game } = state.game;
  game.stars = state.game.stars;
  return game;
};
export default getGame;
