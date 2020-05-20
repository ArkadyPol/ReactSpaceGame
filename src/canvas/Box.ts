import { BoxType } from "../types";

const box = (ctx: CanvasRenderingContext2D, { x, y, color }: BoxType): void => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 20, 20);
  ctx.closePath();
};
export default box;
