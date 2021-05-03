import React from 'react'
import { StyledCard, StyledCardMedia, StyledCardBody, StyledCardButtonGroup, StyledCardImage } from './Card.styled'

interface CardProps {
  onClick?(e: any): void
  buttonGroups?: React.ReactNode
  imageURL: string
}

const Card: React.FC<CardProps> = ({imageURL, buttonGroups, children}):JSX.Element => {
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
