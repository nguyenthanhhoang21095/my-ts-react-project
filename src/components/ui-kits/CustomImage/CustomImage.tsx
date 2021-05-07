import React from "react";
import { StyledImageContainer, StyleImageContent, StyledImageOverlay } from "./CustomImage.styled";
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

interface CustomImageProps {
    width?: string;
    height?: string;
    src?: string;
    cardAnimation?: string;
    isHasOverlay?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({width="100%", height="100%", src="", cardAnimation = "", isHasOverlay = false}):JSX.Element => {
   return (
       <StyledImageContainer cardAnimation={cardAnimation} width={width} height={height}>
           {isHasOverlay && <StyledImageOverlay />}
           <StyleImageContent className="lazyload" data-src={`${src ? src : "/images/sample/car.jpg"}`} alt="product img" />
       </StyledImageContainer>
   )    
}

export default CustomImage;