import '../styles/global.scss';
import '../styles/layout.scss';
import '../styles/font.scss';
import '../styles/animation.scss';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { store } from 'controllers/redux/store/configureStore';
import { useRouter } from "next/router";
import { Loading } from "src/components/Loading";

// import { PersistGate } from 'redux-persist/integration/react'
// import { checkLocalStoreToRedux } from 'controllers/redux/lib/reducerConfig';
// import jwt_decode from "jwt-decode";
// import api from 'controllers/baseApi';
// import endpoint from 'src/utils/endpoints';

function MyApp({ Component, pageProps }): JSX.Element {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  // useEffect(() =>  {
  //     const access_token: string = JSON.parse(localStorage.getItem("access_token"));
  //     const decoded:any = jwt_decode(access_token);
  //     if (decoded && decoded.data && Object.keys(decoded).length) {
  //       // api.get(`${endpoint['user']}/${decoded.data.id}`, access_token).then((res) => {
  //       //   console.log(res);

  //       // }).catch((err) => console.error(err))
  //       const promise1:any = api.get(`${endpoint['user']}/${decoded.data.id}`, access_token)
  //       const promise2:any = api.get(`${endpoint['cart']}/${decoded.data.id}`, access_token)
  //       Promise.all([ promise1 , promise2 ]).then((res) => {
  //         if (res?.length) {
  //           const  { getUserInfo, getCart } = storageActions;
  //           dispatch(getUserInfo(res[0]))
  //           res[1]?.cart && dispatch(getCart(res[1].cart))
  //         }
  //       }).catch((err) => console.error(err))
  //     }

  // const storageRedux = [
  //   { key: 'GET_USER_INFO', action: storageActions.getUserInfo, init: null},
  //   { key: 'GET_CART_INFO', action: storageActions.getCart, init: []},
  // ]

  // const promiseArr = storageRedux.map((item) => {
  //   checkLocalStoreToRedux(store, item.key, item.action, item.init)
  // })
  // Promise.all(promiseArr).then(() => {
  //   setIsLoading(false)
  // })
  // },[])

  return (
    <Provider store={store}>
      { loading ? 
        <Loading isLoading={loading} />  
        :
        <Component {...pageProps} />
      }
    </Provider>
  )
}

export default MyApp;
