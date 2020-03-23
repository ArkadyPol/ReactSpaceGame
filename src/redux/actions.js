import {
  GET_SAVES,
  TOGGLE_DISPLAY,
  RESET,
  NEW_GAME,
  ADD_FPS,
  CLEAR_FPS,
  UPDATE_GAME,
  TOGGLE_ARROW_RIGHT,
  TOGGLE_ARROW_LEFT,
  TOGGLE_SPACE,
  TOGGLE_ESCAPE
} from "./types";

export function getSaves() {
  return async dispatch => {
    const response = await fetch("/saves");
    const saves = await response.json();
    dispatch({ type: GET_SAVES, payload: saves });
  };
}
export function toggleDisplay(display) {
  return {
    type: TOGGLE_DISPLAY,
    payload: display
  };
}
export function reset() {
  return dispatch => {
    setTimeout(() => dispatch({ type: RESET }), 100);
  };
}
export function startNewGame() {
  return async dispatch => {
    const response = await fetch("/newGame");
    const game = await response.json();
    dispatch({ type: NEW_GAME, payload: game });
  };
}
export function addFPS() {
  return { type: ADD_FPS };
}
export function clearFPS() {
  return { type: CLEAR_FPS };
}
export function updateGame(game) {
  return { type: UPDATE_GAME, payload: game };
}
export function toggleArrowLeft(key) {
  return {
    type: TOGGLE_ARROW_LEFT,
    payload: key
  };
}
export function toggleArrowRight(key) {
  return {
    type: TOGGLE_ARROW_RIGHT,
    payload: key
  };
}
export function toggleSpace(key) {
  return {
    type: TOGGLE_SPACE,
    payload: key
  };
}
export function toggleEscape() {
  return {
    type: TOGGLE_ESCAPE
  };
}
