import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog, {
  DialogContent,
} from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import SignupForm from '../components/SignupForm'

import { toggleSignup } from '../../App/AppActions';

import banner from '../../../assets/images/logo-2.jpg';

export class Dialog extends Component {
  state = {
    name: 'Email',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickOpen = () => {
    this.props.dispatch(toggleSignup());
  };

  handleRequestClose = () => {
    this.props.dispatch(toggleSignup());
  };

  render() {
    const
    DialogStyle = {
      padding: 0,
      display: 'flex',
    },
    TextFieldStyle = {
      width: '100%',
    },
    ButtonActionsStyle = {
      margin: 0,
    };

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Slide in alert dialog</Button>
        <Dialog open={this.props.showSignupDialog || this.props.showLoginDialog} transition={Slide} onRequestClose={this.handleRequestClose}>
          <DialogContent style={DialogStyle}>
            <div className={'banner-container'}>
              <div style={{background: `transparent url("${banner}") center no-repeat`, backgroundSize: 'cover'}}></div>
            </div>
            {
              this.props.showSignupDialog ? (
                <SignupForm />
              ) : null
            }
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Dialog.propTypes = {
  showSignupDialog: PropTypes.bool,
  showLoginDialog: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default Dialog;
