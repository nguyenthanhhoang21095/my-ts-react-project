import React from 'react'
import { StyledButton } from './Button.styled'

interface ButtonProps {
  width?: string,
  height?: string,
  children: any,
  fontSize?:string,
  outLine?:string,
  customStyle?:string,
  handleClick?: (e?: React.MouseEvent<HTMLElement>) => void,
}

const Button: React.FC<ButtonProps> = ({children , handleClick = () => {}, width="100%", height="", fontSize="", outLine="contain", customStyle=""}: ButtonProps):JSX.Element => {
  return (
    <StyledButton 
      width={width} 
      height={height} 
      onClick={handleClick} 
      customStyle={`font-size: ${fontSize}; ${customStyle}`}
      outLine={outLine}
    >
      {children}
    </StyledButton>
  )
}

export default Button
