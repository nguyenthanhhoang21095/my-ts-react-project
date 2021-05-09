const initState = {
  cart: [],
}

const storageReducers = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let newCart = [];
      const prodIdx = state.cart.length
        ? state.cart.findIndex((item) => item.id === action.payload?.id)
        : -1;
      if (prodIdx != -1) {
        newCart = [
          ...state.cart.slice(0, prodIdx),
          {
            ...action.payload,
            quantity: state.cart[prodIdx].quantity + 1,
          },
          ...state.cart.slice(prodIdx + 1, state.cart.length),
        ]
      } else {
        newCart = [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          }
        ]
      }
      return { ...state, cart: newCart }
    default:
      return { ...state }
  }
}

export default storageReducers
