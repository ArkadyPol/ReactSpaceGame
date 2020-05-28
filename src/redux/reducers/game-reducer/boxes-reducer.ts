import { LOAD_GAME, UPDATE_GAME, RESET, DROP_BOX } from '../../actions-types';
import { GameReducerAction, DropBoxAction } from '../../actions';
import { Box } from '../../../types';

const initialState = [] as readonly Box[];

const boxesReducer = (
  state = initialState,
  action: GameReducerAction | DropBoxAction
): readonly Box[] => {
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
    case DROP_BOX:
      return [...state, action.payload];
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default boxesReducer;
