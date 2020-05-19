import { RESET, UPDATE_GAME, LOAD_GAME } from "../../actions-types";

const calculateVelocity = ({ velocity, arrowLeft, arrowRight }) => {
  let newVelocity = velocity;
  if (Math.abs(newVelocity) < 0.12) newVelocity = 0;
  if (newVelocity > 0) newVelocity -= 0.12;
  if (newVelocity < 0) newVelocity += 0.12;
  if (arrowLeft) {
    newVelocity -= 0.3;
  }
  if (arrowRight) {
    newVelocity += 0.3;
  }
  return newVelocity;
};

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
      const { arrowLeft, arrowRight } = action.state;
      const velocity = calculateVelocity({
        velocity: state.velocity,
        arrowLeft,
        arrowRight,
      });
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
