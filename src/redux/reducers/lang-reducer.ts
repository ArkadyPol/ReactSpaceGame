import { CHANGE_LANGUAGE } from '../actions-types';
import { ChangeLanguageAction } from '../actions';
import { Language } from '../../types';

const initialState = {
  value: 'RU' as Language,
};

type InitialState = typeof initialState;

const langReducer = (
  state = initialState,
  action: ChangeLanguageAction
): InitialState => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};
export default langReducer;
