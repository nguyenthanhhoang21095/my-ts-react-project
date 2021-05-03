import React from 'react'
import { StyledButton } from './Button.styled'

interface ButtonProps {
  width?: string,
  children: React.ReactChild,
  handleClick?: (e?: React.MouseEvent<HTMLElement>) => void,
}

const Button: React.FC<ButtonProps> = ({children , handleClick, width="100%"}: ButtonProps):JSX.Element => {
  return (
    <StyledButton width={width} onClick={handleClick}>
      {children}
    </StyledButton>
  )
}

export default Button
