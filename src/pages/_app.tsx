import { Provider } from 'react-redux'
import React from 'react'
import store from '../../controllers/redux/store/configureStore'

function MyApp({ Component, pageProps }):JSX.Element {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
