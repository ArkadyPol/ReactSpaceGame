import { LOAD_SAVES, TOGGLE_DISPLAY } from "./types";
import { getSaves } from "../logic";

export function loadSaves() {
  return async dispatch => {
    const saves = await getSaves();
    dispatch({ type: LOAD_SAVES, saves });
  };
}
export function toggleDisplay(display) {
  return {
    type: TOGGLE_DISPLAY,
    display
  };
}
