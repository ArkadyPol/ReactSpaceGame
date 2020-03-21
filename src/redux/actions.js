import {
  GET_SAVES,
  TOGGLE_DISPLAY,
  RESET,
  NEW_GAME,
  ADD_FPS,
  CLEAR_FPS
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
export function startNewGame() {
  return async dispatch => {
    const response = await fetch("/newGame");
    const game = await response.json();
    dispatch({ type: NEW_GAME, payload: game });
    dispatch({ type: RESET });
  };
}
export function addFPS() {
  return { type: ADD_FPS };
}
export function clearFPS() {
  return { type: CLEAR_FPS };
}
