import styled from 'styled-components'

export const StyledHeader = styled.div`
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 175, 64, 1), rgba(255, 211, 42, 1));
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
  color: #202124;
  contain: layout;
  display: grid;
  font-size: 14px;
  height: 64px;
  padding: 0 40px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 200;
  grid-template-columns: 100px auto;
`

export const StyledHeaderLogo = styled.div`
  width: 100%;
  position: relative;
`

export const StyledHeaderLogoImg = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: -10px;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 8rem;
`

export const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
`

export const StyleHeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`

export const StyledHeaderMenuItem = styled.li`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  padding-left: 2.5rem;
`

export const StyledHeaderCart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const StyledCartNumber = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  top: -4px;
  right: -12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 0.75rem;
  background: #000;
`

