function star(ctx, x, y, size) {
  ctx.beginPath();
  let p = new Path2D(
    `M${x -
      size} ${y} q ${size} 0 ${size} ${-size} q 0 ${size} ${size} ${size} q ${-size} 0 
      ${-size} ${size} q 0 ${-size} ${-size} ${-size}`
  );
  ctx.fillStyle = "#ffffff";
  ctx.fill(p);
}
export default star;
