import { createStore, combineReducers, applyMiddleware } from 'redux';
import chatReducer from './reducers/chatReducer';

const reducer = combineReducers({ chatReducer })
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
window.store = store;
export default store;