import styled from 'styled-components';

const s = {
  videoControls: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  `,

  topControls: styled.div`
    position: absolute;
    top: 7px;
    left: 16px;
    right: 16px;
    padding: ${props => (props.playerIsFullscreen ? '0 8%' : 0)};
  `,

  middleControls: styled.div`
    position: absolute;
    top: calc(50% + 35px);
    left: 50%;
    display: flex;
    padding: 40px 8%;
    transform: translate3d(-50%, -50%, 0) scale(1.5);
  `,

  bottomControls: styled.div`
    display: flex;
    opacity: 1;
    justify-content: space-between;
    align-items: center;
      
    @media only screen and (min-device-width: 321px) and (max-device-width: 480px) {
      display: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'flex' : 'none')};
    }

    @media only screen and (max-device-width: 320px) {
      display: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'flex' : 'none')};
      transform: scale(0.85);
      margin-left:-15px;
    }
  `,

  bottomControlsLeft: styled.div`
    display: flex;
  `,

  bottomControlsMiddle: styled.div`
    display: flex;
  `,

  bottomControlsRight: styled.div`
    display: flex;
    margin-right: -15px;
  `,

  leftControls: styled.div`
    display: flex;
    float: left;
  `,

  rightControls: styled.div`
    display: flex;
    float: right;
    min-height: 40px;
  `,

  bottomPanel: styled.div`
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding:  ${({ playerIsFullscreen }) => (playerIsFullscreen ? '34px' : '5px 10px;')};
    
    @media (max-width: 767px) {
      padding: 10px 5%;
    }
    
    @media (max-width: 480px) {
      padding: ${({ playerIsFullscreen }) => (playerIsFullscreen ? '5px 10px;' : 0)};
    }
  `,

  expandPlayer: styled.div`
    display: none;
    
    @media (max-width: 480px) {
      display: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'none' : 'block')};
      position: absolute;
      bottom: 8px;
      right: 0;
    }
  `,

  progressBarWrapper: styled.div`
    border-radius: 4px;
    display: flex;
    font-size: 1.3rem;
    font-weight: bold;
  `,

  progressBarFrom: styled.div`
    color: #66D7CA;
  `,

  progressBarTotal: styled.div`
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: inherit;
    flex: 1 1 auto;
    height: 8px;
    margin: auto 2rem;
  `,

  progressBarEnd: styled.div`
    color: #fff;
    opacity: 0.7;
  `,

  seekerWrapper: styled.div`
    margin-bottom: ${props => (props.hideTimes ? '24px' : 0)};
    
    @media (max-width: 767px) {
      margin-bottom: ${props => (props.hideTimes ? '8px' : 0)}      
    }
  `,
};

export default s;
