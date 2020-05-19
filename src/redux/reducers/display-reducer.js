import { TOGGLE_DISPLAY, RESET } from "../actions-types";

const displayReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_DISPLAY:
      return action.payload;
    case RESET:
      return false;
    default:
      return state;
  }
};
export default displayReducer;
