import { TOGGLE_DISPLAY, RESET } from "../actions-types";
import { ToggleDisplayActionType, ResetActionType } from "../actions";

const displayReducer = (
  state = false,
  action: ToggleDisplayActionType | ResetActionType
): boolean => {
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
