import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import Form from "./Form.jsx";
import "../styles/App.css";
import { updateCanvas, generateNewStars, calculateVelocity } from "../logic.js";
import {
  addFPS,
  clearFPS,
  updateGame,
  toggleArrowLeft,
  toggleArrowRight
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
    let { stars, passedPath, velocity, rocketX } = game;
    stars = game.stars
      .map(params => [params[0], params[1] + 0.5, params[2]])
      .filter(params => params[1] < 750);
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
    passedPath += 1;
    if (passedPath % 25 == 0) generateNewStars(stars);
    batch(() => {
      dispatch(updateGame({ stars, passedPath, velocity, rocketX }));
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
