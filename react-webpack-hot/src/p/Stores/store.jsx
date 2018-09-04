import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/reduces';


export default function Store(preloadedState) {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    )
}