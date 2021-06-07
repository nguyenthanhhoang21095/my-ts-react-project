
import styled from "styled-components";

export const StyledUserDialogContainer = styled.div`
    position: absolute;
    top: 22px;
    bottom: 0;
    right: 0;
    left: -49px;
    width: fit-content;
    margin: 0 auto;
    padding-top: 12px;
    box-sizing: border-box;
    background: transparent;
`

export const StyledUserDialog = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 0 .5rem;
  min-width: 120px;
  background: #fff;
  height: fit-content;
  display: flex;
  
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

export const StyledUserDialogContent = styled.div`
  max-height: 300px;
  width: 100%;
  background: #fff;
  ${props => props.hasUserInfo ? 'overflow-y: scroll' : ''};
  box-sizing: border-box;
`

export const StyledDialogRow = styled.div`
  display: block;
`

export const StyledDivider = styled.hr`
  margin-left: 10%;
  margin-right: 10%;
  height: 2px;
  background: #f5f6fa;
  border: none;
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

export const StyledDialogText = styled.p`
  font-size: .8rem;
  font-weight: normal;
  display: inline-block;
  white-space: nowrap;
  background: #fff;
`