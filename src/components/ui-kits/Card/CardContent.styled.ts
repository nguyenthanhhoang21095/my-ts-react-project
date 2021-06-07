import styled from 'styled-components'

export const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`
export const StyledCardItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  ${props => props.customStyle};
`

export const StyledCardName = styled.div`
    text-align: left;
    text-transform: capitalize;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 1em;
    text-overflow: ellipsis;
`

export const StyledCardButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin: auto;
`

export const StyledCardPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 1rem;
`

export const StyledCardOriginPrice = styled.div`
  text-decoration: line-through;
  margin-right: 15px;
  color: #000;
  font-weight: 500;
  font-size: .9rem;

`
export const StyledCardFinalPrice = styled.div`
  font-weight: 700;
  color: #f9ca24;
`
export const StyleCardRating = styled.div`
  cursor: pointer;
`