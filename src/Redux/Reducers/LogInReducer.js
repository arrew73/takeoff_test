import {authorizationAPI} from "../../API/RestAPI";
import {stopSubmit} from "redux-form";

const SET_USER_AUTHORIZED = "SET_USER_AUTHORIZED";

let initialState = {
    login: null,
    token: null,
    isAuthorized: false
}

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_AUTHORIZED:
            return {
                ...state,
                login: action.email,
                token: action.token,
                isAuthorized: action.isAuthorized
            };
        default:
            return state;
    }
}

export const setAuthData = (email, token, isAuthorized) => ({type: SET_USER_AUTHORIZED, email, token, isAuthorized});
export const login = (email, password) => async (dispatch) => {
    let promise = await authorizationAPI.login(email, password)
    if (promise.status === 200) {
        dispatch(setAuthData(email, promise.data.accessToken, true))
    }
    else {
        let error = "Incorrect email or password";
        dispatch(stopSubmit('login', {_error: error}))
    }

}

export const logout = () => (dispatch) => {
    dispatch(setAuthData(null, null, null))
}

