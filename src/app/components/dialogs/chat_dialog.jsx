import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleAnalytics from 'react-ga';
import Button from '@material-ui/core/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/Dialog';
import { FormGroup, FormControlLabel } from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import { toggleChatDialog, setTempUser } from '../../actions/live_actions';

//import banner from '../../../assets/images/logo-2.jpg';

export class ChatNameDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatName: '',
      errors: [],
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      errors: [],
    });
  };

  handleClickOpen = () => {
    this.props.dispatch(toggleChatDialog());
  };

  handleRequestClose = () => {
    this.props.dispatch(toggleChatDialog());
  };

  onSubmit = (e) => {
    e.preventDefault();

    const chatName = this.state.chatName,
          avatar = this.props.avatar,
          errors = this.state.errors;

    if ((chatName.length < 2)) {
      errors.push('Please choose a longer chat name. ');
    }

    if ((chatName.length > 20)) {
      errors.push('Please choose a shorter chat name. ');
    }

    this.setState({
      errors: errors
    });

    // Sucess
    if (!(errors.length > 0)) {
      this.props.dispatch(setTempUser({ chatName, avatar }));
      this.handleRequestClose();
      this.setState({
        chatName: '',
        errors: [],
      });
      GoogleAnalytics.initialize('UA-107154170-1');
      GoogleAnalytics.event({
        category: 'User',
        action: 'Selects a chat name'
      });
    }
  };

  render() {
    const DialogStyle = {
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
        <Dialog open={this.props.showChatNameDialog} transition={Slide} onRequestClose={this.handleRequestClose}>
          <DialogContent style={DialogStyle} className={'dialog'}>
            <div className={'banner-container'}>
              <div style={{background: `transparent url("") center no-repeat`, backgroundSize: 'cover'}}></div>
            </div>
            <div className={'copy-container'}>
              <h2>Become a Pluto Citizen</h2>
              <DialogContentText>
                Choose a chat name and let your presence be known!
              </DialogContentText>
              <form onSubmit={(e) => this.onSubmit(e)}>
                <TextField
                  label="Chat Name"
                  placeholder="Chat Name"
                  margin="normal"
                  helperText="Customize your chat name"
                  value={this.state.chatName}
                  onChange={this.handleChange('chatName')}
                  style={TextFieldStyle}
                />
                <DialogActions style={ButtonActionsStyle}>
                  <Button onClick={this.handleRequestClose} color="default">
                    Cancel
                  </Button>
                  <Button type="submit" value="Sign Up" onClick={this.onSubmit} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </form>
              <div className={'errors'}>
                {
                  this.state.errors.map(error => (
                    <label key={error}>{ error }</label>
                  ))
                }
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

ChatNameDialog.propTypes = {
  showChatNameDialog: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ChatNameDialog;
