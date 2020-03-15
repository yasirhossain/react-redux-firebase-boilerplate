import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { triviaAuthenticatedUserIdSelector } from 'app-modules/trivia/selectors/authenticatedUserId';
import { UPDATE_AVATAR } from './types';

const logger = debug('web:chat:actions:updateUserAvatar');

export const chatUpdateUserAvatarActionThunk = ({ filePath, fileURL }) =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const userID = triviaAuthenticatedUserIdSelector(state);

      if (!userID) {
        throw new Error('Need to be signed in to change avatar.');
      }
      if (!fileURL) {
        throw new Error('Invalid avatar URL');
      }

      const db = firebase.database();
      db.goOnline();

      const userRef = db.ref(`/users/${userID}`);
      if ((await userRef.once('value')).exists()) {
        await userRef.child('avatarUrl').set(fileURL);
        await userRef.child('avatarFilePath').set(filePath);
      }

      await dispatch({
        type: UPDATE_AVATAR,
        payload: {
          avatarUrl: fileURL,
          avatarFilePath: filePath,
        },
      });
    } catch (err) {
      logger('Error', { err });
      await dispatch({
        type: UPDATE_AVATAR,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
