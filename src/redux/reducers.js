import { combineReducers } from "redux";
import { TOGGLE_DISPLAY, GET_SAVES, RESET } from "./types";
import stars from "../initial_state/stars.json";
import keyboard from "../initial_state/keyboard.json";
function displayReducer(state = false, action) {
  switch (action.type) {
    case TOGGLE_DISPLAY:
      return action.payload;
    case RESET:
      return false;
    default:
      return state;
  }
}
function savesReducer(state = [], action) {
  switch (action.type) {
    case GET_SAVES:
      return action.payload;
    default:
      return state;
  }
}
function gameReducer(state = { stars }, action) {
  switch (action.type) {
    default:
      return state;
  }
}
function keyboardReducer(state = keyboard, action) {
  switch (action.type) {
    case RESET:
      return keyboard;
    default:
      return state;
  }
}
function fpsReducer(state = 0, action) {
  switch (action.type) {
    case RESET:
      return 0;
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  display: displayReducer,
  saves: savesReducer,
  game: gameReducer,
  keyboard: keyboardReducer,
  fps: fpsReducer
});

export default rootReducer;
