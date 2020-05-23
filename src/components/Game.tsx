import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from '@reach/router';
import updateCanvas from '../canvas';
import {
  addFPS,
  updateGame,
  reset,
  clearFPS,
  toggleArrowLeft,
  toggleArrowRight,
  toggleSpace,
  sagaToggleEscape,
  sagaSaveGame,
  sagaRunFpsTimer,
  sagaStopFpsTimer,
  generateNewStars,
  generateAsteroid,
} from '../redux/actions';
import {
  findCollisionsWithRocket,
  findCollisionsWithShots,
} from '../collisions';
import Form from './Form';
import Buttons from './ButtonsGame';
import '../styles/App.css';
import { getGame } from '../redux/selectors';
import { RootState } from '../redux/reducers';
import { Shot } from '../types';

const Game: React.FC = () => {
  const game = useSelector(getGame);
  const keyboard = useSelector((state: RootState) => state.keyboard);
  const displayForm = useSelector((state: RootState) => state.display);
  const save = useSelector((state: RootState) => state.saves.saveName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = 1184;
  const height = 740;
  const canvas = useRef<HTMLCanvasElement>(null);
  const requestID = useRef(0);
  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      if (ctx) updateCanvas(ctx, game);
    }
  }, [game]);
  useEffect(() => {
    dispatch(sagaRunFpsTimer());
    return (): void => {
      dispatch(sagaStopFpsTimer());
    };
  }, [dispatch]);
  const updatePerFrame = useCallback(() => {
    const { escape, arrowLeft, arrowRight, space } = keyboard;
    if (escape) return;
    requestID.current = requestAnimationFrame(updatePerFrame);
    let { readyToShoot, shotMagazine, shots, boxes, health } = game;
    const { passedPath, rocketX, asteroids } = game;
    shots = (shots
      .map((coords) => [coords[0], coords[1] - 5])
      .filter((coords) => coords[1] > 0) as unknown) as Shot[];
    boxes = boxes
      .map((params) => {
        const y = params.y + 2;
        return { ...params, y };
      })
      .filter((params) => params.y < 800);

    findCollisionsWithShots(asteroids, shots, boxes, dispatch);
    health = findCollisionsWithRocket(asteroids, rocketX, health, dispatch);

    if (health <= 0) {
      void navigate('/');
      dispatch(reset());
      return;
    }

    if (space && readyToShoot && shotMagazine > 0) {
      shots.push([rocketX, 625]);
      readyToShoot = false;
      shotMagazine -= 1;
    }
    if (passedPath % 5 === 0 && !readyToShoot) readyToShoot = true;
    if (passedPath % 30 === 0) dispatch(generateNewStars());
    if (passedPath % 75 === 0) {
      if (shotMagazine < 10) {
        shotMagazine += 1;
      }
    }
    if (passedPath % 100 === 0) {
      dispatch(generateAsteroid());
    }
    batch(() => {
      dispatch(
        updateGame(
          {
            readyToShoot,
            shotMagazine,
            shots,
            boxes,
            health,
          },
          { arrowLeft, arrowRight }
        )
      );
      dispatch(addFPS());
    });
  }, [dispatch, game, navigate, keyboard]);

  useEffect(() => {
    requestID.current = requestAnimationFrame(updatePerFrame);
    return (): void => {
      cancelAnimationFrame(requestID.current);
    };
  }, [updatePerFrame]);

  const stopTimers = useCallback(() => {
    cancelAnimationFrame(requestID.current);
    dispatch(sagaStopFpsTimer());
  }, [dispatch]);

  const runTimers = useCallback(() => {
    cancelAnimationFrame(requestID.current);
    requestID.current = requestAnimationFrame(updatePerFrame);
    dispatch(sagaRunFpsTimer());
  }, [dispatch, updatePerFrame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      switch (e.code) {
        case 'ArrowLeft':
          dispatch(toggleArrowLeft(true));
          break;
        case 'ArrowRight':
          dispatch(toggleArrowRight(true));
          break;
        case 'Space':
          dispatch(toggleSpace(true));
          break;
        case 'Escape':
          if (keyboard.escape) {
            runTimers();
            dispatch(sagaToggleEscape(false));
          } else {
            stopTimers();
            dispatch(sagaToggleEscape(true));
            dispatch(clearFPS());
          }
          break;
        default:
          break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent): void => {
      switch (e.code) {
        case 'ArrowLeft':
          dispatch(toggleArrowLeft(false));
          break;
        case 'ArrowRight':
          dispatch(toggleArrowRight(false));
          break;
        case 'Space':
          dispatch(toggleSpace(false));
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [dispatch, keyboard.escape, runTimers, stopTimers]);
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (save === '') return;
    runTimers();
    dispatch(sagaSaveGame(save));
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
