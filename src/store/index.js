import * as redux from "redux";
import rootReducer from "./reducers"; 
import { thunk } from 'redux-thunk'; // Correct way to import

export default redux.createStore(rootReducer, redux.applyMiddleware(thunk));
