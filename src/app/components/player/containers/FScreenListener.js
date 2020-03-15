import { connect } from 'react-redux';
import { FScreenListenerComponent } from '../components/FScreenListener';
import { internalEnteredFullscreen, internalExitedFullscreen } from '../actions';

const mapDispatchToProps = {
  internalEnteredFullscreen,
  internalExitedFullscreen,
};

export const FScreenListener = connect(null, mapDispatchToProps)(FScreenListenerComponent);
