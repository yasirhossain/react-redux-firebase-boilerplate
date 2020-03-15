import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import firebaseTools from '../../utils/firebase';

export class PinnedPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewable: this.props.viewable,
    };
  }

  hideMessage = () => {
    this.setState({ viewable: false });
  }

  castVote = (vote) => {
    let response = vote,
        voteOptions = this.props.data,
        voteTotal = this.props.total;

    voteOptions.map((vote) => {
      if (response === vote.label) {
        vote.value ++;
        voteTotal ++;

        const options = {
          type: 'POLL',
          id: this.props.id,
          name: this.props.name,
          avatar: this.props.avatar,
          title: this.props.title,
          data: voteOptions,
          total: voteTotal,
          viewable: true,
        }

        firebaseTools.setCTA(options);
      }
    })
  };

  render() {
    const pollOptions = this.props.data;
    const pollOptionsList = pollOptions.map((vote, i) => {
      let pollStyle = {
            width: `${(vote.value / this.props.total) * 100}%`
          },
          voteValue = vote.value;

      if (voteValue !== 0) {
        voteValue = ((vote.value / this.props.total) * 100).toFixed(0)
      }

      return (
        <li key={i} data-value={vote.label} onClick={this.castVote.bind(this, vote.label)}>
          <label className={'title'}>{vote.label}</label>
          <label className={'value'}>{voteValue}%</label>
          <div className={'bar'} style={pollStyle}></div>
        </li>
      );
    });

    return (
      <div key={`${this.props.id}-${this.props.type}`} className={`${'pinned-poll'} ${(this.state.viewable && this.props.viewable) ? '' : 'hide'}`}>
        <div className={'body'}>
          <div className={'poll'}>
            <div className={'title'}>{this.props.title}</div>
            <div className={'pinned-poll-results'}>
             <ul className={'list-unstyled'}>
                {pollOptionsList}
             </ul>
           </div>
          </div>
        </div>
        <div className={'actions'}>
          <FontAwesome name='times' onClick={this.hideMessage} />
        </div>
      </div>
    );
  }
}

PinnedPoll.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  viewable: PropTypes.bool.isRequired,
};

export default PinnedPoll;
