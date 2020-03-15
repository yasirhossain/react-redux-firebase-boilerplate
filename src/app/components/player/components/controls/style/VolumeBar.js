import styled from 'styled-components';

const s = {
  wrapper: styled.div`
    padding: 10px 8px;
    outline: none;
    cursor: pointer;
  `,

  progressWrapper: styled.div`
    height: 4px;
    border-radius: 2px;
    background: rgba(255,255,255,.8);
  `,

  progress: styled.div`
    position: relative;
    background: #fdd835; // dynamic width
    border-radius: 2px;
    height: 4px;
    width: 100%;
    
    &:before { // knob
      position: absolute;
      top: -4px;
      right: -6px;
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #fdd835;
      box-shadow: 0 0 4px 0 #000000;
    }
  `,
};

export default s;
