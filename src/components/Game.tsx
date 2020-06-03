import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import updateCanvas from '../canvas';
import {
  sagaToggleEscape,
  saveGame,
  runFpsTimer,
  stopFpsTimer,
  sagaUpdateGame,
  toggleKey,
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
  const width = 1184;
  const height = 740;
  const canvas = useRef<HTMLCanvasElement>(null);
  const requestID = useRef(0);
  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      if (ctx) updateCanvas(ctx, game, keyboard.keyI);
    }
  }, [game, keyboard.keyI]);
  useEffect(() => {
    dispatch(runFpsTimer());
    return (): void => {
      dispatch(stopFpsTimer());
    };
  }, [dispatch]);
  const updatePerFrame = useCallback(() => {
    requestID.current = requestAnimationFrame(updatePerFrame);
    dispatch(sagaUpdateGame());
  }, [dispatch]);

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
          dispatch(toggleKey('arrowLeft', true));
          break;
        case 'ArrowRight':
          dispatch(toggleKey('arrowRight', true));
          break;
        case 'Space':
          dispatch(toggleKey('space', true));
          break;
        case 'Escape':
          if (keyboard.escape) {
            runTimers();
            dispatch(sagaToggleEscape(false));
          } else {
            stopTimers();
            dispatch(sagaToggleEscape(true));
          }
          dispatch(toggleKey('keyI', false));
          break;
        case 'KeyI':
          if (keyboard.keyI && !keyboard.escape) {
            runTimers();
            dispatch(toggleKey('keyI', false));
          } else {
            stopTimers();
            dispatch(toggleKey('keyI', true));
          }
          break;
        default:
          break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent): void => {
      switch (e.code) {
        case 'ArrowLeft':
          dispatch(toggleKey('arrowLeft', false));
          break;
        case 'ArrowRight':
          dispatch(toggleKey('arrowRight', false));
          break;
        case 'Space':
          dispatch(toggleKey('space', false));
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
  }, [dispatch, keyboard.escape, keyboard.keyI, runTimers, stopTimers]);
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
