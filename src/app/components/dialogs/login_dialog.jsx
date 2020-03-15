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
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import { toggleLogin } from '../../actions/home_actions';
import { login } from '../../actions/user_actions';
import { getUserState } from '../../reducers/user_reducer';

//import banner from '../../../assets/images/logo-2.jpg';

export class LoginDialog extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    errors: [],
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      errors: [],
    });
  };

  handleClickOpen = () => {
    this.props.dispatch(toggleLogin());
  };

  handleRequestClose = () => {
    this.props.dispatch(toggleLogin());
  };

  onSubmit = (e) => {
    e.preventDefault();

    const email = this.state.email,
          password = this.state.password,
          errors = this.state.errors;

    if (!(email.length > 0)) {
      errors.push('Please enter an email. ');
    }

    if (!(password.length > 0)) {
      errors.push('Please enter a password. ');
    }

    this.setState({
      errors: errors
    });

    // Sucess
    if (!(errors.length > 0)) {
      this.props.dispatch(login({ email, password })).then(() => {
        if (this.props.user.isAuthenticated) {
          this.handleRequestClose();
          this.setState({
            email: '',
            password: '',
            errors: [],
          });
          GoogleAnalytics.initialize('UA-107154170-1');
          GoogleAnalytics.event({
            category: 'User',
            action: 'Logs into Account'
          });
        } else {
          this.setState({
            email: '',
            password: '',
            errors: [this.props.user.error],
          });
        }
      });
    }
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
        <Dialog open={this.props.showLoginDialog} transition={Slide} onRequestClose={this.handleRequestClose}>
          <DialogContent style={DialogStyle}>
            <div className={'banner-container'}>
              <div style={{background: `transparent url("${banner}") center no-repeat`, backgroundSize: 'cover'}}></div>
            </div>
            <div className={'copy-container'}>
              <h2>Login</h2>
                <form onSubmit={(e) => this.onSubmit(e)}>
                  <TextField
                    required
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    style={TextFieldStyle}
                  />
                  <TextField
                    required
                    type="password"
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    style={TextFieldStyle}
                  />
                  <DialogActions style={ButtonActionsStyle}>
                    <Button onClick={this.handleRequestClose} color="default">
                      Cancel
                    </Button>
                    <Button type="submit" value="Sign Up" onClick={this.onSubmit.bind(this)} color="primary">
                      Login
                    </Button>
                  </DialogActions>
                </form>
                <div className={'errors'}>
                  {
                    this.state.errors.map(error => (
                      <label key={error}>{ error }</label>
                    ))
                  }
                  { this.props.isLoginFailure ? 'Check your email addresss and password. ' : '' }
                </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

LoginDialog.propTypes = {
  showLoginDialog: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginDialog;
