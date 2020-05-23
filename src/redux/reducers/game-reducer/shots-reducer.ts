import {
  RESET,
  UPDATE_GAME,
  LOAD_GAME,
  READY_SHOOT,
  ADD_SHOT,
} from '../../actions-types';
import { Shot } from '../../../types';
import {
  GameReducerAction,
  ReadyShootAction,
  AddShotAction,
} from '../../actions';

const initialState = {
  readyToShoot: true,
  shotMagazine: 10,
  shots: [] as Shot[],
};

export type ShotsState = typeof initialState;

const shotsReducer = (
  state = initialState,
  action: GameReducerAction | ReadyShootAction | AddShotAction
): ShotsState => {
  switch (action.type) {
    case LOAD_GAME: {
      const { readyToShoot, shotMagazine, shots } = action.payload;
      return { ...state, readyToShoot, shotMagazine, shots };
    }
    case UPDATE_GAME: {
      let { shots, readyToShoot, shotMagazine } = state;
      shots = (state.shots
        .map((coords) => [coords[0], coords[1] - 5])
        .filter((coords) => coords[1] > 0) as unknown) as Shot[];
      if (action.state.space && readyToShoot && state.shotMagazine > 0) {
        shots.push([action.state.rocketX, 625]);
        readyToShoot = false;
        shotMagazine -= 1;
      }
      return { ...state, shots, readyToShoot, shotMagazine };
    }
    case READY_SHOOT: {
      return { ...state, readyToShoot: true };
    }
    case ADD_SHOT: {
      return { ...state, shotMagazine: state.shotMagazine + 1 };
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default shotsReducer;
