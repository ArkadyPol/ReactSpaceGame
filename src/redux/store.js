import rootReducer from "./reducers";
import { createStore } from "redux";
import thunk from "react-redux";
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store as default };
