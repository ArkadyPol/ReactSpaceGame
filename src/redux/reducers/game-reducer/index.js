import { combineReducers } from "redux";
import { RESET, UPDATE_GAME, LOAD_GAME } from "../../types";
import starsReducer from "./stars-reducer";
import pathReducer from "./path-reducer";
import moveReducer from "./move-reducer";

const initialState = {
  asteroids: [],
  boxes: [],
  health: 100,
  readyToShoot: true,
  shotMagazine: 10,
  shots: [],
};

const restGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME: {
      const { stars, passedPath, velocity, rocketX, ...game } = action.payload;
      return { ...state, ...game };
    }
    case UPDATE_GAME: {
      const { velocity, ...game } = action.payload;
      return { ...state, ...game };
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  stars: starsReducer,
  passedPath: pathReducer,
  move: moveReducer,
  game: restGameReducer,
});

export default gameReducer;
