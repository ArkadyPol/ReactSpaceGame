import { GET_SAVES, CHANGE_SAVE_NAME } from "../actions-types";
import { GetSaveActionType, ChangeSaveNameActionType } from "../actions";

const initialState = { saves: [] as string[], saveName: "" };

type InitialStateType = typeof initialState;

const savesReducer = (
  state = initialState,
  action: GetSaveActionType | ChangeSaveNameActionType
): InitialStateType => {
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
