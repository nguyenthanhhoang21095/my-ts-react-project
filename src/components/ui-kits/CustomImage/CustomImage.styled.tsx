import styled from 'styled-components'

interface ImageContainerProps {

}

export const StyledImageContainer = styled.div`
    position: relative;
    width: ${props => props.width};
    height: ${props => props.height};
    ${props => props.cardAnimation}
`

export const StyleImageContent =  styled.img`
    position: absolute;
    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
`