import {
  RESET,
  UPDATE_GAME,
  LOAD_GAME,
  GENERATE_ASTEROID,
  ADD_ASTEROID,
  DESTROY_ASTEROID,
} from '../../actions-types';
import { Asteroid } from '../../../types';
import {
  GameReducerAction,
  GenerateAsteroidAction,
  AddAsteroidAction,
  DestroyAsteroidAction,
} from '../../actions';
import randomInteger from '../../../logic';

const generateAsteroid = (): Asteroid => {
  const x = randomInteger(20, 1164);
  const y = -200;
  const size = randomInteger(10, 100);
  const vX = randomInteger(-3, 3);
  const vY = randomInteger(4, 12);
  return {
    x,
    y,
    size,
    vX,
    vY,
  };
};

const initialState = [] as readonly Asteroid[];

const asteroidsReducer = (
  state = initialState,
  action:
    | GameReducerAction
    | GenerateAsteroidAction
    | AddAsteroidAction
    | DestroyAsteroidAction
): readonly Asteroid[] => {
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
    case GENERATE_ASTEROID:
      return [...state, generateAsteroid()];
    case ADD_ASTEROID:
      return [...state, action.payload];
    case DESTROY_ASTEROID:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default asteroidsReducer;
