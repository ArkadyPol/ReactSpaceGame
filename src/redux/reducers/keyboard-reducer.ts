import { RESET, TOGGLE_KEY } from '../actions-types';
import { ResetAction, ToggleKeyAction } from '../actions';

const initialState = {
  arrowLeft: false,
  arrowRight: false,
  escape: false,
  space: false,
  keyI: false,
};

type InitialState = typeof initialState;

const keyboardReducer = (
  state = initialState,
  action: ResetAction | ToggleKeyAction
): InitialState => {
  switch (action.type) {
    case RESET:
      return initialState;
    case TOGGLE_KEY: {
      const { key, isOn } = action.payload;
      return { ...state, [key]: isOn };
    }
    default:
      return state;
  }
};
export default keyboardReducer;
