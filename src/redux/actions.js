import * as t from "./types";

export const addFPS = () => ({ type: t.ADD_FPS });

export const changeSaveName = (save) => ({
  type: t.CHANGE_SAVE_NAME,
  payload: save,
});

export const clearFPS = () => ({ type: t.CLEAR_FPS });

export const getSaves = () => ({
  type: t.SAGA_GET_SAVES,
});

export const loadGame = (save) => ({
  type: t.SAGA_LOAD_GAME,
  save,
});

export const reset = () => ({ type: t.RESET });

export const runFpsTimer = () => ({ type: t.SAGA_RUN_FPS_TIMER });

export const saveGame = (saveName) => ({
  type: t.SAGA_SAVE_GAME,
  saveName,
});

export const stopFpsTimer = () => ({ type: t.SAGA_STOP_FPS_TIMER });

export const toggleArrowLeft = (key) => ({
  type: t.TOGGLE_ARROW_LEFT,
  payload: key,
});

export const toggleArrowRight = (key) => ({
  type: t.TOGGLE_ARROW_RIGHT,
  payload: key,
});

export const toggleDisplay = (display) => ({
  type: t.TOGGLE_DISPLAY,
  payload: display,
});

export const toggleEscape = (key) => ({
  type: t.SAGA_TOGGLE_ESCAPE,
  key,
});

export const toggleSpace = (key) => ({
  type: t.TOGGLE_SPACE,
  payload: key,
});

export const updateGame = (game) => ({ type: t.UPDATE_GAME, payload: game });
