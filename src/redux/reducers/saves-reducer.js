import { GET_SAVES, CHANGE_SAVE_NAME } from "../actions-types";

const initialState = { saves: [], saveName: "" };

const savesReducer = (state = initialState, action) => {
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
