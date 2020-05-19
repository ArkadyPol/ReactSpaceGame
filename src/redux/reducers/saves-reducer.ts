import { GET_SAVES, CHANGE_SAVE_NAME } from "../actions-types";
import { GetSaveActionType, ChangeSaveNameActionType } from "../actions";

type InitialStateType = {
  saves: string[];
  saveName: string;
};

const initialState: InitialStateType = { saves: [], saveName: "" };

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
