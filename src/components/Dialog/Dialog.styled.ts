
import styled from "styled-components";

export const StyledDialog = styled.div`
  position: absolute;
  top: 45px;
  padding: 1rem;
  padding-right: ${props => props.paddingRight};
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 1px 20px rgb(0 0 0 / 24%);
  border-radius: 0.5rem;
  background: #fff;
  width: fit-content;
  height: fit-content;
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
  max-height: 300px;
  width: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding-right: 1rem;
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
`

export const StyledDialogItemText = styled.div`
  font-size:${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  ${props => props.customStyle}
`

export const StyledDialogText = styled.span`
  clear: both;
  font-size: 1rem;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
`