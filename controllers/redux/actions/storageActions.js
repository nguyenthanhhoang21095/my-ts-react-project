import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  UPDATE_QTY_CART, 
  SHOW_TOAST,
  REMOVE_TOAST,
  GET_USER_INFO, 
  GET_CART 
} from "../contanst/index.ts";
import { saveDataLocal } from '../lib/reducerConfig'
import api from "controllers/baseApi";
import endpoint from "src/utils/endpoints";

let toastTimer;
export default class StorageReduxAction {
  static addToCart(prodData, userId) {
    function cbAction (payload) {
      return {
        type: ADD_TO_CART,
        payload: payload,
      }
    }

    if (userId) {
      return async (dispatch) => {
        const res = await api.post(`${endpoint['cart']}/add`, {
          id: userId,
          product: prodData
        })
        res?.cart && dispatch(cbAction(res.cart))
      }
    }
  }

  static removeFromCart(prodData, userId) {
    function cbAction (payload) {
      return {
        type: REMOVE_FROM_CART,
        payload: payload,
      }
    }

    if (userId) {
      return async (dispatch) => {
        const res = await api.post(`${endpoint['cart']}/remove`, {
          id: userId,
          product: prodData
        })
        res?.cart && dispatch(cbAction(res.cart));
      }
    }
  }

  static updateQtyCart(prodData, userId, action = "increase") {
    console.log(prodData, userId, action);
    function cbAction (payload) {
      return {
        type: UPDATE_QTY_CART,
        payload: payload,
      }
    }
    if (userId) {
      return async (dispatch) => {
        const res = await api.put(`${endpoint['cart']}/update`, {
          id: userId,
          product: prodData,
          action,
        })
        res?.cart && dispatch(cbAction(res.cart));
      }
    }
  }

  static showToast(message = "", type = "default") {
    function cbAction (payload) {
      return {
        type: SHOW_TOAST,
        payload,
      }
    }

    return (dispatch) => {
      if (toastTimer) clearTimeout(toastTimer)
      dispatch(cbAction({
        message,
        type
      }));
      toastTimer = setTimeout(() => {
        dispatch(StorageReduxAction.removeToast())
        clearTimeout(toastTimer)
      }, 2000);  
    }
  }

  static removeToast() {
    return {
      type: REMOVE_TOAST,
      payload: {
        message: '',
        type: ''
      },
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