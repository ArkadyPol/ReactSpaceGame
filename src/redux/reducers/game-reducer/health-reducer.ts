import { RESET, LOAD_GAME, DAMAGE_ROCKET } from '../../actions-types';
import { LoadGameAction, ResetAction, DamageRocketAction } from '../../actions';

const healthReducer = (
  state = 100,
  action: LoadGameAction | ResetAction | DamageRocketAction
): number => {
  switch (action.type) {
    case LOAD_GAME:
      return action.payload.health;
    case DAMAGE_ROCKET:
      console.log('damage:', action.payload);
      return state - action.payload;
    case RESET:
      return 100;
    default:
      return state;
  }
};

export default healthReducer;
