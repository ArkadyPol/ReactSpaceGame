import { Star } from '../types';

const star = (ctx: CanvasRenderingContext2D, [x, y, size]: Star): void => {
  ctx.beginPath();
  const p = new Path2D(
    `M${
      x - size
    } ${y} q ${size} 0 ${size} ${-size} q 0 ${size} ${size} ${size} q ${-size} 0 
      ${-size} ${size} q 0 ${-size} ${-size} ${-size}`
  );
  ctx.fillStyle = '#ffffff';
  ctx.fill(p);
  ctx.closePath();
};
export default star;
