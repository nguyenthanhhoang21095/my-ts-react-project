import styled from 'styled-components'

const slideInKeyframe = `
    @-webkit-keyframes slide-in-right {
        0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
        }
        100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
        }
    }
    @keyframes slide-in-right {
        0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
        }
        100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
        }
    }
`

export const StyledToastContainer = styled.div`
  position: fixed;
  top: 84px;
  right: 40px;
  z-index: 999;
  border-radius: 30px;
  display: flex;
  padding: 0.5rem 1.5rem;
  min-height: 40px;
  min-width: 200px;
  width: fit-content;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  background: #27ae60;
  box-shadow: 0 0 20px 10px rgba(39, 174, 96, 0.5);

  -webkit-animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  ${slideInKeyframe}
`

export const StyledToastContent = styled.p`
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
`
