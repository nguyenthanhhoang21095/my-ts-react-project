export default class PageReduxAction {
  static setInternet(payload) {
    return {
      type: 'SET_INTERNET',
      payload,
    }
  }
}
