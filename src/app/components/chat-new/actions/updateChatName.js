import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { triviaAuthenticatedUserIdSelector } from 'app-modules/trivia/selectors/authenticatedUserId';
import { UPDATE_CHAT_NAME } from './types';

const logger = debug('web:chat:actions:updateChatName');

export const chatUpdateChatNameActionThunk = newChatName =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const userID = triviaAuthenticatedUserIdSelector(state);

      if (!userID) {
        throw new Error('Need to be signed in to change avatar.');
      }

      const db = firebase.database();
      db.goOnline();

      const userRef = db.ref(`/users/${userID}/chatName`);
      if ((await userRef.once('value')).exists()) {
        await userRef.set(newChatName);
      }

      await dispatch({ type: UPDATE_CHAT_NAME, payload: { chatName: newChatName } });
    } catch (err) {
      logger('Error', { err });
      await dispatch({
        type: UPDATE_CHAT_NAME,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
