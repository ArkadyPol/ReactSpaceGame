import shot from './shot';
import star from './star';
import rocket from './rocket';
import shotMagazine from './shot-magazine';
import healthBar from './health-bar';
import asteroid from './asteroid';
import box from './box';
import ceil from './ceil';
import { Game } from '../types';

const showInventory = (ctx: CanvasRenderingContext2D) => {
  let x = 1000;
  let y = 550;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      ceil(ctx, x, y);
      x += 30;
    }
    x = 1000;
    y += 30;
  }
};

const updateCanvas = (
  ctx: CanvasRenderingContext2D,
  game: Game,
  isShowInv: boolean
): void => {
  ctx.clearRect(0, 0, 1184, 740);
  game.stars.forEach((params) => star(ctx, params));
  game.shotsState.shots.forEach((coords) => shot(ctx, coords));
  game.asteroids.forEach((params) => asteroid(ctx, params));
  game.boxes.forEach((params) => box(ctx, params));
  rocket(ctx, game.move.rocketX);
  if (isShowInv) {
    showInventory(ctx);
  }
  shotMagazine(ctx, game.shotsState.shotMagazine);
  healthBar(ctx, game.health);
};
export default updateCanvas;
