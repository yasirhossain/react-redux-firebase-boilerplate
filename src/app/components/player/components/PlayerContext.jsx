import React from 'react';

const PlayerContext = React.createContext({
  playerState: 'idle',
  isMuted: false,
  duration: 0,
  position: 0,
});

export { PlayerContext };

export const withPlayer = WrappedComponent => props => (
  <PlayerContext.Consumer>
    {player => (
      <WrappedComponent {...props} player={player} />
    )}
  </PlayerContext.Consumer>
);
