const box = (ctx, { x, y, color }) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 20, 20);
  ctx.closePath();
};
export default box;
