export function findCollisionsWithShots(asteroids, shots) {
  asteroids.forEach((asteroid, indexAsteroid) => {
    let { x, y, size, vY } = asteroid;
    shots.forEach((shot, indexShot) => {
      if (collisionCircles([x, y, size], [shot[0], shot[1], 5])) {
        shots.splice(indexShot, 1);
        asteroids.splice(indexAsteroid, 1);
        if (asteroid.size >= 10) {
          let newSize = Math.floor(size / 2);
          let newVY = 0.9 * vY;
          asteroids.push({ x, y, size: newSize, vX: newVY, vY: newVY });
          asteroids.push({ x, y, size: newSize, vX: -newVY, vY: newVY });
        }
      }
    });
  });
}
export function findCollisionsWithRocket(asteroids, rocketX, health) {
  asteroids.forEach((asteroid, indexAsteroid) => {
    let { x, y, size } = asteroid;
    if (collisionCircleRectangle([x, y, size], [rocketX - 15, 627, 30, 85])) {
      console.log(size);
      asteroids.splice(indexAsteroid, 1);
      health -= Math.floor(size / 2);
    }
  });
  return health;
}

function findSquareDistance(x, y, x2, y2) {
  let dx = x - x2;
  let dy = y - y2;
  let sqDistance = dx * dx + dy * dy;
  return sqDistance;
}
function collisionCircles([x, y, r], [x2, y2, r2]) {
  let sqDistance = findSquareDistance(x, y, x2, y2);
  return sqDistance < Math.pow(r + r2, 2);
}
function collisionCircleRectangle([x, y, r], [x2, y2, width, height]) {
  if (x < x2) {
    if (y < y2) {
      let sqDistance = findSquareDistance(x, y, x2, y2);
      return sqDistance < r * r;
    } else if (y > y2 + height) {
      let sqDistance = findSquareDistance(x, y, x2, y2 + height);
      return sqDistance < r * r;
    } else return x2 - x < r;
  } else if (x > x2 + width) {
    if (y < y2) {
      let sqDistance = findSquareDistance(x, y, x2 + width, y2);
      return sqDistance < r * r;
    } else if (y > y2 + height) {
      let sqDistance = findSquareDistance(x, y, x2 + width, y2 + height);
      return sqDistance < r * r;
    } else return x - (x2 + width) < r;
  } else if (y < y2) {
    return y2 - y < r;
  } else if (y > y2 + height) {
    return y - (y2 + height) < r;
  }
  return true;
}
