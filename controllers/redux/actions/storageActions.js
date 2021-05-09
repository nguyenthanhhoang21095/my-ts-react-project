export default class StorageReduxAction {
  static addToCart(payload) {
    return {
      type: 'ADD_TO_CART',
      payload,
    }
  }
}

// export const addToCart = (data) => ({
//   type: 'ADD_TO_CART',
//   payload: data,
// })