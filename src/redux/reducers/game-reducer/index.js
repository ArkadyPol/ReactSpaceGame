import { combineReducers } from "redux";
import { RESET, UPDATE_GAME, LOAD_GAME } from "../../types";
import starsReducer from "./stars-reducer";

const initialState = {
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

const restGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME: {
      const { stars, ...game } = action.payload;
      return { ...state, ...game };
    }
    case UPDATE_GAME:
      return { ...state, ...action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  stars: starsReducer,
  game: restGameReducer,
});

export default gameReducer;
