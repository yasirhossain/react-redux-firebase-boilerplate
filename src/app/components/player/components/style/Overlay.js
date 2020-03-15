import styled from 'styled-components';

const Button = styled.button`
  display: block;
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  opacity: 0.8;

  @media (hover:hover) {
    &:hover {
      opacity: 1;
    }
  }

  &:active {
    opacity: 1;
  }

  svg {
    display: block !important; // ugly but better then inline using style={{ display: block }}
    margin: 0 auto;
    width: 24px !important;
    height: 24px !important;
    color: #ffffff !important;
    position: relative;
    top: 5px;
  }

  transition: opacity 0.3s linear;
`;

const EpisodeData = styled.div`
  margin-bottom: .4em;
  position: relative;
  z-index: 2;
`;

const MD = styled.span``;

const s = {
  wrapper: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  `,

  copyWrapper: styled.div`
    display: block;
    margin-bottom: 90px;
    flex: ${props => (props.visible ? 2 : 1)} 1 0;
    transition: flex-grow 0.3s linear;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: ${props => (props.playerIsFullscreen ? '60px 34px' : 0)};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;

    @media (max-width: 767px) {
      padding-bottom: 25px;
    }
    
    @media (max-width: 480px) {
       display: ${props => (props.playerIsFullscreen ? 'block' : 'none')};
       margin-bottom: ${props => (props.playerIsFullscreen ? '60px' : 0)};
       padding: ${props => (props.playerIsFullscreen ? '20px 10px' : 0)};
    }
  `,

  copyWrapperMinimized: styled.div`
    height: 42px;
    position: absolute;
    bottom: 10px;
    left: 120px;
  `,

  gradient: styled.div`
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(-180deg, rgba(35, 35, 35, 0) 0%, rgba(9, 9, 9, 0.66) 31%, rgba(0, 0, 0, 0.9) 100%);
    height: 344px;
    
    @media (max-width: 480px) {
      display: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'block' : 'none')};
    }
  `,

  channelLogo: styled.div`
    width: 210px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 20px;

    img {
      width: 100%;
    }
    
    @media (max-width: 768px) {
      display: none;
    }
  `,

  poster: styled.div`
    height: 209px;
    width: 145px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 20px;
    position: relative;
    img {
      width: 100%;
    }
    
    @media (max-width: 768px) {
      display: none;
    }
  `,

  content: styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
  `,

  contentWrapper: styled.div`
    display: flex; 
  `,

  episode: styled.div`
    display: inline-block;
    color: rgb(255, 255, 255);
    font-family: "Nunito";
    font-size: 16px;
    font-weight: 600;
    height: 22px;
    letter-spacing: 0.2px;
    overflow: hidden;
    
    @media (max-width: 480px) {
      font-size: 12px;
      font-weight: 100;
      height: auto;
    }
  `,

  rating: styled.div`
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    border: 1px solid rgb(255,255,255);
    width: fit-content;
    text-align: center;
    display: inline-block;
    padding: 0 4px;
    margin-right: 15px;
    
    @media (max-width: 480px) {
      font-size: 10px;
      flex-shrink: 0;
      height: 16px;
    }
  `,

  title: styled.div`
    font-family: "Oswald";
    color: rgb(255, 255, 255);
    font-size: 43px;
    font-weight: 600;
    letter-spacing: 0.52px;
    line-height: 56px;
    text-transform: uppercase;
    line-height: 46px;
    font-weight: 900;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => (props.playerIsFullscreen ? '2' : '1')};
    margin-bottom: 15px;
    font-size: ${props => (props.playerIsFullscreen ? '36px' : '24px')};

    @media (min-width: 768px) {
      font-size: 43px;
      line-height: 38px;
    }

    @media (max-width: 767px) {
      font-size: 20px;
      line-height: 1.3;
      margin-bottom: 5px
    }
  `,

  infoButton: Button.extend`
    @media (min-width: 768px) {
      margin-bottom: -8px;
    }
  `,

  videoControllsWrapper: styled.div`
    position: absolute;
    width: 100%;
    top: -70px;
    bottom: ${props => (props.visible ? '0' : '-170px')};
    opacity: ${props => (props.visible ? '1' : '0')};
    transition: opacity 0.3s linear, top 0.3s linear, bottom 0.3s linear;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 8%;
    z-index: 2;

    @media (max-width: 767px) {
      padding-bottom: 25px;
    }

    &:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 70px;
      pointer-events: none;
    }

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 320px;
      pointer-events: none;
    }
    
     @media (max-width: 480px) {
       bottom: ${props => (!props.playerIsFullscreen && '0')};
       opacity: ${props => (!props.playerIsFullscreen && '1')};
     }
  `,

  panel: styled.div`
    flex: ${props => (!props.playerIsFullscreen ? 2 : 1)} 1 0;
    transition: flex-grow 0.3s linear;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 90px;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 2;

    @media (max-width: 767px) {
      padding-bottom: 25px;
    }
  `,

  episodeSeriesName: EpisodeData.extend`
    font-size: 36px;
    line-height: 46px;
    font-weight: 900;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  `,

  episodeName: EpisodeData.extend`
    font-size: 24px;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => (props.playerIsFullscreen ? '2' : '1')};
    display: none;

    svg {
      color: #fff !important;
      position: relative;
      top: 3px;
    }

    &:before { content: open-quote; }
    &:after { content: close-quote; }

    @media (max-width: 767px) {
      font-size: 12px;
      line-height: 1.3;
    }

    @media (min-width: 401px) {
      display: ${props => (props.playerIsFullscreen ? '-webkit-box' : 'none')};
    }
  `,

  episodeDescription: EpisodeData.extend`
    font-size: 18px;
    line-height: 23px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    display: none;

    @media (max-width: 767px) {
      font-size: 12px;
      line-height: 1.3;
    }

    @media (min-width: 401px) {
      display: ${props => (props.playerIsFullscreen ? '-webkit-box' : 'none')};
    }
  `,

  metadata: styled.div`
    font-size: 18px;
    margin-bottom: 1.4em;
    display: ${props => (props.playerIsFullscreen ? '-webkit-box' : 'none')};

    ${MD} + ${MD} {
      margin-left: 2em;
      position: relative;
    }
    ${MD} + ${MD}:before {
      content: '.';
      position: absolute;
      top: -16px;
      left: -25px;
      font-size: 30px;
    }

    @media (max-width: 767px) {
      font-size: 12px;
    }
  `,

  MD,
};

export default s;
