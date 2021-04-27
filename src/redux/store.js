import {createStore, combineReducers} from 'redux'
import userReducer from './userReducer'
import destinationReducer from './destinationReducer'

const rootReducer = combineReducers({
    userReducer,
    destinationReducer
})

export const store =  createStore(rootReducer)