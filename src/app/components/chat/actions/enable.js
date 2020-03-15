import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { triviaAuthenticatedUserIdSelector } from 'app-modules/trivia/selectors/authenticatedUserId';
import { ENABLE } from './types';

const logger = debug('web:chat:actions:enable');

export const chatEnableAction = () => ({ type: ENABLE });

export const chatEnableActionThunk = () =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const userID = triviaAuthenticatedUserIdSelector(state);

      if (userID) {
        const db = firebase.database();
        db.goOnline();

        const userRef = db.ref(`/users/${userID}/disableChat`);
        if ((await userRef.once('value')).exists()) {
          await userRef.set(false);
        }
      }

      await dispatch(chatEnableAction);
    } catch (err) {
      logger('Error', { err });
      await dispatch({
        type: ENABLE,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
