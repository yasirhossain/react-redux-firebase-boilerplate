import axios from 'axios';
import fetch from 'isomorphic-fetch';
import Config from '../../../server/config';
import setAuthorizationToken from '../../util/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

// Export Constants
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REFRESH_REQUEST = 'REFRESH_REQUEST';
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS';
export const REFRESH_FAILURE = 'REFRESH_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

export const LOGOUT = 'LOGOUT_USER';
export const RESET_USER = 'RESET_USER';

// Export Actions
function loginRequest() {
	return {
		type: LOGIN_REQUEST
	}
}

function loginFailure() {
	return {
		type: LOGIN_FAILURE
	}
}

function loginSuccess(token, user) {
	localStorage.setItem('token', token);
  setAuthorizationToken(token);
	return {
		type: LOGIN_SUCCESS,
    user
	}
}

export function login(user) {
  return (dispatch) => {
		dispatch(loginRequest());
		return fetch(`${API_URL}/users/login`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        user: {
          email: user.email,
          password: user.password,
        },
      })
		}).then(response => {
			if (response.status !== 200) throw new Error(response.statusText);
			return response.json();
		}).then(response => {
			dispatch(loginSuccess(response.token, response.user));
		}).catch(error => {
			dispatch(loginFailure());
		});
	}
}

function resetUser() {
  return {
		type: RESET_USER
	}
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch(resetUser());
  }
}

function signupRequest() {
	return {
		type: SIGNUP_REQUEST
	}
}

function signupFailure() {
	return {
		type: SIGNUP_FAILURE
	}
}

function signupSuccess(token, user) {
	localStorage.setItem('token', token);
	return {
		type: SIGNUP_SUCCESS,
    user
	}
}

export function signup(user) {
  return (dispatch) => {
		dispatch(signupRequest());
		return fetch(`${API_URL}/users/signup`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        user: {
          chatName: user.chatName,
          email: user.email,
          password: user.password,
        },
      })
		}).then(response => {
			if (response.status !== 200) throw new Error(response.statusText);
			return response.json();
		}).then(response => {
			dispatch(signupSuccess(response.token, response.user));
		}).catch(error => {
      if (error) {
        dispatch(signupFailure());
      }
		});
	}
}

export function fetchUser(slug) {
  return (dispatch) => {
    return fetch(`${API_URL}/users/${slug}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      dispatch(addUser(res.user))
    });
  };
}

function refreshRequest() {
	return {
		type: REFRESH_REQUEST,
	}
}

function refreshSuccess(user) {
	return {
		type: REFRESH_SUCCESS,
    user
	}
}

function refreshFailure() {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
	return {
		type: REFRESH_FAILURE
	}
}

export function refreshUser(tokenFromStorage) {
  return (dispatch) => {
    if (!tokenFromStorage) {
      dispatch(refreshFailure());
      return;
    }

    dispatch(refreshRequest());
    return fetch(`${API_URL}/refresh_token`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Auth': tokenFromStorage
      }
    }).then(response => {
      if (response.status !== 200) {
        dispatch(refreshFailure());
        return;
      } else {
        return response.json();
      }
    }).then(response => {
      dispatch(refreshSuccess(response.user));
    });
  }
}

export function resetToken() {//used for logout
  return {
    type: RESET_TOKEN
  };
}
