import React, { useState, useEffect } from 'react'
import { Link } from '../ui-kits/Link'
import {
  StyledHeader,
  StyleHeaderList,
  StyledHeaderMenu,
  StyledHeaderLogo,
  StyledHeaderLogoImg,
  StyleHeaderSection,
  StyledHeaderMenuItem,
  StyledCartNumber,
  StyledHeaderCart,
} from './Header.styled'
import { connect } from 'react-redux'
import IconButton from '../ui-kits/IconButton/IconButton'
import CartModal from './CartModal'
import UserModal from './UserModal'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'

interface HeaderProps {
  cart?: any
  userInfo?: any
}

const Header: React.FC<HeaderProps> = ({ cart = [], userInfo = null }): JSX.Element => {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [cartData, setCartData] = useState([]);
  let timeoutCart = null, timeOutUser = null;
  
  useEffect(() => {
    if (userInfo.id) {
      api.get(`${endpoint['cart']}/${userInfo.id}`, true)
      .then((res) => {
        if (res?.cart) {
          setCartData(res.cart)
        }
      })
    }
  }, [cart])

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

  return (
    <StyledHeader>
      <StyledHeaderLogo>
        <StyledHeaderLogoImg src="/images/icons/logo.png" />
      </StyledHeaderLogo>
      <StyleHeaderList>
      <StyledHeaderMenu>
        <StyleHeaderSection>
          <StyledHeaderMenuItem>
            <Link 
              url="/" 
              text="Home" 
              customStyle="font-family: Lobster, cursive; margin-right: 50px;"
            />
          </StyledHeaderMenuItem>
          <StyledHeaderMenuItem>
            <Link 
              url="/products" 
              text="Products" 
              customStyle="font-family: Lobster, cursive; margin-right: 50px;"
            />
          </StyledHeaderMenuItem>
          <StyledHeaderMenuItem>
            <Link 
              url="/accessories" 
              text="Accessories" 
              customStyle="font-family: Lobster, cursive; margin-right: 50px;"
            />
          </StyledHeaderMenuItem>
          <StyledHeaderMenuItem>
            <Link 
              url="/about" 
              text="About" 
              customStyle="font-family: Lobster, cursive; margin-right: 50px;"
            />
          </StyledHeaderMenuItem>
          <StyledHeaderMenuItem>
            <Link 
              url="/contact" 
              text="Contact" 
              customStyle="font-family: Lobster, cursive"
            />
          </StyledHeaderMenuItem>
          {/* <StyledHeaderMenuItem>
            <Link url="/" text="Products" />
          </StyledHeaderMenuItem> */}
        </StyleHeaderSection>

        <StyleHeaderSection>
          <StyledHeaderMenuItem>
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
           
          </StyledHeaderMenuItem>
          <StyledHeaderMenuItem styleItem="margin-left: 1.5rem;">
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
          </StyledHeaderMenuItem>
        </StyleHeaderSection>
      </StyledHeaderMenu>
      </StyleHeaderList>
    </StyledHeader>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

export default connect(mapStateToProps)(Header)