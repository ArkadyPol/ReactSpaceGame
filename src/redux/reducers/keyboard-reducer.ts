import {
  RESET,
  TOGGLE_ARROW_LEFT,
  TOGGLE_ARROW_RIGHT,
  TOGGLE_SPACE,
  TOGGLE_ESCAPE,
} from "../actions-types";
import {
  ResetAction,
  ToggleSpaceAction,
  ToggleArrowLeftAction,
  ToggleEscapeAction,
  ToggleArrowRightAction,
} from "../actions";

const initialState = {
  arrowLeft: false,
  arrowRight: false,
  escape: false,
  space: false,
};

type InitialState = typeof initialState;

const keyboardReducer = (
  state = initialState,
  action:
    | ResetAction
    | ToggleSpaceAction
    | ToggleArrowLeftAction
    | ToggleEscapeAction
    | ToggleArrowRightAction
): InitialState => {
  switch (action.type) {
    case RESET:
      return initialState;
    case TOGGLE_ARROW_LEFT:
      return { ...state, arrowLeft: action.payload };
    case TOGGLE_ARROW_RIGHT:
      return { ...state, arrowRight: action.payload };
    case TOGGLE_SPACE:
      return { ...state, space: action.payload };
    case TOGGLE_ESCAPE:
      return { ...state, escape: action.payload };
    default:
      return state;
  }
};
export default keyboardReducer;
