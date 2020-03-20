import { TOGGLEDISPLAY, LOADSAVES } from "./types";
import { combineReducers } from "redux";
function displayReducer(state = false, action) {
  switch (action.type) {
    case TOGGLEDISPLAY:
      return action.display;
    default:
      return state;
  }
}
function savesReducer(state = [], action) {
  switch (action.type) {
    case LOADSAVES:
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
