import styled from 'styled-components';

const s = {
  volume: styled.div`
    display: flex;
    align-items: center;
    pointer-events: all !important;
  `,

  volumeBarWrapper: styled.div`
    opacity: ${props => props.visible};
    overflow: hidden;
    transition: opacity 0.2s linear, width 0.2s linear;
    width: ${props => (props.visible ? '116px' : '0')};
    pointer-events: all;
  `,
};

export default s;
