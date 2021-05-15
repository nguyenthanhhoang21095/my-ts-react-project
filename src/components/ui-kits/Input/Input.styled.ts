import styled from 'styled-components'

export const StyledInputContainer = styled.div`
  margin: 5% 10%;
  position: relative;
  width: fit-content;
`

export const StyledInput = styled.input`
  padding: 10px 10px 10px 5px;
  font-size: 18px;
  width: 280px;
  border: 1px solid;
  border-color: transparent transparent gray;
  background-color: transparent;
  &:focus {
    font-size: 12px;
    color: rgb(148, 98, 255);
    top: -1%;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    outline: none;
  }
`

export const StyledLabel = styled.label`
  position: absolute;
  top: 30%;
  font-size: 18px;
  color: rgb(165, 165, 165);
  left: 3%;
  z-index: -1;
  pointer-events: none;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
`

export const StyledBar = styled.div`
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: rgb(148, 98, 255);
  top: calc(100% - 2px);
  left: 0;
  transform: scaleX(0);
  -webkit-transform: scaleX(0);
  -moz-transform: scaleX(0);
  -ms-transform: scaleX(0);
  -o-transform: scaleX(0);
`

export const StyledHighLight = styled.div`
  width: 100%;
  height: 85%;
  position: absolute;
  background-color: rgba(148, 98, 255, 0.2);
  top: 15%;
  left: 0;
  visibility: hidden;
  z-index: -1;
`
