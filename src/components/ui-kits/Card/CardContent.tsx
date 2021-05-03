import React, { useState } from 'react'
import { StyledCardContent, StyledCardName, StyledCardPrice, StyledCardFinalPrice, StyledCardOriginPrice, StyleCardRating, StyleCardDivider } from './CardContent.styled'
import { formatCurrency } from "../../../utils/common";
import CustomRating from '../Rating/Rating';

interface CardContentProps {
    final_price: number,
    price: number,
    name: string,
    rating: number,
}
  
  const CardContent: React.FC<CardContentProps> = ({ final_price, price, name, rating }):JSX.Element => {
    return (
        <StyledCardContent>
            <StyleCardDivider />
            <StyledCardName>{name}</StyledCardName>
            <StyledCardPrice>
                { price !== final_price &&
                    <StyledCardOriginPrice>{formatCurrency(price)} VND</StyledCardOriginPrice>
                }
                <StyledCardFinalPrice>{formatCurrency(final_price)} VND</StyledCardFinalPrice>
            </StyledCardPrice>
            <StyleCardRating>
                <CustomRating ratingVal={rating} />
            </StyleCardRating>    
        </StyledCardContent>
    )
  }
  
  export default CardContent;
  