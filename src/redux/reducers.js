import { combineReducers } from "redux";
import { TOGGLE_DISPLAY, LOAD_SAVES } from "./types";
function displayReducer(state = false, action) {
  switch (action.type) {
    case TOGGLE_DISPLAY:
      return action.display;
    default:
      return state;
  }
}
function savesReducer(state = [], action) {
  switch (action.type) {
    case LOAD_SAVES:
      return action.saves;
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  display: displayReducer,
  saves: savesReducer
});

export default rootReducer;
