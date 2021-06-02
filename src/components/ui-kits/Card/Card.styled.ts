import styled from 'styled-components'

export const StyledCard = styled.div`
  position: relative;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border-radius: 0.5rem;
  display: flex;
  flex-shrink: 1;
  align-items: center;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 20px rgba(0, 0, 0, 0.24);
`

export const StyledCardMedia = styled.div`
  width: 100%;
  min-height: 200px;
  position: relative;
`

export const StyledCardImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  transition: all 0.4s ease-in-out;
  border-radius: 0.5rem;
  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 0 10px 8px rgba(0, 0, 0, 0.22);
    transform: scale(1.05);
    border-radius: 0.5rem;
  }
`

export const StyledCardBody = styled.div`
  position: relative;
  display: block;
  width: 100%;
  text-align: center;
  font-weight: bold;
  padding: 15px;
`
export const StyleCardName = styled.div`
  position: absolute;
  bottom: 15px;
  right: 0;
  left: 15px;
  z-index: 3;
  color: #fff;
  text-transform: capitalize;
  font-size: 1em;
  text-overflow: ellipsis;
  font-weight: bold;
`
export const StyledCardFav = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  z-index: 3;
  font-size: 1em;
  font-weight: bold;
`

export const StyleCardDivider = styled.hr`
  height: 3px;
  width: 30%;
  border-radius: 5px;
  border: none;
  outline: none;
  background: #ffaf40;
  margin: 20px auto;
`
