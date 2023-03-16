import { GET_USER } from "./ProfileTypes";

export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}