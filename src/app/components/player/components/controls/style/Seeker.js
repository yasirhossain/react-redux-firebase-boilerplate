import styled, { css } from 'styled-components';

const s = {
  wrapper: styled.div`
    display: flex;
    align-items: center;
    height: ${({ playerIsFullscreen }) => (playerIsFullscreen ? '24px' : 'auto')};
    cursor: ${({ passive }) => !passive && 'pointer'};
    margin-bottom: ${({ playerIsFullscreen }) => (playerIsFullscreen ? '15px' : '-11px')};
    outline: none;
    padding: 10px 0;
    
    @media only screen and (max-width: 480px) {
      margin-bottom: 0;
      position: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'relative' : 'absolute')};
      bottom: 0;
      left: 0;
      right: 0;  
      padding: ${({ playerIsFullscreen }) => (playerIsFullscreen ? '10px 0' : 0)};
      > div > div:first-child {
        display: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'block' : 'none')};
      }
      > div > div:last-child {
        display: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'block' : 'none')};
      }
    }
  `,

  progressWrapper: styled.div`
    background-color: ${props => (props.isVOD ? 'rgba(216, 216, 216, .4)' : 'rgba(216, 216, 216, .6)')};
    border-radius: 2px;
    height: 6px;
    width: 100%;

    ${({ passive }) => !passive && css`
      @media (hover:hover) {
        &:hover {
          background: rgba(216, 216, 216, .4);
        }
      }
    `};
    
    @media only screen and (max-width: 480px) {
      position: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'relative' : 'absolute')};
    }
  `,

  progress: styled.div`
    position: relative;
    background-color: #fdd835; // dynamic width
    border-radius: 2px;
    height: 6px;
    width: 100%;
    
    &:before { // knob
      display: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'block' : 'none')};
      position: absolute;
      top: -3px;
      right: -6px;
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #fdd835;
      box-shadow: 0 0 4px 0 #000000;
    }
  `,
};

export default s;
