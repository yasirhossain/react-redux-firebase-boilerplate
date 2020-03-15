/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import streamDummyData from '../../../utils/streamDummyData.js';
import firebaseTools from '../../../utils/firebase';

export class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }

  componentDidMount() {
    //this.loadChatControls();
  }

  castFeedback = (feedback) => {
    console.log(feedback);
  };

  render() {
    return (
      <div className={'feedback-card'}>
        <div className={'actions'}>
          <FontAwesome name='thumbs-up' onClick={this.castFeedback.bind(this, 'like')} />
          <FontAwesome name='thumbs-down' onClick={this.castFeedback.bind(this, 'dislike')} />
        </div>
      </div>
    );
  }
}

export default Feedback;
