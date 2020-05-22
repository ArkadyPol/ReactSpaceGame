import { RESET, UPDATE_GAME, LOAD_GAME } from "../../actions-types";
import { AsteroidType } from "../../../types";
import { GameReducerActionType } from "../../actions";

const initialState = [] as AsteroidType[];

const asteroidsReducer = (
  state = initialState,
  action: GameReducerActionType
): AsteroidType[] => {
  switch (action.type) {
    case LOAD_GAME:
      return action.payload.asteroids;
    case UPDATE_GAME:
      return state
        .map((params) => {
          const x = params.x + params.vX;
          const y = params.y + params.vY;
          return { ...params, x, y };
        })
        .filter((params) => params.y < 850);
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default asteroidsReducer;
