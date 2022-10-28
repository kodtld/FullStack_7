import { combineReducers, createStore } from 'redux'
import notificationReducer from './reducers/notificationReducer.js'

const reducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(reducer)

console.log(store)

export default store