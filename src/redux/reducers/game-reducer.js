import { RESET, NEW_GAME, UPDATE_GAME, LOAD_GAME } from "../types";
import stars from "../../initial_state/stars.json";
const gameReducer = (state = { stars }, action) => {
  switch (action.type) {
    case NEW_GAME:
      return { ...state, ...action.payload };
    case LOAD_GAME:
      return { ...action.payload };
    case UPDATE_GAME:
      return { ...state, ...action.payload };
    case RESET: {
      return { stars };
    }
    default:
      return state;
  }
};
export default gameReducer;
