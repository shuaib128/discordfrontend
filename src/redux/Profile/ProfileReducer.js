import { GET_USER, GET_LOADING, GET_SELECTED_USERS } from "./ProfileTypes";

const initialState = {
    Loading: false,
    User: {},
    SelectedUsers: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOADING: return {
            ...state,
            Loading: !initialState.Loading
        }
        case GET_USER: return {
            ...state,
            User: action.payload
        }
        case GET_SELECTED_USERS: return {
            ...state,
            SelectedUsers: action.payload
        }
        default: return state
    }
}

export default userReducer