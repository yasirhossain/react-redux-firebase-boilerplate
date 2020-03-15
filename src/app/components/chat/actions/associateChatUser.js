import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { triviaAuthenticatedUserIdSelector } from 'app-modules/trivia/selectors/authenticatedUserId';
import { randomAvatarGenerator } from '../helpers/avatarGenerator';
import { ASSOCIATE_CHAT_USER } from './types';
import { roles } from '../constants/roles';
import { chatSetupActionThunk as setup } from './setup';

const logger = debug('web:chat:actions:associateChatUser');

export const chatAssociateChatUserActionThunk = () =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const {
        chat: {
          avatarUrl,
          avatarFilePath,
          disableChat,
        },
        device: {
          ID: deviceID,
        },
        userAccount: {
          data: userData,
          socialAvatar,
        },
        trivia: {
          score,
        },
      } = state;

      const userID = triviaAuthenticatedUserIdSelector(state);

      if (userID) {
        logger('User logged in, associating');
        const {
          email: userEmail = '',
          displayName,
        } = userData;

        const db = firebase.database();
        db.goOnline();

        const userSnapshot = await db.ref(`/users/${userID}`).once('value');

        // Update user devices
        const { devices: userDevices = [], ...userSnapshotData } = userSnapshot.val() || {};
        logger('User existing devices', { userDevices });
        if (!userDevices.includes(deviceID)) {
          userDevices.push(deviceID);
        }

        // Update user role
        let role = roles.NORMAL;
        if (userEmail.endsWith('@pluto.tv')) {
          role = roles.ADMIN;
        }
        // TODO: Implement condition to set influencer role

        let update = {
          [`/scores/${userID}`]: score,
          [`/users/${userID}/devices`]: userDevices,
        };

        if (!userSnapshot.exists()) {
          // If user doesn't exists yet, create name, avatar and subscription
          update = {
            ...update,
            [`/users/${userID}/avatarUrl`]: socialAvatar || avatarUrl || randomAvatarGenerator(),
            [`/users/${userID}/avatarFilePath`]: avatarFilePath || null,
            [`/users/${userID}/chatName`]: displayName,
            [`/users/${userID}/disableChat`]: disableChat,
            [`/users/${userID}/role`]: role,

            [`/subscriptions/${userID}`]: userEmail,
          };
        } else {
          if (!userSnapshotData.avatarUrl) {
            update = {
              ...update,
              [`/users/${userID}/avatarUrl`]: socialAvatar || avatarUrl || randomAvatarGenerator(),
              [`/users/${userID}/avatarFilePath`]: avatarFilePath || null,
            };
          }
          if (!userSnapshotData.chatName) {
            update = {
              ...update,
              [`/users/${userID}/chatName`]: displayName,
            };
          }
        }

        await db.ref().update(update);
        await dispatch({ type: ASSOCIATE_CHAT_USER });
      } else {
        logger('User not logged in');
      }

      await dispatch(setup());
    } catch (err) {
      logger('Error', { err });
      await dispatch({
        type: ASSOCIATE_CHAT_USER,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
