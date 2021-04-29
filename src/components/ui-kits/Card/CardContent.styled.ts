import styled from 'styled-components'

export const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`
export const StyleCardDivider = styled.hr`
  height: 2px;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 2px;
  border: none;
  outline: none;
  background: #e3e3e3;
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

export const StyledCardPrice = styled.div`
  display: flex;
  margin-top: 0.8rem;
  align-items: space-between;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.25em;
  color: #6D214F;
`

export const StyledCardOriginPrice = styled.div`
  text-decoration: line-through;
  margin-right: 10px;

`
export const StyledCardFinalPrice = styled.div`
`
export const StyleCardRating = styled.div`
  margin-top: 0.8rem;
  cursor: pointer;
`