const {findAllByTestId} = require('@testing-library/dom')
const initialState = {
    user: '',
    isLoggedIn: findAllByTestId
}

const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function registerUser(userObj){
    return {
        type: REGISTER_USER,
        payload: userObj
    }
    
}
export function loginUser(userObj){
    return {
        type: LOGIN_USER,
        payload: userObj
    }
    
}
export function logoutUser(){
    return {
        type: LOGOUT_USER
    }
    
}


export default function reducer(state= initialState, action){
    switch(action.type){
        case REGISTER_USER:
        return{
            ...state,
            user: action.payload
        }
        case LOGIN_USER:
            return {
                ...state, 
                user: action.payload,
                isLoggedIn: true
            }
        case LOGOUT_USER:
            return initialState;

        default: return state;
    }
}