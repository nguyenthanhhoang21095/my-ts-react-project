import styled from 'styled-components'

export const StyledCard = styled.div`
  position: relative;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  background:#fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 1px 20px rgba(0,0,0,0.24);
  padding: 15px;
`

export const StyledCardMedia = styled.div`
  width: 100%;
  min-height: 200px;
  position: relative;
`


export const StyledCardImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  transition: all 0.2s ease-in-out;
  border-radius: 0.5rem;
  &:hover {
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    top: -40px;
  }
`
export const StyledCardButtonGroup = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: fit-content;
  height: fit-content;
  margin: auto;
  bottom: -100%;
`

export const StyledCardBody = styled.div`
  position: relative;
  display: block;
  width: 100%;
  margin-top: 2.5rem;
  text-align: center;
  font-weight: bold;
`
