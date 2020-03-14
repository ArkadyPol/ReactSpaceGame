function shot(ctx, [x, y]) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#00af00";
  ctx.fill();
  ctx.closePath();
}
export default shot;
