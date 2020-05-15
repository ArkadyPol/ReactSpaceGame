const findSquareDistance = (x, y, x2, y2) => {
  const dx = x - x2;
  const dy = y - y2;

  const sqDistance = dx * dx + dy * dy;
  return sqDistance;
};

const collisionCircles = ([x, y, r], [x2, y2, r2]) => {
  const sqDistance = findSquareDistance(x, y, x2, y2);
  return sqDistance < (r + r2) ** 2;
};

const collisionCircleRectangle = ([x, y, r], [x2, y2, width, height]) => {
  if (x < x2) {
    if (y < y2) {
      const sqDistance = findSquareDistance(x, y, x2, y2);
      return sqDistance < r * r;
    }
    if (y > y2 + height) {
      const sqDistance = findSquareDistance(x, y, x2, y2 + height);
      return sqDistance < r * r;
    }
    return x2 - x < r;
  }
  if (x > x2 + width) {
    if (y < y2) {
      const sqDistance = findSquareDistance(x, y, x2 + width, y2);
      return sqDistance < r * r;
    }
    if (y > y2 + height) {
      const sqDistance = findSquareDistance(x, y, x2 + width, y2 + height);
      return sqDistance < r * r;
    }
    return x - (x2 + width) < r;
  }
  if (y < y2) {
    return y2 - y < r;
  }
  if (y > y2 + height) {
    return y - (y2 + height) < r;
  }
  return true;
};

export const findCollisionsWithShots = (asteroids, shots, boxes) => {
  asteroids.forEach((asteroid, indexAsteroid) => {
    const { x, y, size, vY } = asteroid;
    shots.forEach((shot, indexShot) => {
      if (collisionCircles([x, y, size], [shot[0], shot[1], 5])) {
        shots.splice(indexShot, 1);
        asteroids.splice(indexAsteroid, 1);
        if (size >= 10) {
          const newSize = Math.floor(size / 2);
          const newVY = 0.9 * vY;
          asteroids.push({
            x,
            y,
            size: newSize,
            vX: newVY,
            vY: newVY,
          });
          asteroids.push({
            x,
            y,
            size: newSize,
            vX: -newVY,
            vY: newVY,
          });
          boxes.push({ x, y, color: "red" });
        }
      }
    });
  });
};
export const findCollisionsWithRocket = (asteroids, rocketX, health) => {
  let newHealth = health;
  asteroids.forEach((asteroid, indexAsteroid) => {
    const { x, y, size, vY: speed } = asteroid;
    if (collisionCircleRectangle([x, y, size], [rocketX - 15, 627, 30, 85])) {
      asteroids.splice(indexAsteroid, 1);
      const damage = Math.floor((size / 2) * (speed / 10));
      console.log("damage:", damage);
      newHealth -= damage;
    }
  });
  return newHealth;
};
