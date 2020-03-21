import { GET_SAVES, TOGGLE_DISPLAY, RESET, NEW_GAME } from "./types";

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
