import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { triviaAuthenticatedUserIdSelector } from 'app-modules/trivia/selectors/authenticatedUserId';
import { DISABLE } from './types';
import { chatClearLoadedRoomActionThunk as clearLoadedRoom } from './clearLoadedRoom';

const logger = debug('web:chat:actions:disable');

export const chatDisableAction = () => ({ type: DISABLE });

export const chatDisableActionThunk = () =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const userID = triviaAuthenticatedUserIdSelector(state);

      if (userID) {
        const db = firebase.database();
        db.goOnline();

        const userRef = db.ref(`/users/${userID}/disableChat`);
        if ((await userRef.once('value')).exists()) {
          await userRef.set(true);
        }
      }

      await dispatch(chatDisableAction);

      await dispatch(clearLoadedRoom());
    } catch (err) {
      logger('Error', { err });
      await dispatch({
        type: DISABLE,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
