import { GET_USER, GET_SELECTED_USERS } from "./ProfileTypes";

export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}

export const getSelectedUsers = (data) => {
    return {
        type: GET_SELECTED_USERS,
        payload: data
    }
}