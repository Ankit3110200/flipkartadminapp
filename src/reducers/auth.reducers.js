import { authconstants } from "../actions/constant";

const intialstate = {
    token: null,
    user: {
        firstname: '',
        lastname: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    loading:false,
    error:null,
    message:''
}
export default (state = intialstate, action) => {
    console.log(action)
    switch (action.type) {
        case authconstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authconstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false

            }
            break;
        case authconstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case authconstants.LOGOUT_SUCCESS:
            state = {
                ...intialstate
            }
            break;
        case authconstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
    }

    return state;
}