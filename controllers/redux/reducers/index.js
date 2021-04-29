import * as pageReducers from './pageReducers'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  ...pageReducers,
})

export default rootReducer