import React from 'react'
import { StyledButton } from './Button.styled'

interface ButtonProps {
  children: React.ReactChild,
  handleClick?: (e?: React.MouseEvent<HTMLElement>) => void,
}

const Button: React.FC<ButtonProps> = ({children , handleClick}: ButtonProps):JSX.Element => {
  return (
    <StyledButton onClick={handleClick}>
      {children}
    </StyledButton>
  )
}

export default Button
