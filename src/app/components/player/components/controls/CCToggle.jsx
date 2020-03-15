import React from 'react';
import PropTypes from 'prop-types';
import { CCOn, CCOff, CCDisabled } from './buttons';

const CCToggle = ({ haveCaptions, captionIndex, toggleCaption }) => {
  if (!haveCaptions) return <CCDisabled />;

  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  return captionIndex > -1
    ? <CCOn onClick={toggleCaption} />
    : <CCOff onClick={toggleCaption} />;
};
CCToggle.propTypes = {
  captionIndex: PropTypes.number.isRequired,
  toggleCaption: PropTypes.func.isRequired,
  haveCaptions: PropTypes.bool.isRequired,
};

export default CCToggle;
