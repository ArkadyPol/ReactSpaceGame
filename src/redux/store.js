import rootReducer from "./reducers";
import { createStore } from "redux";
import thunk from "react-redux";
const store = createStore(rootReducer);
