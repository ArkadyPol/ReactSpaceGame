import { LOAD_GAME, UPDATE_GAME, RESET } from '../../actions-types';
import { GameReducerAction } from '../../actions';
import { Box } from '../../../types';

const initialState = [] as Box[];

const boxesReducer = (
  state = initialState,
  action: GameReducerAction
): Box[] => {
  switch (action.type) {
    case LOAD_GAME: {
      return action.payload.boxes;
    }
    case UPDATE_GAME: {
      return state
        .map((params) => {
          const y = params.y + 2;
          return { ...params, y };
        })
        .filter((params) => params.y < 800);
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default boxesReducer;
