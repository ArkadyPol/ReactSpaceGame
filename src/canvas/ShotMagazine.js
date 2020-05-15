const shotMagazine = (ctx, num) => {
  const height = num * 5;
  ctx.beginPath();
  ctx.fillStyle = "#00af00";
  ctx.fillRect(10, 60 - height, 10, height);
  ctx.closePath();
};
export default shotMagazine;
