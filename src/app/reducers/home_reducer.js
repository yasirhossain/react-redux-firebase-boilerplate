// Import Actions
import { TOGGLE_LOGIN_DIALOG, TOGGLE_SIGNUP_DIALOG, TOGGLE_HEADER_MENU } from '../actions/home_actions';

// Initial State
const initialState = {
  showLoginDialog: false,
  showSignupDialog: false,

  headerMenuOpen: false,
  headerAnchorEl: null,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_DIALOG:
      return {
        ... state,
        showLoginDialog: !state.showLoginDialog,
      };

    case TOGGLE_SIGNUP_DIALOG:
      return {
        ... state,
        showSignupDialog: !state.showSignupDialog,
      };

    case TOGGLE_HEADER_MENU:
      return {
        ... state,
        headerMenuOpen: action.menu.headerMenuOpen,
        headerAnchorEl: action.menu.headerAnchorEl,
      };

    default:
      return state;
  }
};

// Sign up and Log in
export const getLoginViewable = state => state.app.showLoginDialog;
export const getSignupViewable = state => state.app.showSignupDialog;

export const getAppState = state => state.app;

// Export Reducer
export default AppReducer;
