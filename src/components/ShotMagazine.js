function shotMagazine(ctx, num) {
  let height = num * 5;
  ctx.beginPath();
  ctx.fillStyle = "#00af00";
  ctx.fillRect(10, 60 - height, 10, height);
}
export default shotMagazine;
