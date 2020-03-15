import { connect } from 'react-redux';
import * as chatActions from '../actions';
import { ShowHideChatContainer } from '../components/ShowHideChat';
import * as selectors from '../selectors';

const mapStateToProps = state => ({
  isChatEnabled: selectors.isEnabled(state),
  isVisible: selectors.isVisible(state),
});

const mapDispatchToProps = ({
  hide: chatActions.hide,
  show: chatActions.show,
});

const mergeProps = (stateProps, dispatchProps) => ({
  isChatEnabled: stateProps.isChatEnabled,
  toggle: () => {
    if (stateProps.isVisible) {
      dispatchProps.hide();
    } else {
      dispatchProps.show();
    }
  },
});

export const ShowHideChat =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(ShowHideChatContainer);
