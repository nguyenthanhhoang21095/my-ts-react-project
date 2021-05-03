import React from "react";
import { StyledImageContainer, StyleImageContent } from "./CustomImage.styled";

interface CustomImageProps {
    width?: string;
    height?: string;
    src?: string;
    cardAnimation?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({width="100%", height="100%", src="", cardAnimation = ""}):JSX.Element => {
   return (
       <StyledImageContainer cardAnimation={cardAnimation} width={width} height={height}>
           <StyleImageContent src={src ? src : "/images/sample/car.jpg"}/>
       </StyledImageContainer>
   )    
}

export default CustomImage;