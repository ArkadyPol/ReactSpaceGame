import { GET_SAVES, TOGGLE_DISPLAY, RESET } from "./types";

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
  return {
    type: RESET
  };
}
