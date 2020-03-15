import { SHOW, HIDE } from './types';
import { chatClearLoadedRoomActionThunk as clearLoadedRoom } from './clearLoadedRoom';
import { chatLoadRoomActionThunk as loadRoom } from './loadRoom';
import { chatRoomToLoadSelector } from '../selectors/chatRoomToLoad';

const chatShowAction = () => ({ type: SHOW });

const chatHideAction = () => ({ type: HIDE });

export const chatShowThunkAction = () =>
  async (dispatch, getState) => {
    await dispatch(chatShowAction());

    const roomToLoad = chatRoomToLoadSelector(getState());
    await dispatch(loadRoom(roomToLoad));
  };

export const chatHideThunkAction = () =>
  async (dispatch) => {
    await dispatch(chatHideAction());
    await dispatch(clearLoadedRoom());
  };
