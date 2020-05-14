import {
  GET_SAVES,
  TOGGLE_DISPLAY,
  RESET,
  ADD_FPS,
  CLEAR_FPS,
  UPDATE_GAME,
  TOGGLE_ARROW_RIGHT,
  TOGGLE_ARROW_LEFT,
  TOGGLE_SPACE,
  TOGGLE_ESCAPE,
  CHANGE_SAVE_NAME,
  SAVE_GAME,
  LOAD_GAME,
} from "./types";

export const getSaves = () => {
  return async (dispatch) => {
    const response = await fetch("/saves");
    const saves = await response.json();
    dispatch({ type: GET_SAVES, payload: saves });
  };
};
export const toggleDisplay = (display) => {
  return {
    type: TOGGLE_DISPLAY,
    payload: display,
  };
};
export const reset = () => {
  return (dispatch) => {
    setTimeout(() => dispatch({ type: RESET }), 100);
  };
};
export const addFPS = () => {
  return { type: ADD_FPS };
};
export const clearFPS = () => {
  return { type: CLEAR_FPS };
};
export const updateGame = (game) => {
  return { type: UPDATE_GAME, payload: game };
};
export const toggleArrowLeft = (key) => {
  return {
    type: TOGGLE_ARROW_LEFT,
    payload: key,
  };
};
export const toggleArrowRight = (key) => {
  return {
    type: TOGGLE_ARROW_RIGHT,
    payload: key,
  };
};
export const toggleSpace = (key) => {
  return {
    type: TOGGLE_SPACE,
    payload: key,
  };
};
export const toggleEscape = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ESCAPE });
    dispatch(toggleDisplay(false));
  };
};
export const changeSaveName = (save) => {
  return {
    type: CHANGE_SAVE_NAME,
    payload: save,
  };
};
export const saveGame = (saveName) => {
  return (dispatch, getState) => {
    let game = getState().game;
    let save = { saveName, game };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(save),
    };
    fetch("/saves", options);
    dispatch({ type: SAVE_GAME, payload: save });
    dispatch(getSaves());
    dispatch(toggleEscape());
  };
};
export const loadGame = (save) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ name: save }),
    };
    const response = await fetch("/save", options);
    const game = await response.json();
    dispatch({ type: LOAD_GAME, payload: game });
    dispatch(toggleDisplay(false));
  };
};
