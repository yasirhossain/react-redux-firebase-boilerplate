import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    const errors = this.state.errors;

    if (!(emailRef.value.length > 0)) {
      errors.push('Please enter an email.');
    }

    if (!(passwordRef.value.length > 0)) {
      errors.push('Please enter a password.');
    }

    this.setState({
      errors: errors
    });

    // Sucess
    if (!(errors.length > 0)) {
      this.props.signInUser(emailRef.value, passwordRef.value);
      emailRef.value = passwordRef.value = '';
      this.setState({
        errors: [],
      })
    }
  };

  render() {
    const errors = this.state.errors;
    return (
      <div className={'form'}>
        <form action="#" onSubmit={(e) => this.onSubmit(e)}>
          <div className={'form-group'}>
            <label>Email</label>
            <input type="email" ref="email" />
          </div>

          <div className={'form-group'}>
            <label>Password</label>
            <input type="password" ref="password" />
          </div>

          <button type="submit" value="Sign Up" className={'submit-btn'}>Sign Up</button>
        </form>

        <div className={'errors'}>
          {
            errors.map(error => (
              <label key={error}>{ error }</label>
            ))
          }
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  signInUser: PropTypes.func.isRequired
};

export default SignInForm;
