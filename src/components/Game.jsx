import React, { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "@reach/router";
import { calculateVelocity, generateAsteroid } from "../logic";
import updateCanvas from "../canvas";
import {
  addFPS,
  updateGame,
  reset,
  clearFPS,
  toggleArrowLeft,
  toggleArrowRight,
  toggleSpace,
  toggleEscape,
  saveGame,
  runFpsTimer,
  stopFpsTimer,
  generateNewStars,
} from "../redux/actions";
import {
  findCollisionsWithRocket,
  findCollisionsWithShots,
} from "../collisions";
import Form from "./Form";
import Buttons from "./ButtonsGame";
import "../styles/App.css";
import getGame from "../redux/selectors";

const Game = () => {
  const game = useSelector(getGame);
  const keyboard = useSelector((state) => state.keyboard);
  const displayForm = useSelector((state) => state.display);
  const save = useSelector((state) => state.saves.saveName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = 1184;
  const height = 740;
  const canvas = useRef(null);
  const requestID = useRef(null);
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    updateCanvas(ctx, game);
  }, [game]);
  useEffect(() => {
    dispatch(runFpsTimer());
    return () => {
      dispatch(stopFpsTimer());
    };
  }, [dispatch]);
  const updatePerFrame = useCallback(() => {
    const { escape, arrowLeft, arrowRight, space } = keyboard;
    if (escape) return;
    requestID.current = requestAnimationFrame(updatePerFrame);
    let {
      velocity,
      readyToShoot,
      shotMagazine,
      shots,
      asteroids,
      boxes,
      health,
    } = game;
    const { passedPath, rocketX } = game;
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
      return;
    }
    velocity = calculateVelocity({
      velocity,
      arrowLeft,
      arrowRight,
    });
    if (space && readyToShoot && shotMagazine > 0) {
      shots.push([rocketX, 625]);
      readyToShoot = false;
      shotMagazine -= 1;
    }
    if (passedPath % 5 === 0 && !readyToShoot) readyToShoot = true;
    if (passedPath % 25 === 0) dispatch(generateNewStars());
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
          velocity,
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
  }, [dispatch, game, navigate, keyboard]);

  useEffect(() => {
    requestID.current = requestAnimationFrame(updatePerFrame);
    return () => {
      cancelAnimationFrame(requestID.current);
    };
  }, [updatePerFrame]);

  const stopTimers = useCallback(() => {
    cancelAnimationFrame(requestID.current);
    dispatch(stopFpsTimer());
  }, [dispatch]);

  const runTimers = useCallback(() => {
    cancelAnimationFrame(requestID.current);
    requestID.current = requestAnimationFrame(updatePerFrame);
    dispatch(runFpsTimer());
  }, [dispatch, updatePerFrame]);

  useEffect(() => {
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
        default:
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
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch, keyboard.escape, runTimers, stopTimers]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (game.nameSave === "") return;
    if (e.target.id !== "save") return;
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
