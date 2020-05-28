const shotMagazine = (ctx: CanvasRenderingContext2D, num: number): void => {
  const height = (num * 10) / 3;
  ctx.beginPath();
  ctx.fillStyle = '#00af00';
  ctx.fillRect(10, 60 - height, 10, height);
  ctx.closePath();
};
export default shotMagazine;
