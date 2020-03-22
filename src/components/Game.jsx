import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import Form from "./Form.jsx";
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
  toggleSpace
} from "../redux/actions.js";
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
      asteroids
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
          asteroids
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
  }, []);
  return <canvas ref={canvas} width={width} height={height} />;
}
export default Game;
