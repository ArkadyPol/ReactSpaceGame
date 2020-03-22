import React, { useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import Form from "./Form.jsx";
import { default as Buttons } from "./ButtonsGame.jsx";
import "../styles/App.css";
import {
  updateCanvas,
  generateNewStars,
  calculateVelocity,
  generateAsteroid
} from "../logic.js";
import {
  addFPS,
  clearFPS,
  updateGame,
  toggleArrowLeft,
  toggleArrowRight,
  toggleSpace,
  toggleEscape
} from "../redux/actions.js";
import {
  findCollisionsWithRocket,
  findCollisionsWithShots
} from "../collisions.js";
function Game() {
  const game = useSelector(state => state.game);
  const keyboard = useSelector(state => state.keyboard);
  const dispatch = useDispatch();
  const width = 1184;
  const height = 740;
  const canvas = useRef(null);
  const timerFPS = useRef(null);
  const requestID = useRef(null);
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    updateCanvas(ctx, game);
  }, [game]);
  useEffect(() => {
    timerFPS.current = setInterval(() => {
      dispatch(clearFPS());
    }, 5000);
    return () => {
      clearInterval(timerFPS.current);
    };
  }, []);
  function updatePerFrame() {
    requestID.current = requestAnimationFrame(updatePerFrame);
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
    stars = game.stars
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
  }
  useEffect(() => {
    requestID.current = requestAnimationFrame(updatePerFrame);
    return () => {
      cancelAnimationFrame(requestID.current);
    };
  }, [game]);
  function handleKeyDown(e) {
    switch (e.code) {
      case "ArrowLeft":
        dispatch(toggleArrowLeft(true));
        break;
      case "ArrowRight":
        dispatch(toggleArrowRight(true));
        break;
      case "Space":
        dispatch(toggleSpace(true));
        break;
      case "Escape":
        if (keyboard.escape) {
          requestID.current = requestAnimationFrame(updatePerFrame);
          timerFPS.current = setInterval(() => {
            dispatch(clearFPS());
          }, 5000);
        } else {
          cancelAnimationFrame(requestID.current);
          clearInterval(timerFPS.current);
          dispatch(clearFPS());
        }
        dispatch(toggleEscape());
        break;
    }
  }
  function handleKeyUp(e) {
    switch (e.code) {
      case "ArrowLeft":
        dispatch(toggleArrowLeft(false));
        break;
      case "ArrowRight":
        dispatch(toggleArrowRight(false));
        break;
      case "Space":
        dispatch(toggleSpace(false));
        break;
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyboard]);
  return (
    <Fragment>
      <canvas ref={canvas} width={width} height={height} />
      {keyboard.escape && <Buttons />}
    </Fragment>
  );
}
export default Game;
