import { userconstants } from "../actions/constant"

const initialstate = {
    error: null,
    message: false,
    loading: false
}

export default (state = initialstate, action) => {
    switch (action.type) {
        case userconstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case userconstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break
        case userconstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break
    }
    return state
}