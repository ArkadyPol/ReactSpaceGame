import shot from "./Shot";
import star from "./Star";
import rocket from "./Rocket";
import shotMagazine from "./ShotMagazine";
import healthBar from "./HealthBar";
import asteroid from "./Asteroid";
import box from "./Box";
import { GameType } from "../types";

const updateCanvas = (ctx: CanvasRenderingContext2D, game: GameType): void => {
  ctx.clearRect(0, 0, 1184, 740);
  game.stars.forEach((params) => star(ctx, params));
  game.shots.forEach((coords) => shot(ctx, coords));
  game.asteroids.forEach((params) => asteroid(ctx, params));
  game.boxes.forEach((params) => box(ctx, params));
  rocket(ctx, game.rocketX);
  shotMagazine(ctx, game.shotMagazine);
  healthBar(ctx, game.health);
};
export default updateCanvas;
