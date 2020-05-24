import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from '@reach/router';
import updateCanvas from '../canvas';
import {
  updateGame,
  clearFPS,
  toggleArrowLeft,
  toggleArrowRight,
  toggleSpace,
  sagaToggleEscape,
  saveGame,
  runFpsTimer,
  stopFpsTimer,
  generateNewStars,
  generateAsteroid,
  readyShoot,
  addShot,
} from '../redux/actions';
import Form from './Form';
import Buttons from './ButtonsGame';
import '../styles/App.css';
import { getGame } from '../redux/selectors';
import { RootState } from '../redux/reducers';

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
    dispatch(runFpsTimer());
    return (): void => {
      dispatch(stopFpsTimer());
    };
  }, [dispatch]);
  const updatePerFrame = useCallback(() => {
    const { escape, arrowLeft, arrowRight, space } = keyboard;
    if (escape) return;
    requestID.current = requestAnimationFrame(updatePerFrame);
    const { passedPath, health } = game;
    const { shotMagazine, readyToShoot } = game.shotsState;
    const { rocketX } = game.move;
    if (health <= 0) {
      void navigate('/');
      return;
    }
    if (passedPath % 5 === 0 && !readyToShoot) dispatch(readyShoot());
    if (passedPath % 30 === 0) dispatch(generateNewStars());
    if (passedPath % 75 === 0 && shotMagazine < 10) {
      dispatch(addShot());
    }
    if (passedPath % 100 === 0) {
      dispatch(generateAsteroid());
    }
    dispatch(updateGame({ arrowLeft, arrowRight, rocketX, space }));
  }, [dispatch, game, navigate, keyboard]);

  useEffect(() => {
    requestID.current = requestAnimationFrame(updatePerFrame);
    return (): void => {
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
