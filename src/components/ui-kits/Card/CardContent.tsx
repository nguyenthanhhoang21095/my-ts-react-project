import React, { useState } from 'react'
import { StyledCardContent, StyledCardName, StyledCardPrice, StyledCardFinalPrice, StyledCardOriginPrice, StyleCardRating } from './CardContent.styled'
import { formatCurrency } from "../../../utils/common";
import IconButton from "../Icon/IconButton";

interface CardContentProps {
    final_price: number,
    price: number,
    name: string,
    rating: number,
}
  
  const CardContent: React.FC<CardContentProps> = ({ final_price, price, name, rating }):JSX.Element => {
    const [ratingArr, setRatingArr] = useState(() => {
        const mathRoundRating:number = Math.ceil(rating);
        return typeof rating === "number" && rating > 0 ? [...Array(mathRoundRating)] : []
    });

    const changeRating = (idx:number):void => {
        setRatingArr([...Array(idx + 1)]);
    }
    
    return (
        <StyledCardContent>
            <StyledCardName>{name}</StyledCardName>
            <StyledCardPrice>
                { price !== final_price &&
                    <StyledCardOriginPrice>{formatCurrency(price)} VND</StyledCardOriginPrice>
                }
                <StyledCardFinalPrice>{formatCurrency(final_price)} VND</StyledCardFinalPrice>
            </StyledCardPrice>
            <StyleCardRating>
                {[...Array(ratingArr.length)].map((e, i) => (
                    <IconButton handleClick={() => changeRating(i)} key={i} img="/images/icons/star.png" width="15px" height="15px" />
                ))}
                {[...Array(5 - ratingArr.length)].map((e, i) => (
                    <IconButton handleClick={() => changeRating(ratingArr.length + i)} key={ratingArr.length + i} img="/images/icons/non-star.png" width="15px" height="15px" />
                ))}
            </StyleCardRating>    
        </StyledCardContent>
    )
  }
  
  export default CardContent;
  