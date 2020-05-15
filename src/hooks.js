import { useDispatch, useStore, batch } from "react-redux";
import { useNavigate } from "@reach/router";
import { generateNewStars, calculateVelocity, generateAsteroid } from "./logic";
import { addFPS, updateGame, reset } from "./redux/actions";
import {
  findCollisionsWithRocket,
  findCollisionsWithShots,
} from "./collisions";

const useAnimate = (requestID) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useStore();
  return function updatePerFrame() {
    requestID.current = requestAnimationFrame(updatePerFrame);
    const state = store.getState();
    const { game } = state;
    const { keyboard } = state;
    let {
      stars,
      passedPath,
      velocity,
      rocketX,
      readyToShoot,
      shotMagazine,
      shots,
      asteroids,
      boxes,
      health,
    } = game;
    stars = stars
      .map((params) => [params[0], params[1] + 0.5, params[2]])
      .filter((params) => params[1] < 750);
    shots = shots
      .map((coords) => [coords[0], coords[1] - 5])
      .filter((coords) => coords[1] > 0);
    asteroids = asteroids
      .map((params) => {
        const x = params.x + params.vX;
        const y = params.y + params.vY;
        return { ...params, x, y };
      })
      .filter((params) => params.y < 850);
    boxes = boxes
      .map((params) => {
        const y = params.y + 2;
        return { ...params, y };
      })
      .filter((params) => params.y < 800);

    findCollisionsWithShots(asteroids, shots, boxes);
    health = findCollisionsWithRocket(asteroids, rocketX, health);

    if (health <= 0) {
      navigate("/");
      dispatch(reset());
    }
    velocity = calculateVelocity({
      velocity,
      arrowLeft: keyboard.arrowLeft,
      arrowRight: keyboard.arrowRight,
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
    if (passedPath % 5 === 0 && !readyToShoot) readyToShoot = true;
    if (passedPath % 25 === 0) generateNewStars(stars);
    if (passedPath % 75 === 0) {
      if (shotMagazine < 10) {
        shotMagazine += 1;
      }
    }
    if (passedPath % 100 === 0) {
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
          boxes,
          health,
        })
      );
      dispatch(addFPS());
    });
  };
};
export default useAnimate;
