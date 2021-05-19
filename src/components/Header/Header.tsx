import React, { useState } from 'react'
import { Link } from '../ui-kits/Link'
import {
  StyledHeader,
  StyledHeaderMenu,
  StyledHeaderLogo,
  StyledHeaderLogoImg,
  StyleHeaderSection,
  StyledHeaderMenuItem,
  StyledCartNumber,
  StyledHeaderCart,
} from './Header.styled'
import Router from 'next/router'
import { connect } from 'react-redux'
import IconButton from '../ui-kits/IconButton/IconButton'
import { Button } from '../ui-kits/Button'
import Dialog from '../Dialog/Dialog'
interface HeaderProps {
  cart?: any
  userInfo?: any
}

const Header: React.FC<HeaderProps> = ({ cart = [], userInfo = null }): JSX.Element => {
  const [isShowDialog, setIsShowDialog] = useState(false)
  let timeout = null;
  
  const showDialog = (e): void => {
    const { target } = e
    if (target) {
      setIsShowDialog(true);
      clearTimeout(timeout);
    }
  }

  const closeDialog = (): void => {
    timeout = setTimeout(() => {
      setIsShowDialog(false);
      clearTimeout(timeout);
    }, 500) 
  }

  return (
    <StyledHeader>
      <StyledHeaderLogo>
        <StyledHeaderLogoImg src="/images/icons/logo.png" height="40px" />
      </StyledHeaderLogo>
      <StyledHeaderMenu>
        <StyleHeaderSection>
          <StyledHeaderMenuItem>
            <Link url="/" text="Home" />
          </StyledHeaderMenuItem>
          <StyledHeaderMenuItem>
            <Link url="/" text="Products" />
          </StyledHeaderMenuItem>
        </StyleHeaderSection>

        <StyleHeaderSection>
          <StyledHeaderMenuItem>
            <StyledHeaderCart>
              <IconButton
                img="/images/icons/cart.png"
                width="35px"
                height="35px"
                handleClick={() => Router.push('/cart')}
                handleHoverIn={showDialog}
                handleHoverOut={closeDialog}
              />
              <StyledCartNumber>{cart.length}</StyledCartNumber>

              {isShowDialog && (
                <Dialog
                  cart={cart}
                  handleHoverIn={showDialog}
                  handleHoverOut={closeDialog}
                />
              )}
            </StyledHeaderCart>
          </StyledHeaderMenuItem>
          <StyledHeaderMenuItem>
            {!userInfo ? (
              <Button
                handleClick={() => Router.push('/auth/login')}
                width="5rem"
                customStyle="background: #fff; color: #000"
              >
                Login
              </Button>
            ) : (
              <div>Hello, {userInfo.fullName}</div>
            )}
          </StyledHeaderMenuItem>
        </StyleHeaderSection>
      </StyledHeaderMenu>
    </StyledHeader>
  )
}

const mapStateToProps = (state) => ({
  cart: state.storage.cart,
  userInfo: state.storage.userInfo,
})

export default connect(mapStateToProps)(Header)
