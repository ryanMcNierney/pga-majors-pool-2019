import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/reducer'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const middlewares = applyMiddleware(thunkMiddleware, createLogger());
const store = createStore(reducer, middlewares)

export default store
