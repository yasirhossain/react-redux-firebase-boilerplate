import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LoadingLogo from '../../application/components/LoadingLogo';

const Wrapper = styled.div.attrs({
  style: ({ featuredImage }) => {
    const finalStyle = {};
    if (featuredImage) {
      finalStyle.backgroundImage = `url('${featuredImage}')`;
    }
    return finalStyle;
  },
})`
  height: 100%;
  top: 0;
  left: 0;
  opacity: ${props => (props.active ? 1 : 0)};
  pointer-events: none;
  position: absolute;
  transition: opacity 0.3s;
  width: 100%;
  z-index: 1;
  background-position: top;
  background-size: cover;
  margin-top: ${props => (!props.featuredImage ? '-15vh' : '')};
  @media (max-width: 767px) {
    margin-top: ${props => (!props.featuredImage ? '-35vh' : '')};
  }
`;

const LoadingIndicator = ({
  className,
  featuredImage,
  active,
}) => (
  featuredImage === null ? <Wrapper className={className} active={active}><LoadingLogo /></Wrapper> :
  <Wrapper className={className} featuredImage={featuredImage} active={active}>
    <LinearProgress color="primary" />
  </Wrapper>
);
LoadingIndicator.propTypes = {
  active: PropTypes.bool.isRequired,
  featuredImage: PropTypes.string,
  className: PropTypes.string,
};
LoadingIndicator.defaultProps = {
  featuredImage: null,
  className: null,
};

export { LoadingIndicator };
