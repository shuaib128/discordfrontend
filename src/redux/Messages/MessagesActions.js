import { SELECT_USER } from "./MessageTypes";
import { SELECT_MESSAGES } from "./MessageTypes";
import { RESET_MESSAGES } from "./MessageTypes";

export const getSelectedUser = (data) => {
    return {
        type: SELECT_USER,
        payload: data
    }
}

export const getMessages = (data) => {
    return {
        type: SELECT_MESSAGES,
        payload: data
    }
}

export const resetMessages = () => {
    return {
        type: RESET_MESSAGES
    }
}