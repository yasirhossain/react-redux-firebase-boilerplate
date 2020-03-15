import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List, CellMeasurer } from 'react-virtualized';
import { ChatMessage } from '../containers/ChatMessage';

export class ChatMessagesComponent extends Component {
  static propTypes = {
    cellMeasurerCache: PropTypes.shape({}),
    messageList: PropTypes.arrayOf(PropTypes.string),
    listRef: PropTypes.shape({}),
    scrollToIndex: PropTypes.number,
    onScroll: PropTypes.func,
  };

  static defaultProps = {
    cellMeasurerCache: {
      rowHeight: -1,
    },
    messageList: [],
    listRef: null,
    scrollToIndex: -1,
    onScroll: null,
  };

  messageRenderer = ({
    key, index, style, parent,
  }) => (
    <CellMeasurer
      cache={this.props.cellMeasurerCache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
    >
      <div style={style}>
        <ChatMessage
          id={this.props.messageList[index]}
          isLast={index === this.props.messageList.length - 1}
        />
      </div>
    </CellMeasurer>
  );

  render() {
    const {
      messageList,
      listRef,
      cellMeasurerCache,
      scrollToIndex,
      onScroll,
    } = this.props;
    const totalItems = messageList.length;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            deferredMeasurementCache={cellMeasurerCache}
            rowHeight={cellMeasurerCache.rowHeight}
            rowCount={totalItems}
            scrollToIndex={scrollToIndex}
            onScroll={onScroll}
            rowRenderer={this.messageRenderer}
            scrollToAlignment="end"
          />
        )}
      </AutoSizer>
    );
  }
}
