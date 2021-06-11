import React, { useEffect } from 'react'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Banner } from 'src/components/Banner'
import styles from './Layout.module.scss'
import { useDispatch } from 'react-redux';
import jwtDecode from "jwt-decode";
import api from 'controllers/baseApi';
import endpoint from 'src/utils/endpoints';
import storageActions from "controllers/redux/actions/storageActions";
import { connect } from 'react-redux';
import ICart from 'src/interfaces/cart'
import IUser from 'src/interfaces/user'

interface LayoutProps {
  children: React.ReactNode;
  customStyle?: string;
  isHomeRoute?: boolean;
  cart: any;
  userInfo: IUser;
}

const OptimizeHeader = React.memo((props) => (
  <Header />
))

const Layout: React.FC<LayoutProps> = ({children, customStyle = "", isHomeRoute = false, cart = [], userInfo = null}):JSX.Element => {
  const dispatch = useDispatch()  
   useEffect(() =>  {
     try {
      const access_token: string = JSON.parse(localStorage.getItem("access_token"));
      const decoded:any = jwtDecode(access_token);
      
      if (decoded && decoded.data && Object.keys(decoded).length && !userInfo && !cart.length) {
        const promise1:any = api.get(`${endpoint['user']}/${decoded.data.id}`, access_token)
        const promise2:any = api.get(`${endpoint['cart']}/${decoded.data.id}`, access_token)
        Promise.all([ promise1 , promise2 ]).then((res) => {
          if (res?.length) {
            const  { getUserInfo, getCart } = storageActions;
            dispatch(getUserInfo(res[0]))
            res[1]?.cart && dispatch(getCart(res[1].cart))
          }
        }).catch((err) => console.error(err))
      }
    } catch (err) {
      console.error(err)
    }
  },[])

  return (
    <>
      <OptimizeHeader />
        { isHomeRoute &&
          <div className={styles['layout-banner']}>
            <Banner />
          </div>  
        }
        <div className={styles['layout']}>
          {children}
        </div>  
      <Footer />
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

const mapDispatchToProps = {
  getCart: storageActions.getCart,
  showToast: storageActions.showToast,
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout)
