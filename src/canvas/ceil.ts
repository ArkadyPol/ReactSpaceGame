const ceil = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, 30, 30);
  ctx.fillStyle = '#6d2b0c';
  ctx.fillRect(x + 1, y + 1, 28, 28);
  ctx.closePath();
};
export default ceil;
