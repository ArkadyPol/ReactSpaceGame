import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "./Form.jsx";
import { default as Buttons } from "./ButtonsGame.jsx";
import "../styles/App.css";
import { updateCanvas } from "../logic";
import {
  clearFPS,
  toggleArrowLeft,
  toggleArrowRight,
  toggleSpace,
} from "../redux/actions";
import { toggleEscape, saveGame } from "../redux/thunks";
import { useAnimate } from "../hooks";
const Game = () => {
  const game = useSelector((state) => state.game);
  const keyboard = useSelector((state) => state.keyboard);
  const displayForm = useSelector((state) => state.display);
  const save = useSelector((state) => state.saves.saveName);
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
  const updatePerFrame = useAnimate(requestID);
  useEffect(() => {
    requestID.current = requestAnimationFrame(updatePerFrame);
    return () => {
      cancelAnimationFrame(requestID.current);
    };
  }, []);
  const runTimers = () => {
    cancelAnimationFrame(requestID.current);
    clearInterval(timerFPS.current);
    requestID.current = requestAnimationFrame(updatePerFrame);
    timerFPS.current = setInterval(() => {
      dispatch(clearFPS());
    }, 5000);
  };
  const stopTimers = () => {
    cancelAnimationFrame(requestID.current);
    clearInterval(timerFPS.current);
  };
  const handleKeyDown = (e) => {
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
          runTimers();
          dispatch(toggleEscape(false));
        } else {
          stopTimers();
          dispatch(toggleEscape(true));
          dispatch(clearFPS());
        }
        break;
    }
  };
  const handleKeyUp = (e) => {
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
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyboard]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (game.nameSave == "") return;
    if (e.target.id != "save") return;
    runTimers();
    dispatch(saveGame(save));
  };
  return (
    <>
      <canvas ref={canvas} width={width} height={height} />
      {keyboard.escape && !displayForm && <Buttons />}
      {displayForm && <Form handleSubmit={handleSubmit} />}
    </>
  );
};
export default Game;
