import { reducer } from './reducer'
import { createStore } from 'redux'

const store = createStore(reducer)
// TODO: hace falta el applyMiddleware? Thunk?

export default store