import { RESET, LOAD_GAME, CATCH_BOX } from '../../actions-types';
import { ResetAction, LoadGameAction, CatchBoxAction } from '../../actions';
import { Items } from '../../../types';

const initialState: Items = {
  iron: 0,
  gold: 0,
  platinum: 0,
};

const itemsReducer = (
  state = initialState,
  action: ResetAction | LoadGameAction | CatchBoxAction
): Items => {
  switch (action.type) {
    case LOAD_GAME:
      return action.payload.items;
    case RESET:
      return initialState;
    case CATCH_BOX: {
      const { raw, count } = action.payload;
      return {
        ...state,
        [raw]: state[raw] + count,
      };
    }
    default:
      return state;
  }
};

export default itemsReducer;
