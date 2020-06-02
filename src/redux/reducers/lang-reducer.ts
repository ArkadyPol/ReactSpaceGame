import { CHANGE_LANGUAGE } from '../actions-types';
import { ChangeLanguageAction } from '../actions';
import { Language } from '../../types';

const data = {
  EN: {
    newGame: 'New game',
    loadGame: 'Load game',
    saveGame: 'Save game',
    returnBack: 'Return to main menu',
  },
  RU: {
    newGame: 'Новая игра',
    loadGame: 'Загрузить игру',
    saveGame: 'Сохранить игру',
    returnBack: 'Вернуться в главное меню',
  },
};

const initialState = {
  value: 'EN' as Language,
  currentLang: data.EN,
};

type InitialState = typeof initialState;

const langReducer = (
  state = initialState,
  action: ChangeLanguageAction
): InitialState => {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      const lang = action.payload;
      const currentLang = data[lang];
      return { ...state, value: lang, currentLang };
    }
    default:
      return state;
  }
};
export default langReducer;
