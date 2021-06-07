import styled from 'styled-components'

export const StyledImageContainer = styled.div`
    position: relative;
    z-index: 1;
    width: ${props => props.width};
    height: ${props => props.height};
    ${props => props.cardAnimation};
`

export const StyleImageContent =  styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
`

export const StyledImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: linear-gradient(180deg, rgba(255,255,255, 0.1), rgba(0,0,0, 0.9));
`