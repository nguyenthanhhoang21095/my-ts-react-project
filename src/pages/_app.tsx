import { Provider } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { store, persistor } from '../../controllers/redux/store/configureStore'
import Router from 'next/router';
import { PersistGate } from 'redux-persist/integration/react'
import storageActions from "../../controllers/redux/actions/storageActions";
import { checkLocalStoreToRedux } from '../../controllers/redux/lib/reducerConfig';


const Loading = () => (<div>Loading...</div>)
function MyApp({ Component, pageProps }):JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() =>  {
    const storageRedux = [
      { key: 'GET_USER_INFO', action: storageActions.getUserInfo, init: null},
    ]

    const promiseArr = storageRedux.map((item) => {
      checkLocalStoreToRedux(store, item.key, item.action, item.init)
    })
    Promise.all(promiseArr).then(() => {
      setIsLoading(false)
    })
  },[])
  return (
    isLoading  ? <Loading /> :
      <Provider store={store}>
        <PersistGate loading={Loading} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
  )
}

export default MyApp
