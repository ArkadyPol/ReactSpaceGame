function rocket(ctx, x) {
  ctx.beginPath();
  ctx.ellipse(x, 665, 12, 37, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "#ff0000";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, 645, 5, 0, 2 * Math.PI);
  ctx.arc(x, 665, 5, 0, 2 * Math.PI);
  ctx.arc(x, 685, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffff00";
  ctx.fill();
  let p = new Path2D(
    `M${x - 7} 695 q -10 10 -10 20 q 0 -10 14 -16 Q ${x - 4} 700 ${x - 7} 695`
  );
  ctx.fill(p);
  let p2 = new Path2D(
    `M${x + 7} 695 q 10 10 10 20 q 0 -10 -14 -16 Q ${x + 4} 700 ${x + 7} 695`
  );
  ctx.fill(p2);
  ctx.closePath();
}
export default rocket;
