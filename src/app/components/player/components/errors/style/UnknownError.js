import styled from 'styled-components';

const s = {
  dialog: styled.div`
    max-width: 354px;
    color: #ffffff;
    max-height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  `,

  title: styled.div`
    font-size: 32px;
    font-weight: bold;
    line-height: 33px;
    text-align: center;
    margin-bottom: 16px;
  `,

  description: styled.div`
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    margin-bottom: 26px;
  `,

  button: styled.button`
    display: flex;
    width: 210px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    
    color: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    
    background-color: #0364E7;
    height: 48px;
    border-radius: 24px;
    
    font-size: 26px;
    font-weight: bold;
    line-height: 32px;
    text-align: center;
    
    @media (hover:hover) {
      &:hover {
        background-color: #2A89FB;
      }
    }
    
    &:active {
      background-color: #80B9FF;
    }
        
    transition: background-color 0.3s linear;
  `,

};

export default s;
