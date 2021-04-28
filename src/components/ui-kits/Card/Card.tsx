import React from 'react'
import { StyledCard, StyledCardMedia, StyledCardImage, StyledCardBody, StyledCardButtonGroup } from './Card.styled'

interface CardProps {
  onClick?(e: any): void
  buttonGroups?: React.ReactNode
  imageURL: string
}

const Card: React.FC<CardProps> = ({imageURL, buttonGroups, children}) => {
  return (
    <StyledCard>
      <StyledCardMedia>
        <StyledCardImage src={imageURL} />
        {buttonGroups && <StyledCardButtonGroup>{buttonGroups}</StyledCardButtonGroup>}
      </StyledCardMedia>
      <StyledCardBody>{children}</StyledCardBody>
    </StyledCard>
  )
}

export default Card
