import '../styles/global.scss';
import '../styles/layout.scss';
import '../styles/font.scss';
import { Provider } from 'react-redux';
import React from 'react'
import { store, persistor } from 'controllers/redux/store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
// import storageActions from "controllers/redux/actions/storageActions";
// import { checkLocalStoreToRedux } from 'controllers/redux/lib/reducerConfig';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
// import jwt_decode from "jwt-decode";
// import api from 'controllers/baseApi';
// import endpoint from 'src/utils/endpoints';

const Loading = () => (<div>Loading...</div>)

function MyApp({ Component, pageProps}):JSX.Element {
  // const [isLoading, setIsLoading] = useState(true)

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
    // isLoading  ? <Loading /> :
      <Provider store={store}>
        <PersistGate loading={Loading} persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
      </Provider>
  )
}

export default MyApp
