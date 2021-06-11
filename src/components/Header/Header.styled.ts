import styled from 'styled-components'

export const StyledHeader = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  contain: layout;
  display: flex;
  align-items: center;
  font-size: 18px;
  height: 60px;
  padding: 0 8rem 0 6.5rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 200;

  -ms-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
`

export const StyledHeaderLogo = styled.div`
  width: fit-content;
  display: inline-block;
  height: 100%;
`

export const StyledHeaderLogoImg = styled.img`
  width: 150px;
  z-index: 99;
  height: 100%;
`

export const StyleHeaderList = styled.div`
  flex-grow: 1;
  margin-left: 80px;
`

export const StyledHeaderMenu = styled.div`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyleHeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`

export const StyledHeaderMenuItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  position: relative;

  ${props => props.styleItem}
`

export const StyledHeaderCart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const StyledCartNumber = styled.div`
  width: 18px;
  height: 18px;
  font-size: 12px;
  font-weight: normal;
  position: absolute;
  top: -6px;
  right: -15px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3498db;
  border-radius: 50%;
  color: #fff;
`

