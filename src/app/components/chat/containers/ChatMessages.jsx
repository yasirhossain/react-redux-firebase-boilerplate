import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CellMeasurerCache } from 'react-virtualized';
import { messageItemHeight } from '../constants/sizes';
import * as chatSelectors from '../selectors';
import { ChatMessagesComponent } from '../components/ChatMessages';

class ChatMessagesContainer extends PureComponent {
  static propTypes = {
    messageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    prevList: null,
    scrollToIndex: -1,
  }

  static getDerivedStateFromProps(props, state) {
    const finalState = { scrollToIndex: -1 };
    if (state.prevList !== props.messageList) {
      finalState.scrollToIndex = props.messageList.length - 1;
      finalState.prevList = props.messageList;
    }
    return finalState;
  }

  componentDidUpdate() {
    if (this.listRef.current) {
      this.messageMeasurerCache.clearAll();
    }
  }

  clearScrollToIndex = () => {
    if (this.state.scrollToIndex !== -1) {
      if (this.scrollAnimationFrame) {
        cancelAnimationFrame(this.scrollAnimationFrame);
      }
      this.scrollAnimationFrame = requestAnimationFrame(() => {
        this.setState({ scrollToIndex: -1 });
      });
    }
  }

  scrollAnimationFrame;

  messageMeasurerCache = new CellMeasurerCache({
    defaultHeight: messageItemHeight,
    fixedWidth: true,
  })

  listScroll = () => {
    this.clearScrollToIndex();
  }

  listRef = createRef();

  render() {
    const { messageList } = this.props;
    const { scrollToIndex } = this.state;

    return (
      <ChatMessagesComponent
        cellMeasurerCache={this.messageMeasurerCache}
        messageList={messageList}
        listRef={this.listRef}
        scrollToIndex={scrollToIndex}
        onScroll={this.listScroll}
      />
    );
  }
}

const mapStateToProps = state => ({
  messageList: chatSelectors.messageList(state),
});

export const ChatMessages = connect(mapStateToProps, undefined, undefined, {
  pure: true,
})(ChatMessagesContainer);
