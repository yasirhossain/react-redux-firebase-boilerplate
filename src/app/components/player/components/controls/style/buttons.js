import styled from 'styled-components';

const s = {
  button: styled.button`
    display: block;
    width: 45px;
    height: 45px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    opacity: 1;
  
    @media (hover:hover) {
      &:hover {
        opacity: 1;
      }
    }
  
    &:active {
      opacity: 1;
    }

    &:focus {
      border: 2px solid #fff;
    }
    
    svg {
      display: block !important; // ugly but better then inline using style={{ display: block }}
      margin: 0 auto;
      color: #ffffff !important;
      opacity: .8;
    }
    
    transition: opacity 0.3s linear;

    @media screen and (min-color-index:0) and(-webkit-min-device-pixel-ratio:0)
    { @media {
      svg {
        margin-left: -20px;
      }
    }}
  `,
};

s.volume = s.button.extend`
  height: 26px;
  width: 34px;
`;
s.unmute = s.button.extend`
  display: flex;
  background-color: #2c2c2c;
  border-radius: 4px;
  align-items: center;
  height: 32px;
  width: 100px;
  color: #fff;
  
  svg {
    margin: 0;
    margin-right: 8px;
  }

  @media (max-width: 420px) {
    font-size: 0;
    width: 34px;
  }
`;

export default s;
