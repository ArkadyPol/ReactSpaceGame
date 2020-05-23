import { combineReducers } from 'redux';
import { RESET, UPDATE_GAME, LOAD_GAME } from '../../actions-types';
import starsReducer from './stars-reducer';
import pathReducer from './path-reducer';
import moveReducer from './move-reducer';
import asteroidsReducer from './asteroids-reducer';
import healthReducer from './health-reducer';
import shotsReducer from './shots-reducer';
import { RestGameState } from '../../../types';
import { GameReducerAction } from '../../actions';

const initialState: RestGameState = {
  boxes: [],
};

const restGameReducer = (
  state = initialState,
  action: GameReducerAction
): RestGameState => {
  switch (action.type) {
    case LOAD_GAME: {
      return { ...state, boxes: action.payload.boxes };
    }
    case UPDATE_GAME: {
      return { ...action.payload };
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  stars: starsReducer,
  passedPath: pathReducer,
  move: moveReducer,
  asteroids: asteroidsReducer,
  health: healthReducer,
  shotsState: shotsReducer,
  game: restGameReducer,
});

export default gameReducer;
