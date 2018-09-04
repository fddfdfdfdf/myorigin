import { createStore,combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../Reducer/Index'

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
// var store = createStore(
//     combineReducers(reducer),
//     applyMiddleware(thunk)
// );

let loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
    return createStore(
        combineReducers(rootReducer),
        //preloadedState,
        applyMiddleware(
            thunkMiddleware//,
            //loggerMiddleware
        )
    )
}


