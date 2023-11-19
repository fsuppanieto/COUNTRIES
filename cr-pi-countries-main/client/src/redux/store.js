import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

export const store = createStore(rootReducer, applyMiddleware(thunk));
//configureStore es una version mejorada y actualizada de createStore, la cual quedo en desuso
