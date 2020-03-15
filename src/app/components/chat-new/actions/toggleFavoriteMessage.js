import { selectors } from 'app-webtech-core';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { userTypes } from '../constants/userTypes';

export function getUserTypePath(chatUserType) {
  if (chatUserType === userTypes.DEVICE) {
    return 'devices';
  }

  if (chatUserType === userTypes.USER) {
    return 'users';
  }

  throw new Error(`Invalid chatUserType '${chatUserType}'`);
}

export const chatToggleFavoriteMessageThunkAction = messageId =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const {
        chat: {
          chatUserId,
          chatUserType,
          isConfigured,
          roomId,
          pinnedMessage,
        } = {},
      } = state;

      if (!isConfigured) {
        throw new Error('Chat not configured');
      }

      const db = firebase.database();
      db.goOnline();

      const message = await db.ref(`/chat-messages/${roomId}/${messageId}`).once('value');
      if (message.exists()) {
        const userTypePath = getUserTypePath(chatUserType);
        const userLikeRef = db.ref(`/${userTypePath}/${chatUserId}/likes/${roomId}/${messageId}`);
        const roomLikeRef = db.ref(`/chat-messages/${roomId}/${messageId}/likes/${chatUserId}`);
        const likeValue = await roomLikeRef.once('value');
        if (likeValue.exists()) {
          await Promise.all([
            userLikeRef.remove(),
            roomLikeRef.remove(),
          ]);
        } else {
          const { clips } = selectors.playbackSession.properties(state);

          await Promise.all([
            userLikeRef.set(true),
            roomLikeRef.set({
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              episodeID: clips.length > 0 && clips[0].episodeID,
            }),
          ]);
        }

        if (pinnedMessage && pinnedMessage.id === messageId) {
          // Update pinned message with likes
          const pinnedMessageLikesSnapshot = await db.ref(`/chat-messages/${roomId}/${messageId}/likes`).once('value');
          const pinnedMessageLikes = pinnedMessageLikesSnapshot.val();
          db.ref(`/chat-rooms/${roomId}/pinnedMessage/likes`).set(pinnedMessageLikes || {});
        }
      } else {
        throw new Error('Invalid message');
      }
    } catch (err) {
      // TODO: Refactor function into two
    } finally {
      disconnectDb();
    }
  };
