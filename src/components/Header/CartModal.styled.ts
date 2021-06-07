
import styled from "styled-components";

export const StyledDialogContainer = styled.div`
  position: absolute;
  top: 22px;
  bottom: 0;
  right: 0;
  left: -114px;
  margin: 0 auto;
  padding-top: 12px;
  box-sizing: border-box;
  background: transparent;
`

export const StyledDialog = styled.div`
  padding: .5rem;
  background: #fff !important;
  width: fit-content;
  height: fit-content;
  max-height: 300px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  
  &::before {
    border-width: 9px;
    border-style: solid;
    border-color: transparent transparent rgb(255, 255, 255);
    border-image: initial;
    margin-left: -9px;
    bottom: 100%;
    left: 50%;
    content: " ";
    height: 0px;
    width: 0px;
    position: absolute;
    pointer-events: none;
  }
`

export const StyledDialogContent = styled.div`
  background: #fff !important;
  width: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
`

export const StyledDialogRow = styled.div`
  display: block;
`

export const StyledDialogItem = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
`

export const StyledDialogItemInfo = styled.div`
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #000;
`

export const StyledDialogItemText = styled.div`
  font-size:${props => props.fontSize};
  font-weight: normal;
  ${props => props.customStyle}
`

export const StyledDialogText = styled.p`
  font-size: 1rem;
  font-weight: normal;
  display: inline-block;
  white-space: nowrap;
  color: #000 !important;
  text-align: center;
`