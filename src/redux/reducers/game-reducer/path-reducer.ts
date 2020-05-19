import { RESET, UPDATE_GAME, LOAD_GAME } from "../../actions-types";
import { GameReducerActionType } from "../../actions";

const pathReducer = (state = 0, action: GameReducerActionType): number => {
  switch (action.type) {
    case LOAD_GAME:
      return action.payload.passedPath;
    case UPDATE_GAME:
      return state + 1;
    case RESET:
      return 0;
    default:
      return state;
  }
};

export default pathReducer;
