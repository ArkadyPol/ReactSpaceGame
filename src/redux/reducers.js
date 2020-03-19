import { LOADSAVES } from "./types";

function rootReducer(state = [], action) {
  switch (action.type) {
    case LOADSAVES:
      return state;
    default:
      return state;
  }
}
export default rootReducer;
