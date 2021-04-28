import React from "react";
import { StyledIcon, StyledIconButton } from "./Icon.styled";

interface IconButtonProps {
    img: string,
    width: string,
    height: string,
    handleClick?: (e?: React.MouseEvent<HTMLElement>) => void
}

const IconButton:React.FC<IconButtonProps> = ({ img = "", width = "100%", height = "100%", handleClick }):JSX.Element => {
    return (
       <StyledIconButton onClick={handleClick}>
        <StyledIcon src={img} width={width} height={height} />
       </StyledIconButton> 
    )
}

export default IconButton;