import {
  RESET,
  TOGGLE_ARROW_LEFT,
  TOGGLE_ARROW_RIGHT,
  TOGGLE_SPACE,
  TOGGLE_ESCAPE,
} from "../types";

const initialState = {
  arrowLeft: false,
  arrowRight: false,
  escape: false,
  space: false,
};

const keyboardReducer = (state = initialState, action) => {
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
      return { ...state, escape: !state.escape };
    default:
      return state;
  }
};
export default keyboardReducer;
