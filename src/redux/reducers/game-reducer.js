import { RESET, NEW_GAME, UPDATE_GAME, LOAD_GAME } from "../types";
import stars from "./stars.json";

const initialState = {
  stars,
  asteroids: [],
  boxes: [],
  health: 100,
  passedPath: 0,
  readyToShoot: true,
  rocketX: 592,
  shotMagazine: 10,
  shots: [],
  velocity: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME:
    case UPDATE_GAME:
      return { ...state, ...action.payload };
    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
};
export default gameReducer;
