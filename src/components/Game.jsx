import React, { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "@reach/router";
import {
  generateNewStars,
  calculateVelocity,
  generateAsteroid,
  updateCanvas,
} from "../logic";
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
  const arrowLeft = useSelector((state) => state.keyboard.arrowLeft);
  const arrowRight = useSelector((state) => state.keyboard.arrowRight);
  const space = useSelector((state) => state.keyboard.space);
  const escape = useSelector((state) => state.keyboard.escape);
  const displayForm = useSelector((state) => state.display);
  const save = useSelector((state) => state.saves.saveName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  }, [dispatch]);
  const updatePerFrame = useCallback(() => {
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
      arrowLeft,
      arrowRight,
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
    if (space && readyToShoot && shotMagazine > 0) {
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
  }, [dispatch, game, navigate, arrowLeft, arrowRight, space]);

  useEffect(() => {
    requestID.current = requestAnimationFrame(updatePerFrame);
    return () => {
      cancelAnimationFrame(requestID.current);
    };
  }, [updatePerFrame]);

  const runTimers = useCallback(() => {
    cancelAnimationFrame(requestID.current);
    clearInterval(timerFPS.current);
    requestID.current = requestAnimationFrame(updatePerFrame);
    timerFPS.current = setInterval(() => {
      dispatch(clearFPS());
    }, 5000);
  }, [dispatch, updatePerFrame]);
  const stopTimers = () => {
    cancelAnimationFrame(requestID.current);
    clearInterval(timerFPS.current);
  };

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
          if (escape) {
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
  }, [dispatch, escape, runTimers]);
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
      {escape && !displayForm && <Buttons />}
      {displayForm && <Form handleSubmit={handleSubmit} />}
    </>
  );
};
export default Game;
