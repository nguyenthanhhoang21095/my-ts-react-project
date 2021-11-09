import React from 'react'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import styles from './Layout.module.scss'
import storageActions from "controllers/redux/actions/storageActions";
import { connect } from 'react-redux';
import IUser from 'src/interfaces/user'
import { NavHeader } from 'src/components/NavHeader'
import { useMediaQuery } from 'react-responsive'

interface LayoutProps {
  children: React.ReactNode;
  customStyle?: string;
  isHomeRoute?: boolean;
  cart: any;
  userInfo: IUser;
}

const Layout: React.FC<LayoutProps> = ({ children, customStyle = "", isHomeRoute = false, cart = [], userInfo = null }): JSX.Element => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <>

      {!isTabletOrMobile ?
        <Header />
        :
        <NavHeader />
      }
      <div className={styles['layout-container']}>
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
