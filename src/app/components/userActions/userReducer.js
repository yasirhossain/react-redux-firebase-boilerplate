import {
  SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS,
  LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS,
  REFRESH_REQUEST, REFRESH_SUCCESS, REFRESH_FAILURE, RESET_TOKEN,
  LOGOUT_USER, RESET_USER
} from './UserActions';

// Initial State
const initialState = {
  user: [],

  isAuthenticated: false,
  status: null,
  error: null,
  loading: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST :
			return {
        ... state,
				status: 'signing_up',
			};
		case SIGNUP_FAILURE :
			return {
				... state,
				status: 'signup_failure',
        user: [],
        error: 'There was an error signing up',
			};
		case SIGNUP_SUCCESS :
			return {
        ... state,
				status: 'signup_success',
        isAuthenticated: true,
        user: [action.user],
        isAdmin: (action.user.role === 'ADMIN') ? true : false,
        error: null,
			};

    case LOGIN_REQUEST :
			return {
        ... state,
				status: 'logging_in',
			};
		case LOGIN_FAILURE :
			return {
				... state,
				status: 'login_failure',
        user: [],
        error: 'There was an error logging in',
			};
		case LOGIN_SUCCESS :
			return {
        ... state,
				status: 'login_success',
        isAuthenticated: true,
        user: [action.user],
        isAdmin: (action.user.role === 'ADMIN') ? true : false,
        error: null,
			};

    case REFRESH_REQUEST :
			return {
        ... state,
				status: 'refreshing',
			};
		case REFRESH_FAILURE :
			return {
        ... state,
        status: 'refresh_failure',
        user: [],
        error: 'There was an error refreshing browser',
			};
		case REFRESH_SUCCESS :
			return {
        ... state,
        status: 'refresh_success',
        isAuthenticated: true,
        user: [action.user],
        isAdmin: (action.user.role === 'ADMIN') ? true : false,
        error: null,
			};

    case RESET_USER :
			return {
        ... state,
        status: 'reset_user',
        isAuthenticated: false,
        user: [],
        isAdmin: false,
        error: null,
			};

    default:
      return state;
  }
};

// Get user by id
export const getUser = state => state.user;

// Export Reducer
export default UserReducer;
