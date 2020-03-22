import { combineReducers } from "redux";
import {
  TOGGLE_DISPLAY,
  GET_SAVES,
  RESET,
  NEW_GAME,
  ADD_FPS,
  CLEAR_FPS,
  UPDATE_GAME,
  TOGGLE_ARROW_LEFT,
  TOGGLE_ARROW_RIGHT,
  TOGGLE_SPACE,
  TOGGLE_ESCAPE
} from "./types";
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
    case NEW_GAME:
      return { ...action.payload, stars };
    case UPDATE_GAME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
function keyboardReducer(state = keyboard, action) {
  switch (action.type) {
    case RESET:
      return keyboard;
    case TOGGLE_ARROW_LEFT:
      return { ...state, arrowLeft: action.payload };
    case TOGGLE_ARROW_RIGHT:
      return { ...state, arrowRight: action.payload };
    case TOGGLE_SPACE:
      return { ...state, space: action.payload };
    case TOGGLE_ESCAPE:
      return { ...state, escape: !state.escape };
    default:
      return state;
  }
}
function fpsReducer(state = 0, action) {
  switch (action.type) {
    case RESET:
      return 0;
    case CLEAR_FPS:
      console.log("fps:", Math.round(state / 5));
      return 0;
    case ADD_FPS:
      return state + 1;
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
