import {
  LOAD_GAME,
  UPDATE_GAME,
  RESET,
  DROP_BOX,
  CATCH_BOX,
} from '../../actions-types';
import {
  GameReducerAction,
  DropBoxAction,
  CatchBoxAction,
} from '../../actions';
import { Box, Raw } from '../../../types';
import randomInteger from '../../../logic';

const initialState = [] as readonly Box[];

const colors = {
  iron: 'red',
  gold: 'gold',
  platinum: '#b1e7fc',
};

const boxesReducer = (
  state = initialState,
  action: GameReducerAction | DropBoxAction | CatchBoxAction
): readonly Box[] => {
  switch (action.type) {
    case LOAD_GAME: {
      return action.payload.boxes;
    }
    case UPDATE_GAME: {
      return state
        .map((params) => {
          const y = params.y + 2;
          return { ...params, y };
        })
        .filter((params) => params.y < 800);
    }
    case DROP_BOX: {
      const { x, y, size } = action.payload;
      const chance = ((size - 10) / 90) * 15 + 5;
      const c = (100 - chance) / chance; // a*x^2 + b*x - c = 0; a = 1; b = 1;
      const koef = (Math.sqrt(1 + 4 * c) - 1) / 2; // positive solution of a quadratic equation
      const chances = [chance, chance * koef + chance].map((num) =>
        Math.round(num)
      );
      let raw: Raw;
      const percent = randomInteger(0, 99);
      if (percent < chances[0]) raw = 'platinum';
      else if (percent < chances[1]) raw = 'gold';
      else raw = 'iron';
      const box: Box = { x, y, raw, count: size, color: colors[raw] };
      return [...state, box];
    }
    case CATCH_BOX:
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1),
      ];
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default boxesReducer;
