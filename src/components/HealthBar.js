function healthBar(ctx, num) {
  let height = num * 0.5;
  ctx.beginPath();
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(30, 60 - height, 10, height);
}
export default healthBar;
