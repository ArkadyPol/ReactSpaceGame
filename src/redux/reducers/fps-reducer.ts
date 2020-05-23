import { RESET, UPDATE_GAME, CLEAR_FPS } from '../actions-types';
import { ResetAction, ClearFPSAction, UpdateGameAction } from '../actions';

const fpsReducer = (
  state = 0,
  action: UpdateGameAction | ResetAction | ClearFPSAction
): number => {
  switch (action.type) {
    case RESET:
      return 0;
    case CLEAR_FPS:
      console.log('fps:', Math.round(state / 5));
      return 0;
    case UPDATE_GAME:
      return state + 1;
    default:
      return state;
  }
};
export default fpsReducer;
