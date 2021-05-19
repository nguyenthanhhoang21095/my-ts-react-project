import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import IconButton from '../IconButton/IconButton';
import { StyledCard, 
  StyledCardMedia, 
  StyledCardBody, 
  StyledCardImage, 
  StyleCardName, 
  StyledCardFav,
  StyleCardDivider } from './Card.styled'
import CustomImage from '../CustomImage/CustomImage';

interface CardProps {
  onClick?(e: any): void
  buttonGroups?: React.ReactNode
  imageURL: string
  productName?: string
}

const DynamicImageComp = dynamic(() => import('../CustomImage/CustomImage'));

const Card: React.FC<CardProps> = ({imageURL, children, productName=""}):JSX.Element => {
  const [isHoverFavIcon, setIsHoverFavIcon] = useState(false);
  return (
    <StyledCard>
      <StyledCardMedia>
        <StyledCardImage>
          <DynamicImageComp src={imageURL} isHasOverlay={true} />
        </StyledCardImage>
        <StyleCardName>{productName}</StyleCardName>
        <StyledCardFav>
          <IconButton 
            img={`/images/icons/${isHoverFavIcon ? 'love-full' : 'love'}.svg`}
            width="20px" height="20px"
            imageStyle={`filter: invert(82%) sepia(35%) saturate(1384%) hue-rotate(326deg) brightness(101%) contrast(101%)`} 
          />
        </StyledCardFav>
      </StyledCardMedia>
      {/* <StyleCardDivider /> */}
      <StyledCardBody>{children}</StyledCardBody>
    </StyledCard>
  )
}

export default Card
