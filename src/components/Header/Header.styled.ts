import styled from 'styled-components'
import Button from '../ui-kits/Button/Button'

export const StyledHeader = styled.div`
  align-items: center;
  background: #fff;
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
  grid-template-columns: 100px auto 100px;
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
  display: grid;
  align-content: space-around;
  grid-template-columns: inherit;
  list-style: none;
`
export const StyledHeaderMenuItem = styled.li`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  padding-left: 2.5rem;
`

export const StyledHeaderButton = styled(Button)``

export const StyledHeaderCart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const StyledCartNumber = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  padding: 0.2rem;
  box-sizing: border-box;
  display: flex;
  margin-top: -35px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 0.75rem;
  background: #000;
`
