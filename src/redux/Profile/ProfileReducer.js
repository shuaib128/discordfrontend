import { GET_USER, GET_LOADING } from "./ProfileTypes";

const initialState = {
    Loading: false,
    User: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOADING: return {
            ...state,
            Loading: !initialState.LoadingLoading
        }
        case GET_USER: return {
            ...state,
            User: action.payload
        }
        default: return state
    }
}

export default userReducer