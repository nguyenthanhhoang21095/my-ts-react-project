import React from "react";
import { StyledIcon, StyledIconButton } from "./Icon.styled";

interface IconButtonProps {
    img: string;
    width?: string;
    height?: string;
    imageStyle?: string;
    handleClick?: (e?: React.MouseEvent<HTMLElement>) => void;
    hoverIcon?:boolean;
    setHoverIcon?: any;
}

const IconButton:React.FC<IconButtonProps> = ({ img = "", width = "100%", height = "100%", imageStyle = "", handleClick, hoverIcon = false, setHoverIcon = null}):JSX.Element => {
    // const handleMouseEnter = () => {
    //     setHoverIcon(hoverIcon => hoverIcon ? false : true)
    // }

    return (
       <StyledIconButton onClick={handleClick}>
        <StyledIcon src={img} width={width} height={height} customStyle={imageStyle} />
       </StyledIconButton> 
    )
}

export default IconButton;