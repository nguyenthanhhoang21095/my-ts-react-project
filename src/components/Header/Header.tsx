import React from 'react'
import { Text } from '../ui-kits/Text'
import {
  StyledHeader,
  StyledHeaderMenu,
  StyledHeaderLogo,
  StyledHeaderLogoImg,
  StyledHeaderButton,
  StyledHeaderMenuItem,
  StyledCartNumber,
  StyledHeaderCart,
} from './Header.styled'

import IconButton from "../ui-kits/Icon/IconButton";

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
          <Text>Home</Text>
        </StyledHeaderMenuItem>
        <StyledHeaderMenuItem>
          <Text>Products</Text>
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
