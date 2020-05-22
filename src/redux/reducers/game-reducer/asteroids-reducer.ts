import { RESET, UPDATE_GAME, LOAD_GAME } from '../../actions-types';
import { Asteroid } from '../../../types';
import { GameReducerAction } from '../../actions';

const initialState = [] as Asteroid[];

const asteroidsReducer = (
  state = initialState,
  action: GameReducerAction
): Asteroid[] => {
  switch (action.type) {
    case LOAD_GAME:
      return action.payload.asteroids;
    case UPDATE_GAME:
      return state
        .map((params) => {
          const x = params.x + params.vX;
          const y = params.y + params.vY;
          return { ...params, x, y };
        })
        .filter((params) => params.y < 850);
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default asteroidsReducer;
