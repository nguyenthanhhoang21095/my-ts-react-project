import React, { useState } from 'react'
import { StyledCardContent, 
    StyledCardButtonGroup, 
    StyledCardPrice, 
    StyledCardFinalPrice, 
    StyledCardOriginPrice, 
    StyleCardRating, 
    StyledCardItem,
} from './CardContent.styled'
import { formatCurrency } from "src/utils/common";
import CustomRating from '../Rating/Rating';

interface CardContentProps {
    finalPrice: number,
    price: number,
    rating: number,
    buttonGroups: any,
    inStock: boolean,
}
  
  const CardContent: React.FC<CardContentProps> = ({ finalPrice, price, rating, buttonGroups, inStock }):JSX.Element => {
    return (
        <StyledCardContent>
            <StyledCardItem customStyle="padding-top: 0">
                <StyledCardPrice>
                    { price !== finalPrice &&
                        <StyledCardOriginPrice>{formatCurrency(price)}</StyledCardOriginPrice>
                    }
                    <StyledCardFinalPrice>{formatCurrency(finalPrice)}</StyledCardFinalPrice>
                </StyledCardPrice>
            </StyledCardItem>
            <StyledCardItem customStyle="color: #d3d3d3; font-weight: normal">
                Status: {inStock ? "still in stock" : "out of stock"}
            </StyledCardItem>
            <StyledCardItem>
                <StyleCardRating>
                    <CustomRating ratingVal={rating} />
                </StyleCardRating>
            </StyledCardItem>
            <StyledCardItem>
                {buttonGroups && <StyledCardButtonGroup>{buttonGroups}</StyledCardButtonGroup>}
            </StyledCardItem>
        </StyledCardContent>
    )
  }
  
  export default CardContent;
  