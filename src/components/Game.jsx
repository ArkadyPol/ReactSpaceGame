import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "./Form.jsx";
import "../styles/App.css";
import { updateCanvas } from "../logic.js";
import { addFPS, clearFPS } from "../redux/actions.js";
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
    dispatch(addFPS());
  }
  useEffect(() => {
    requestID.current = requestAnimationFrame(updatePerFrame);
    return () => {
      cancelAnimationFrame(requestID.current);
    };
  }, []);
  return <canvas ref={canvas} width={width} height={height} />;
}
export default Game;
