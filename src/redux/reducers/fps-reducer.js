import { RESET, ADD_FPS, CLEAR_FPS } from "../types";

const fpsReducer = (state = 0, action) => {
  switch (action.type) {
    case RESET:
      return 0;
    case CLEAR_FPS:
      console.log("fps:", Math.round(state / 5));
      return 0;
    case ADD_FPS:
      return state + 1;
    default:
      return state;
  }
};
export default fpsReducer;
