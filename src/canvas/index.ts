import shot from './shot';
import star from './star';
import rocket from './rocket';
import shotMagazine from './shot-magazine';
import healthBar from './health-bar';
import asteroid from './asteroid';
import box from './box';
import { Game } from '../types';

const updateCanvas = (ctx: CanvasRenderingContext2D, game: Game): void => {
  ctx.clearRect(0, 0, 1184, 740);
  game.stars.forEach((params) => star(ctx, params));
  game.shotsState.shots.forEach((coords) => shot(ctx, coords));
  game.asteroids.forEach((params) => asteroid(ctx, params));
  game.boxes.forEach((params) => box(ctx, params));
  rocket(ctx, game.move.rocketX);
  shotMagazine(ctx, game.shotsState.shotMagazine);
  healthBar(ctx, game.health);
};
export default updateCanvas;
