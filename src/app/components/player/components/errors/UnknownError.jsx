import React from 'react';
import PropTypes from 'prop-types';
import s from './style/UnknownError';

function UnknownError({ retry }) {
  return (
    <s.dialog>
      <s.title>An error has occurred</s.title>
      <s.description>
        Please check your connection and try again.
      </s.description>
      <s.button onClick={retry}>Retry</s.button>
    </s.dialog>
  );
}
UnknownError.propTypes = {
  retry: PropTypes.func.isRequired,
};

export { UnknownError };
