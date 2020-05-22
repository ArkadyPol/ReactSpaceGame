import { GET_SAVES, CHANGE_SAVE_NAME } from '../actions-types';
import { GetSaveAction, ChangeSaveNameAction } from '../actions';

const initialState = { saves: [] as string[], saveName: '' };

type InitialState = typeof initialState;

const savesReducer = (
  state = initialState,
  action: GetSaveAction | ChangeSaveNameAction
): InitialState => {
  switch (action.type) {
    case GET_SAVES:
      return { ...state, saves: action.payload };
    case CHANGE_SAVE_NAME:
      return { ...state, saveName: action.payload };
    default:
      return state;
  }
};
export default savesReducer;
