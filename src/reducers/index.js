import { combineReducers } from "redux";
import { userReducer } from './users'
import { moviesReducer } from "./movies";
import { membersReducer } from "./members";
import { buttonsReducer } from "./buttons";

export const rootReducer = combineReducers({
    userReducer,
    moviesReducer,
    membersReducer,
    buttonsReducer
});