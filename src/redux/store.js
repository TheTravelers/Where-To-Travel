import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from './userReducer'
import destinationReducer from './destinationReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware'

const rootReducer = combineReducers({
    userReducer,
    destinationReducer
})

export const store =  createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))