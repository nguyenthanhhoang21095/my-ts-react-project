import React, { useState, useEffect } from 'react'
import { Link } from '../ui-kits/Link'
import {
  StyledCartNumber,
  StyledHeaderCart,
} from './Header.styled'
import { connect } from 'react-redux'
import { IconButton } from '../ui-kits/IconButton'
import CartModal from './CartModal'
import { MenuIcon } from '../ui-kits/MenuIcon'
import UserModal from './UserModal'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import styles from './Header.module.scss';
import { Button } from '../ui-kits/Button'
import classNames from 'classnames'
import NavHeader from './NavHeader'

interface HeaderProps {
  cart?: any
  userInfo?: any
}

const Header: React.FC<HeaderProps> = ({ cart = [], userInfo = null }): JSX.Element => {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showMenuNav, setShowMenuNav] = useState(false);

  let timeoutCart = null, timeOutUser = null;
  
  useEffect(() => {
    // if (userInfo?.id) {
    //   api.get(`${endpoint['cart']}/${userInfo.id}`, true)
    //   .then((res) => {
    //     if (res?.cart) {
    //       setCartData(res.cart)
    //     }
    //   })
    // } else {
      userInfo && setUserData(userInfo)
      setCartData(cart)
    // }
  }, [cart, userInfo])

  const handleOpenCartModal = (e): void => {
    const { target } = e;
    if (target) {
      setShowCartModal(true);
      clearTimeout(timeoutCart);
    }
  }

  const handleCloseCartModal = (): void => {
    timeoutCart = setTimeout(() => {
      setShowCartModal(false);
      clearTimeout(timeoutCart);
    }, 0)
  }

  const handleOpenUserModal = (e):void => {
    const { target } = e;
    if (target) {
      setShowUserModal(true);
      clearTimeout(timeOutUser);
    }
  }

  const handleCloseUserModal = (): void => {
    timeOutUser = setTimeout(() => {
      setShowUserModal(false);
      clearTimeout(timeOutUser);
    }, 0)
  }

  const openMenuNav = () => {
    if (!showMenuNav) {
      setShowMenuNav(true);
    } else {
      setTimeout(() => {
        setShowMenuNav(false);
      }, 200)
    }
  }

  return (
    <>
      <div className={styles['header-container']}>
        <div className={styles['header-container__logo']}>
          <img 
            className={styles['header-container__logo--image']} 
            src="/images/icons/logo.png" 
            alt="logo image" 
            height="100%" 
            width="150px"
          />
        </div>
        <div className={styles['header-container__menu']}>
          <div className={styles['header-nav']}>
            <div className={classNames(styles['header-nav__section'], styles['header-nav__grid'])}>
              <div className={classNames(styles['header-nav__section--item'], styles['header-padding-item'])}>
                <Link 
                  url="/" 
                  text="Home" 
                  customStyle="font-family: Lobster, cursive;"
                />
              </div>
              <div className={classNames(styles['header-nav__section--item'], styles['header-padding-item'])}>
                <Link 
                  url="/about" 
                  text="About" 
                  customStyle="font-family: Lobster, cursive;"
                />
              </div>
             
              <div className={classNames(styles['header-nav__section--item'], styles['header-nav__section--nav-btn'])}>
                <Button outLine="none" handleClick={() => openMenuNav()}>
                  <MenuIcon />
                </Button>
              </div>
            </div>

            <div className={classNames(styles['header-nav__section'], styles['header-nav__hide'])}>
              <div className={styles['header-nav__section--item']}>
                <IconButton
                  img="/images/icons/user.png"
                  width="22px"
                  height="22px"
                  imageStyle={
                    `filter ${showUserModal ? 
                    'invert(91%) sepia(26%) saturate(2764%) hue-rotate(338deg) brightness(104%) contrast(95%);'
                    : 'invert(97%) sepia(3%) saturate(9%) hue-rotate(314deg) brightness(106%) contrast(100%);'
                  }`}
                  handleHoverIn={handleOpenUserModal}
                  handleHoverOut={handleCloseUserModal}
                />

                {showUserModal && (
                  <UserModal
                    userInfo={userInfo}
                    handleHoverIn={handleOpenUserModal}
                    handleHoverOut={handleCloseUserModal}
                  />
                )} 
              
              </div>
              <div className={classNames(styles['header-nav__section--item'], styles['header-nav__section--item-cart'])}>
                <StyledHeaderCart>
                  <IconButton
                    img="/images/icons/shopping-bag.png"
                    width="22px"
                    height="22px"
                    imageStyle={
                      `filter ${showCartModal ? 
                      'invert(91%) sepia(26%) saturate(2764%) hue-rotate(338deg) brightness(104%) contrast(95%);'
                      : 'invert(97%) sepia(3%) saturate(9%) hue-rotate(314deg) brightness(106%) contrast(100%);'
                    }`}
                    handleHoverIn={handleOpenCartModal}
                    handleHoverOut={handleCloseCartModal}
                  />
                  <StyledCartNumber>{cartData.length}</StyledCartNumber>
                  
                  {showCartModal && (
                    <CartModal
                      handleHoverIn={handleOpenCartModal}
                      handleHoverOut={handleCloseCartModal}
                    />
                  )}
                </StyledHeaderCart>
              </div>
            </div>
             

          </div>
        </div>
      </div>
      { showMenuNav && 
        <NavHeader isShow={showMenuNav} userInfo={userInfo} cartData={cart} />
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

export default connect(mapStateToProps)(Header)