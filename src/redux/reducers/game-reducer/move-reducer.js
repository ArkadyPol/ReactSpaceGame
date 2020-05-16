import { RESET, UPDATE_GAME, LOAD_GAME } from "../../types";

const initialState = {
  rocketX: 592,
  velocity: 0,
};

const moveReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME:
      return {
        ...state,
        rocketX: action.payload.rocketX,
        velocity: action.payload.velocity,
      };
    case UPDATE_GAME: {
      let { rocketX } = state;
      const { velocity } = action.payload;
      rocketX += velocity;
      if (rocketX < 15) {
        return { rocketX: 15, velocity: 0 };
      }
      if (rocketX > 1169) {
        return { rocketX: 1169, velocity: 0 };
      }
      return { rocketX, velocity };
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default moveReducer;
