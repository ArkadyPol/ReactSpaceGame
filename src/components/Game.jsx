import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import Form from "./Form.jsx";
import "../styles/App.css";
import { updateCanvas, generateNewStars } from "../logic.js";
import { addFPS, clearFPS, updateGame } from "../redux/actions.js";
function Game() {
  const game = useSelector(state => state.game);
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
    let stars = game.stars
      .map(params => [params[0], params[1] + 0.5, params[2]])
      .filter(params => params[1] < 750);
    let passedPath = game.passedPath + 1;
    if (passedPath % 25 == 0) generateNewStars(stars);
    batch(() => {
      dispatch(updateGame({ stars, passedPath }));
      dispatch(addFPS());
    });
  }
  useEffect(() => {
    requestID.current = requestAnimationFrame(updatePerFrame);
    return () => {
      cancelAnimationFrame(requestID.current);
    };
  }, [game]);
  return <canvas ref={canvas} width={width} height={height} />;
}
export default Game;
