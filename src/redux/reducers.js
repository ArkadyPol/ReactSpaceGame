import { TOGGLEDISPLAY } from "./types";

function rootReducer(state = false, action) {
  switch (action.type) {
    case TOGGLEDISPLAY:
      return action.display;
    default:
      return state;
  }
}
export default rootReducer;
