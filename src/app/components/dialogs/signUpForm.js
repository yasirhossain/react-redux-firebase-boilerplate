import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileType: 'link',
      fileName: '',
      filePreview: '',
      errors: []
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const nameRef = this.refs.name;
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    const password2Ref = this.refs.password2;
    const locationRef = this.refs.location;
    const errors = this.state.errors;

    if (!(nameRef.value.length > 0)) {
      errors.push('Please enter your name.');
    }

    if (!(emailRef.value.length > 0)) {
      errors.push('Please enter an email.');
    }

    if (!(passwordRef.value.length > 0)) {
      errors.push('Please enter a password.');
    }

    // Check for password match
    if (passwordRef.value !== password2Ref.value) {
      errors.push('Password email combination incorrect.');
    }

    this.setState({
      errors: errors
    });

    // Sucess
    if (!(errors.length > 0)) {
      this.props.addUser(nameRef.value, emailRef.value, passwordRef.value, locationRef.value, this.state.fileName, this.state.fileType, this.state.filePreview);
      nameRef.value = emailRef.value = passwordRef.value = password2Ref.value = locationRef.value = '';
      this.setState({
        errors: [],
        fileName: '',
        fileType: 'link',
        filePreview: '',
      })
    }
  };

  onDrop = (files) => {
    const file = files[0];
    this.setState({
      fileType: file.type,
      fileName: file.name,
      filePreview: file.preview,
    });
  };

  render() {
    const errors = this.state.errors;
    const image = this.state.filePreview;
    return (
      <div className={styles['form']}>
        <form action="#" onSubmit={(e) => this.onSubmit(e)}>
          <div className={styles['form-group']}>
            <label>Name</label>
            <input type="name" ref="name" />
          </div>

          <div className={styles['form-group']}>
            <label>Email</label>
            <input type="email" ref="email" />
          </div>

          <div className={styles['form-group']}>
            <label>Password</label>
            <input type="password" ref="password" />
          </div>
          <div className={styles['form-group']}>
            <label>Re-Enter Password</label>
            <input type="password" ref="password2" />
          </div>

          <div className={styles['form-group']}>
            <label>Location</label>
            <input type="location" ref="location" />
          </div>

          <div className={styles['form-group']}>
            <label>Avatar</label>
            <Dropzone onDrop={ this.onDrop } size={ 150 }>
              <div>
                Add your Avatar Here
              </div>
            </Dropzone>
            <div className={styles['preview']}>
              <img src={image} />
            </div>
          </div>
          <button type="submit" value="Sign Up" className={styles['submit-btn']}>Sign Up</button>
        </form>

        <div className={styles['errors']}>
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

SignUpForm.propTypes = {
  addUser: PropTypes.func.isRequired
};

export default SignUpForm;
