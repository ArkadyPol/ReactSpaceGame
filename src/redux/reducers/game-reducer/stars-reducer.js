import stars from "./stars.json";
import { RESET, UPDATE_GAME, LOAD_GAME } from "../../types";

const starsReducer = (state = stars, action) => {
  switch (action.type) {
    case LOAD_GAME:
      return action.payload.stars;
    case UPDATE_GAME:
      return state
        .map((params) => [params[0], params[1] + 0.5, params[2]])
        .filter((params) => params[1] < 750);
    case RESET:
      return stars;
    default:
      return state;
  }
};

export default starsReducer;
