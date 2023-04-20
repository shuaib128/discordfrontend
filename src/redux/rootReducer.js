import { combineReducers } from "redux";
import userReducer from "./Profile/ProfileReducer";
import messagesReducer from "./Messages/MessagesReducer";

const rootReducer = combineReducers({
    Profile: userReducer,
    SelectedUser: messagesReducer
})

export default rootReducer