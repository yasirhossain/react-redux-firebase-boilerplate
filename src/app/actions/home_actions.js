import callApi from '../utils/apiCaller';

// Export Constants
export const TOGGLE_LOGIN_DIALOG = 'TOGGLE_LOGIN_DIALOG';
export const TOGGLE_SIGNUP_DIALOG = 'TOGGLE_SIGNUP_DIALOG';

export const TOGGLE_HEADER_MENU = 'TOGGLE_HEADER_MENU';

// Export Actions
export function toggleLogin() {
  return {
    type: TOGGLE_LOGIN_DIALOG,
  };
}

export function toggleSignup() {
  return {
    type: TOGGLE_SIGNUP_DIALOG,
  };
}

export function toggleHeaderMenu(menu) {
  return {
    type: TOGGLE_HEADER_MENU,
    menu,
  };
}
