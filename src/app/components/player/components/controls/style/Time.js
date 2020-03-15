import styled from 'styled-components';

const s = {
  time: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    float: right;
    color: #ffffff;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    
    @media only screen and (max-width: 480px) {
      opacity: .8;
    }
  `,

  timeStart: styled.div`
    height: 24px;
    opacity: .8;
    color: #ffffff;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    padding-right: 10px;
    display: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'block' : 'none')};
  
    @media only screen and (max-width: 480px) {
      font-family: 'NunitoSans-Bold', sans-serif;
      display: block;
      font-size: 11px;
      padding-right: 5px;
    }
  `,

  timeEnd: styled.div`
    height: 24px;
    opacity: .8;
    color: #ffffff;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    padding-left: 10px;
    display: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'block' : 'none')};
  
    @media only screen and (max-width: 480px) {
      font-family: 'NunitoSans-Bold', sans-serif;
      display: block;
      font-size: 11px;
      padding-left: 5px;
    }
  `,
};

export default s;
