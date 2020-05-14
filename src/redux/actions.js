import {
  TOGGLE_DISPLAY,
  RESET,
  ADD_FPS,
  CLEAR_FPS,
  UPDATE_GAME,
  TOGGLE_ARROW_RIGHT,
  TOGGLE_ARROW_LEFT,
  TOGGLE_SPACE,
  CHANGE_SAVE_NAME,
} from "./types";

export const toggleDisplay = (display) => ({
  type: TOGGLE_DISPLAY,
  payload: display,
});

export const reset = () => ({ type: RESET });

export const addFPS = () => ({ type: ADD_FPS });

export const clearFPS = () => ({ type: CLEAR_FPS });

export const updateGame = (game) => ({ type: UPDATE_GAME, payload: game });

export const toggleArrowLeft = (key) => ({
  type: TOGGLE_ARROW_LEFT,
  payload: key,
});

export const toggleArrowRight = (key) => ({
  type: TOGGLE_ARROW_RIGHT,
  payload: key,
});

export const toggleSpace = (key) => ({
  type: TOGGLE_SPACE,
  payload: key,
});

export const changeSaveName = (save) => ({
  type: CHANGE_SAVE_NAME,
  payload: save,
});
