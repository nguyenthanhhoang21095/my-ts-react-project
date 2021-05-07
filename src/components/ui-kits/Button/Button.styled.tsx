import styled from 'styled-components'

export const StyledButton = styled.button`
  display: inline-block;
  width: ${props => props.width};
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: none;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  z-index: 1;
  color: #000;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  outline: none;
  background: #ffaf40;
  font-weight: bold;
  border-radius: 30px !important;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 9px 12px rgba(255, 175, 64, 0.6);
  position: relative;
  ${props => props.customStyle};
  &:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: rgba(255,255,255, 0.4);
    border-radius: 30px;
    transition: all 0.3s ease;
  }
  
  &:hover {
    border-radius: 30px;
  }

  &:hover:after {
    height: 100%;
    border-radius: 30px;
`