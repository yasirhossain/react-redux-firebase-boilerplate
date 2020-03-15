import React, { Component } from 'react';
import { Link } from 'react-router';

import Button from '@material-ui/core/Button';
import Menu, { MenuItem } from '@material-ui/core/Menu';
import Card, { CardHeader, CardContent, CardActions } from '@material-ui/core/Card';
import FontAwesome from 'react-fontawesome';

import streamDummyData from '../../utils/streamDummyData.js';
import firebaseTools from '../../utils/firebase';

import PinnedCreate from '../pinned/pinnedCreate';
import PollCreate from '../poll/pollCreate';

import PinnedCTA from '../pinned/pinnedCTA';

// Import Style
import styles from './ctaSelector.css';

export class CTASelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Message',
      description: 'Send a message to your audience',
      anchorEl: null,
      open: false,
      payload: [],
      viewable: false,
      actions: [
        {
          title: 'Poll',
          description: 'Poll your audience',
        },
        {
          title: 'Message',
          description: 'Send a message to your audience',
        }
      ],
    };
  }

  componentDidMount() {
    this.getCTA();
  }

  getCTA = () => {
    firebaseTools.database.ref('cta').on('value', snapshot => {
      if (snapshot.val() !== null) {
        this.setState({
          payload: snapshot.val().options,
          viewable: snapshot.val().options.viewable,
        });
      }
    });
  };

  handleDefault = event => {
    this.setState({
      open: false,
      title: 'Message',
      description: 'Send a message to your audience',
    });
  };

  handleClick = event => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = (action) => {
    if (action.title !== undefined) {
      this.setState({
        open: false,
        title: action.title,
      });
    } else this.handleDefault();
  };

  onBroadcastStop = () => {
    let options = {
      ... this.state.payload,
      viewable: false,
    }
    firebaseTools.setCTA(options);
  };

  render() {
    return (
      <div className={styles['cta-container']}>
        <Card>
          <CardHeader
            title="Call to Action"
            subheader={this.state.description}
          />
          <CardContent>
            <Button
              className={styles['dropdown']}
              aria-owns={this.state.open ? 'cta-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}>
              { this.state.title }
              <FontAwesome name='chevron-down' />
            </Button>

            <Menu
              id="cta-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onRequestClose={this.handleRequestClose}>
              {
                this.state.actions.map((action, index) => (
                  <MenuItem onClick={this.handleRequestClose.bind(this, action)} key={index}>{action.title}</MenuItem>
                ))
              }
            </Menu>

            { this.state.title === 'Message' ? <PinnedCreate avatar={streamDummyData.avatars.default} /> : <PollCreate avatar={streamDummyData.avatars.default} /> }
          </CardContent>
          { this.state.viewable ?
            <CardActions disableActionSpacing className={styles['button-container']}>
              <Button className={styles['secondary']} onClick={this.onBroadcastStop}>Stop Current</Button>
            </CardActions> : null
          }
        </Card>
      </div>
    );
  }
}

export default CTASelector;
