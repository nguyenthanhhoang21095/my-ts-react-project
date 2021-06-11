import { ADD_TO_CART, SHOW_TOAST, GET_USER_INFO, GET_CART } from "../contanst/index.ts"
import { saveDataLocal } from '../lib/reducerConfig'
export default class StorageReduxAction {
  // static addToCart(payload) {
  //   return {
  //     type: ADD_TO_CART,
  //     payload,
  //   }
  // }

  static showToast(mess) {
    return {
      type: SHOW_TOAST,
      payload: mess,
    }
  }

  static getUserInfo(info) {
    return {
      type: GET_USER_INFO,
      payload: info
    }
  }

  static getCart(cartArr) {
    return {
      type: GET_CART,
      payload: cartArr
    }
  }
}