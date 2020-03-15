import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import DashbooardReducer from './dashboard_reducer';
import LiveReducer from './live_reducer';
import UserReducer from './user_reducer';
import ChannelReducer from './channel_reducer';
import AppReducer from './home_reducer';

const rootReducer = combineReducers({
    app: AppReducer,
    live: LiveReducer,
    channel: ChannelReducer,
    dashboard: DashbooardReducer,
    currentUser: FireBaseUserReducer,
    user: UserReducer,
});

export default rootReducer;
