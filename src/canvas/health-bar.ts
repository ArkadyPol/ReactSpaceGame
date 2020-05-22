const healthBar = (ctx: CanvasRenderingContext2D, num: number): void => {
  const height = num * 0.5;
  ctx.beginPath();
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(30, 60 - height, 10, height);
  ctx.closePath();
};
export default healthBar;
