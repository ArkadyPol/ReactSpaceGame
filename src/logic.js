import shot from "./canvas/Shot.js";
import star from "./canvas/Star.js";
import rocket from "./canvas/Rocket.js";
import shotMagazine from "./canvas/ShotMagazine.js";
import healthBar from "./canvas/HealthBar.js";
import asteroid from "./canvas/Asteroid.js";
export function calculateVelocity({ velocity, arrowLeft, arrowRight }) {
  if (Math.abs(velocity) < 0.14) velocity = 0;
  if (velocity > 0) velocity -= 0.14;
  if (velocity < 0) velocity += 0.14;
  if (arrowLeft) {
    velocity -= 0.36;
  }
  if (arrowRight) {
    velocity += 0.36;
  }
  return velocity;
}
export function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
export function generateStar() {
  let x = randomInteger(8, 1176);
  let y = randomInteger(-10, -19);
  let percent = randomInteger(0, 199);
  let size;
  if (percent < 81) size = 2;
  else if (percent < 130) size = 3;
  else if (percent < 160) size = 4;
  else if (percent < 178) size = 5;
  else if (percent < 189) size = 6;
  else if (percent < 196) size = 7;
  else size = 8;
  return [x, y, size];
}
export function generateAsteroid() {
  let x = randomInteger(20, 1164);
  let y = -200;
  let size = randomInteger(5, 100);
  let vX = randomInteger(-2, 2);
  let vY = randomInteger(4, 10);
  return { x, y, size, vX, vY };
}
export function collision([x, y, R], [x2, y2, R2]) {
  let dx = Math.abs(x - x2);
  let dy = Math.abs(y - y2);
  let d = R + R2;
  if (dx * dx + dy * dy > d * d) return false;
  return true;
}
export function runTimers() {
  this.requestID = requestAnimationFrame(this.updatePerFrame);
  this.timerFPS = setInterval(() => this.runFPS(), 1000);
}
export function stopTimers() {
  cancelAnimationFrame(this.requestID);
  clearInterval(this.timerFPS);
}
export function updateCanvas(ctx, state) {
  ctx.clearRect(0, 0, 1184, 740);
  ctx.fillStyle = "#09011a";
  ctx.fillRect(0, 0, 1184, 740);
  state.stars.forEach(params => star(ctx, params));
  state.shots.forEach(coords => shot(ctx, coords));
  state.asteroids.forEach(params => asteroid(ctx, params));
  rocket(ctx, state.rocketX);
  shotMagazine(ctx, state.shotMagazine);
  healthBar(ctx, state.health);
}
export async function getSaves() {
  let response = await fetch("/saves");
  let saves = await response.json();
  this.setState({ saves, displayForm: true });
}
export async function loadSave(query) {
  let response = await fetch(`/save?${query}`);
  let save = await response.json();
  this.setState(save);
}
