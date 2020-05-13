const box = (ctx, { x, y, color }) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 10, 10);
  ctx.closePath();
};
export default box;
