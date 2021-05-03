import React from 'react'
import { Link } from '../ui-kits/Link'
import {
  StyledHeader,
  StyledHeaderMenu,
  StyledHeaderLogo,
  StyledHeaderLogoImg,
  StyledHeaderButton,
  StyledHeaderMenuItem,
  StyledCartNumber,
  StyledHeaderCart,
} from './Header.styled';
import Router from "next/router";


import IconButton from "../ui-kits/CustomIcon/IconButton";

interface HeaderProps {
  cartNum?: number
}

const Header: React.FC<HeaderProps> = ({ cartNum = 0 }):JSX.Element => {

  return (
    <StyledHeader>
      <StyledHeaderLogo>
        <StyledHeaderLogoImg src="/images/icons/logo.png" height="40px" />
      </StyledHeaderLogo>
      <StyledHeaderMenu>
        <StyledHeaderMenuItem>
          <Link url="/" text="Home" />
        </StyledHeaderMenuItem>
        <StyledHeaderMenuItem>
          <Link url="/" text="Products" />
        </StyledHeaderMenuItem>
        <StyledHeaderMenuItem>
          <StyledHeaderCart>
            <IconButton img="/images/icons/cart.png" width="35px" height="35px" />
            <StyledCartNumber>{cartNum}</StyledCartNumber>
          </StyledHeaderCart>
        </StyledHeaderMenuItem>
      </StyledHeaderMenu>
      <StyledHeaderButton>Login</StyledHeaderButton>
    </StyledHeader>
  )
}

export default Header
