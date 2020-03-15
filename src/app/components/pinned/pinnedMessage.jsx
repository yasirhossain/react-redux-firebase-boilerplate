import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class PinnedMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewable: this.props.viewable,
    };
  }

  hideMessage = () => {
    this.setState({ viewable: false });
  }

  render() {
    return (
      <div key={`${this.props.id}-${this.props.type}`} className={`${'pinned-message'} ${(this.state.viewable && this.props.viewable) ? '' : 'hide'}`}>
        <div className={'avatar'}>
          <img src={this.props.avatar} />
        </div>
        <div className={'body'}>
          <div>
            <div className={'user-name'}>{this.props.name}</div>
            <div className={'copy'}>{this.props.message}</div>
          </div>
        </div>
        <div className={'actions'}>
          <FontAwesome name='times' onClick={this.hideMessage} />
        </div>
      </div>
    );
  }
}

PinnedMessage.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  viewable: PropTypes.bool.isRequired,
};

export default PinnedMessage;
