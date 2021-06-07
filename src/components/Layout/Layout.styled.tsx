import styled from 'styled-components'

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 100%;
  padding: 2rem 8rem;
  min-height: calc(100vh - 126px);

  ${props => props.customStyle};
`

export const StyledLayoutContain = styled.div`
  padding-left: 8rem;
  padding-right: 8rem;
  max-width: 100%;
  background: #000;
`