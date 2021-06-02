// import { createReducer } from '@reduxjs/toolkit'

export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const checkLocalStoreToRedux = (storeRedux, keyStoreNew, action, initData) => {
  return new Promise((resolve, reject) => {
    try {
      const data = getDataLocal(keyStoreNew)
      if (data) {
        data !== initData && storeRedux.dispatch(action(data))
      }
      resolve()
    } catch (error) {
      return resolve()
    }
  })
}

export const saveDataLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getDataLocal = key => {
  return JSON.parse(localStorage.getItem(key))
}
