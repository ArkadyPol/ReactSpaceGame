import { LOAD_GAME, UPDATE_GAME, RESET, DROP_BOX } from '../../actions-types';
import { GameReducerAction, DropBoxAction } from '../../actions';
import { Box } from '../../../types';
import randomInteger from '../../../logic';

const initialState = [] as readonly Box[];

const colors = {
  iron: 'red',
  gold: 'gold',
  platinum: '#b1e7fc',
};

const boxesReducer = (
  state = initialState,
  action: GameReducerAction | DropBoxAction
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
      let color;
      const percent = randomInteger(0, 99);
      if (percent < chances[0]) color = colors.platinum;
      else if (percent < chances[1]) color = colors.gold;
      else color = colors.iron;
      const box: Box = { x, y, color };
      return [...state, box];
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default boxesReducer;
