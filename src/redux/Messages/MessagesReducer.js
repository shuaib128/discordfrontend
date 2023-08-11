import { SELECT_USER } from "./MessageTypes";
import { SELECT_MESSAGES } from "./MessageTypes";
import { RESET_MESSAGES } from "./MessageTypes";

const initialState = {
    SelectedUser: {},
    Messages: []
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_USER:
            return {
                ...state,
                SelectedUser: action.payload
            };

        case SELECT_MESSAGES:
            // Convert the list of messages into an object
            const newMessages = action.payload.reduce((acc, message) => {
                acc[message.id] = message;
                return acc;
            }, {});

            // Merge the new messages with the current state
            return {
                ...state,
                Messages: {
                    ...state.Messages,
                    ...newMessages
                }
            };

        case RESET_MESSAGES:
            return {
                ...state,
                Messages: {}
            };

        default:
            return state;
    }
}

export default messagesReducer