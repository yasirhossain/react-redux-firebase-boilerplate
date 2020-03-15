import Filter from 'bad-words';
import { constants, selectors } from 'app-webtech-core';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { SEND_MESSAGE } from './types';
import { chatPinMessageActionThunk as pinMessage } from './pinMessage';
import { roles } from '../constants/roles';

const { PLAYER_CONTENT_KIND } = constants.player;

const badWordFilter = new Filter();

export const chatSendMessageActionThunk = rawMessage =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const {
        chat: {
          isConfigured,
          chatUserId,
          chatName,
          avatarUrl,
          role,
          selectedMessage,
          messages,
          messageList,
          roomId,
        },
      } = state;

      if (!isConfigured) {
        throw new Error('Chat not configured');
      }
      if (!roomId) {
        throw new Error('Chat room not loaded');
      }

      const db = firebase.database();
      db.goOnline();

      await dispatch({ type: SEND_MESSAGE.REQUEST });

      const chatRoomRef = db.ref(`/chat-messages/${roomId}`);

      const message = badWordFilter.clean(rawMessage);

      const messageData = {
        chatUserId,
        chatName,
        avatarUrl,
        message,
        role,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      };

      if (selectedMessage && messageList.includes(selectedMessage)) {
        const { reply, ...messageReply } = messages[selectedMessage];

        messageData.reply = { id: selectedMessage, ...messageReply };
      }

      const { id: contentId, kind: contentKind } = selectors.player.content(state) || {};
      if (contentId && contentKind === PLAYER_CONTENT_KIND.LINEAR_CHANNEL) {
        messageData.channelId = contentId;
      }

      const newMessageRef = await chatRoomRef.push(messageData);
      const { key } = newMessageRef;

      await dispatch({
        type: SEND_MESSAGE.SUCCESS,
        payload: {
          key,
        },
      });

      if (role === roles.INFLUENCER) {
        dispatch(pinMessage(key));
      }
    } catch (err) {
      await dispatch({
        type: SEND_MESSAGE.FAILURE,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
