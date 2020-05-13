const asteroid = (ctx, { x, y, size }) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = "#999191";
  ctx.fill();
  ctx.closePath();
};
export default asteroid;
