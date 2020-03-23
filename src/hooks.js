import { useDispatch, useStore, batch } from "react-redux";
import { useNavigate } from "@reach/router";
import {
  generateNewStars,
  calculateVelocity,
  generateAsteroid
} from "./logic.js";
import { addFPS, updateGame, reset } from "./redux/actions.js";
import {
  findCollisionsWithRocket,
  findCollisionsWithShots
} from "./collisions.js";
export function useAnimate(requestID) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useStore();
  return function updatePerFrame() {
    requestID.current = requestAnimationFrame(updatePerFrame);
    const state = store.getState();
    const game = state.game;
    const keyboard = state.keyboard;
    let {
      stars,
      passedPath,
      velocity,
      rocketX,
      readyToShoot,
      shotMagazine,
      shots,
      asteroids,
      health
    } = game;
    stars = stars
      .map(params => [params[0], params[1] + 0.5, params[2]])
      .filter(params => params[1] < 750);
    if (shots) {
      shots = shots
        .map(coords => [coords[0], coords[1] - 5])
        .filter(coords => coords[1] > 0);
    }
    if (asteroids) {
      asteroids = asteroids
        .map(params => {
          let x = params.x + params.vX;
          let y = params.y + params.vY;
          return { ...params, x, y };
        })
        .filter(params => params.y < 850);
    }
    if (asteroids) {
      findCollisionsWithShots(asteroids, shots, dispatch);
      health = findCollisionsWithRocket(asteroids, rocketX, health);
    }
    if (health <= 0) {
      navigate("/");
      dispatch(reset());
    }
    velocity = calculateVelocity({
      velocity,
      arrowLeft: keyboard.arrowLeft,
      arrowRight: keyboard.arrowRight
    });
    rocketX += velocity;
    if (rocketX < 15) {
      rocketX = 15;
      velocity = 0;
    }
    if (rocketX > 1169) {
      rocketX = 1169;
      velocity = 0;
    }
    if (keyboard.space && readyToShoot && shotMagazine > 0) {
      shots.push([rocketX, 625]);
      readyToShoot = false;
      shotMagazine -= 1;
    }
    passedPath += 1;
    if (passedPath % 5 == 0 && !readyToShoot) readyToShoot = true;
    if (passedPath % 25 == 0) generateNewStars(stars);
    if (passedPath % 75 == 0) {
      if (shotMagazine < 10) {
        shotMagazine += 1;
      }
    }
    if (passedPath % 100 == 0) {
      asteroids.push(generateAsteroid());
    }
    batch(() => {
      dispatch(
        updateGame({
          stars,
          passedPath,
          velocity,
          rocketX,
          readyToShoot,
          shotMagazine,
          shots,
          asteroids,
          health
        })
      );
      dispatch(addFPS());
    });
  };
}
