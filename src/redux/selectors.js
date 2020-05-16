const getGame = ({ game }) => ({
  ...game.game,
  stars: game.stars,
  passedPath: game.passedPath,
  ...game.move,
});

export default getGame;
