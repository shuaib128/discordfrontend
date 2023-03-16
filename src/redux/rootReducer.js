import { combineReducers } from "redux";
import userReducer from "./Profile/ProfileReducer";

const rootReducer = combineReducers({
    Profile: userReducer
})

export default rootReducer