import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from './userReducer'
import destinationReducer from './destinationReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {persistStore} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer', 'destinationReducer']
}

const rootReducer = combineReducers({
    userReducer,
    destinationReducer
})

const persist = persistReducer (persistConfig, rootReducer)

export const store =  createStore(persist, composeWithDevTools(applyMiddleware(promiseMiddleware)))

export const persistor = persistStore(store)

// export default {store, persister}