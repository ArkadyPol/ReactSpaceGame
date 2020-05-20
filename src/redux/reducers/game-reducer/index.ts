import { combineReducers } from "redux";
import { RESET, UPDATE_GAME, LOAD_GAME } from "../../actions-types";
import starsReducer from "./stars-reducer";
import pathReducer from "./path-reducer";
import moveReducer from "./move-reducer";
import { RestGameStateType } from "../../../types";
import { GameReducerActionType } from "../../actions";

const initialState: RestGameStateType = {
  asteroids: [],
  boxes: [],
  health: 100,
  readyToShoot: true,
  shotMagazine: 10,
  shots: [],
};

const restGameReducer = (
  state = initialState,
  action: GameReducerActionType
): RestGameStateType => {
  switch (action.type) {
    case LOAD_GAME: {
      const { stars, passedPath, velocity, rocketX, ...game } = action.payload;
      return { ...state, ...game };
    }
    case UPDATE_GAME: {
      return { ...action.payload };
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
