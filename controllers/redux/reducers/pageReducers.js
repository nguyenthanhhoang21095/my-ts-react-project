export const internetRedux = createReducer(false, {
  ['SET_INTERNET'](state, action) {
    return action.payload
  },
})
