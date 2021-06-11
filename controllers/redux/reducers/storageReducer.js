import { ADD_TO_CART, SHOW_TOAST, GET_USER_INFO, GET_CART } from '../contanst/index.ts'

const initState = {
  cart: [],
  showToastMess: "",
  userInfo: null,
}

const storageReducers = (state = initState, action) => {
  switch (action.type) {
    // case ADD_TO_CART:
    //   let newCart = [];
    //   const prodIdx = state.cart.length
    //     ? state.cart.findIndex((item) => item.id === action.payload?.id)
    //     : -1
    //   if (prodIdx != -1) {
    //     newCart = [
    //       ...state.cart.slice(0, prodIdx),
    //       {
    //         ...action.payload,
    //         quantity: state.cart[prodIdx].quantity + 1,
    //       },
    //       ...state.cart.slice(prodIdx + 1, state.cart.length),
    //     ]
    //   } else {
    //     newCart = [
    //       ...state.cart,
    //       {
    //         ...action.payload,
    //         quantity: 1,
    //       },
    //     ]
    //   }
    //   return { ...state, cart: newCart }
    case GET_CART: 
      return {...state, cart: action.payload }  
    case SHOW_TOAST:
      return {...state, showToastMess: action.payload }
    case GET_USER_INFO:   
      return {...state, userInfo: action.payload }
    default:
      return { ...state }
  }
}

export default storageReducers
