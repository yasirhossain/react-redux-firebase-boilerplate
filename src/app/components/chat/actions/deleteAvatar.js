import debug from 'debug';
import { firebase } from 'app-modules/application/utils/firebase';
import { DELETE_AVATAR } from './types';

const logger = debug('web:chat:actions:deleteAvatar');

export const chatDeleteAvatarActionThunk = avatarPath =>
  async (dispatch) => {
    if (avatarPath) {
      try {
        const storage = firebase.storage();
        const storageRef = storage.ref();

        logger('Deleting file', avatarPath);
        await storageRef.child(avatarPath).delete();
        dispatch({ type: DELETE_AVATAR });
        logger('Delete successfull', avatarPath);
      } catch (err) {
        logger('Delete Failed', err);
        dispatch({ type: DELETE_AVATAR, error: true, payload: err });
      }
    } else {
      logger('Delete Failed, empty file path');
      dispatch({ type: DELETE_AVATAR, error: true, payload: 'No avatar to delete' });
    }
  };
