import { Box } from "../types";

const box = (ctx: CanvasRenderingContext2D, { x, y, color }: Box): void => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 20, 20);
  ctx.closePath();
};
export default box;
